import React from "react";
import {
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { colors, easeOut } from "../theme";

/** A camera keyframe: focus point (x, y) in screenshot CSS pixels, and zoom. */
export type CameraKey = { f: number; x: number; y: number; zoom: number };

export const WINDOW_W = 1520;
export const WINDOW_H = 820;
const BAR_H = 40;
export const VIEW_H = WINDOW_H - BAR_H;

const camera = (frame: number, keys: CameraKey[]) => {
  const opts = {
    extrapolateLeft: "clamp" as const,
    extrapolateRight: "clamp" as const,
    easing: Easing.bezier(0.65, 0, 0.35, 1),
  };
  const fs = keys.map((k) => k.f);
  return {
    x: interpolate(
      frame,
      fs,
      keys.map((k) => k.x),
      opts,
    ),
    y: interpolate(
      frame,
      fs,
      keys.map((k) => k.y),
      opts,
    ),
    zoom: interpolate(
      frame,
      fs,
      keys.map((k) => k.zoom),
      opts,
    ),
  };
};

type ScreenLayer = {
  /** File in public/screens, captured at 2x from the running app. */
  src: string;
  /** Size of the screenshot in CSS pixels. */
  width: number;
  height: number;
  /** Frames over which this layer fades in (later layers sit on top). */
  fadeIn?: [number, number];
};

/**
 * A browser-style window that shows real app screenshots and moves a virtual
 * camera over them. Overlays (highlights, cursor) are given in screenshot CSS
 * pixels and move with the camera.
 */
export const Screen: React.FC<{
  layers: ScreenLayer[];
  camera: CameraKey[];
  overlay?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ layers, camera: keys, overlay, style }) => {
  const frame = useCurrentFrame();
  const cam = camera(frame, keys);
  const tx = WINDOW_W / 2 - cam.x * cam.zoom;
  const ty = VIEW_H / 2 - cam.y * cam.zoom;

  return (
    <div
      style={{
        position: "absolute",
        left: (1920 - WINDOW_W) / 2,
        top: 96,
        width: WINDOW_W,
        height: WINDOW_H,
        borderRadius: 22,
        overflow: "hidden",
        backgroundColor: colors.cream,
        boxShadow:
          "0 50px 120px rgba(15,37,41,0.28), 0 12px 30px rgba(15,37,41,0.16)",
        border: "1px solid rgba(23,52,58,0.08)",
        ...style,
      }}
    >
      <div
        style={{
          height: BAR_H,
          display: "flex",
          alignItems: "center",
          gap: 9,
          paddingLeft: 20,
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid rgba(23,52,58,0.08)",
        }}
      >
        {["#F2C4BA", "#EBDDB8", "#C9DCCB"].map((c) => (
          <div
            key={c}
            style={{
              width: 13,
              height: 13,
              borderRadius: 7,
              backgroundColor: c,
            }}
          />
        ))}
      </div>
      <div
        style={{
          position: "relative",
          width: WINDOW_W,
          height: VIEW_H,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            transformOrigin: "0 0",
            transform: `translate(${tx}px, ${ty}px) scale(${cam.zoom})`,
          }}
        >
          {layers.map((l) => (
            <Img
              key={l.src}
              src={staticFile(`screens/${l.src}`)}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: l.width,
                height: l.height,
                opacity: l.fadeIn
                  ? interpolate(frame, l.fadeIn, [0, 1], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                      easing: Easing.bezier(...easeOut),
                    })
                  : 1,
              }}
            />
          ))}
          {overlay}
        </div>
      </div>
    </div>
  );
};

/** Coral focus ring drawn around a region of the screenshot. */
export const Highlight: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  from: number;
  to?: number;
  radius?: number;
}> = ({ x, y, w, h, from, to = 99999, radius = 16 }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [from, from + 10, to, to + 10],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const grow = interpolate(frame, [from, from + 16], [10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(...easeOut),
  });
  return (
    <div
      style={{
        position: "absolute",
        left: x - 6 - grow,
        top: y - 6 - grow,
        width: w + 12 + grow * 2,
        height: h + 12 + grow * 2,
        borderRadius: radius,
        border: `3px solid ${colors.coral}`,
        boxShadow: `0 0 0 6px rgba(255,138,117,0.18)`,
        opacity,
      }}
    />
  );
};

/** Dims everything except one rectangle (spotlight). */
export const Spotlight: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  from: number;
  pageW: number;
  pageH: number;
}> = ({ x, y, w, h, from, pageW, pageH }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [from, from + 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shade = "rgba(247,245,239,0.72)";
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: pageW,
        height: pageH,
        opacity,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: pageW,
          height: y,
          backgroundColor: shade,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: y + h,
          width: pageW,
          height: pageH - y - h,
          backgroundColor: shade,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: y,
          width: x,
          height: h,
          backgroundColor: shade,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: x + w,
          top: y,
          width: pageW - x - w,
          height: h,
          backgroundColor: shade,
        }}
      />
    </div>
  );
};
