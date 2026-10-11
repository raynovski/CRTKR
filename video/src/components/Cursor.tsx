import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

/** Pointer that glides between points (screenshot CSS pixels) and presses on `clickAt`. */
export const Cursor: React.FC<{
  path: { f: number; x: number; y: number }[];
  clickAt?: number;
  scale?: number;
}> = ({ path, clickAt, scale = 1 }) => {
  const frame = useCurrentFrame();
  const opts = {
    extrapolateLeft: "clamp" as const,
    extrapolateRight: "clamp" as const,
    easing: Easing.bezier(0.65, 0, 0.35, 1),
  };
  const fs = path.map((p) => p.f);
  const x = interpolate(
    frame,
    fs,
    path.map((p) => p.x),
    opts,
  );
  const y = interpolate(
    frame,
    fs,
    path.map((p) => p.y),
    opts,
  );
  const opacity = interpolate(frame, [fs[0], fs[0] + 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const press =
    clickAt === undefined
      ? 1
      : interpolate(frame, [clickAt - 3, clickAt, clickAt + 5], [1, 0.82, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
  const ripple =
    clickAt === undefined
      ? 0
      : interpolate(frame, [clickAt, clickAt + 18], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        opacity,
        scale: `${scale}`,
      }}
    >
      {clickAt !== undefined && frame >= clickAt ? (
        <div
          style={{
            position: "absolute",
            left: -30,
            top: -30,
            width: 60,
            height: 60,
            borderRadius: 30,
            border: "3px solid rgba(23,52,58,0.5)",
            scale: `${0.4 + ripple}`,
            opacity: 1 - ripple,
          }}
        />
      ) : null}
      <svg
        width={30}
        height={36}
        viewBox="0 0 30 36"
        style={{
          scale: `${press}`,
          transformOrigin: "0 0",
          filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.25))",
        }}
      >
        <path
          d="M2 2 L2 28 L9 21.5 L14 33 L19 31 L14 19.5 L23.5 19.5 Z"
          fill="#17343A"
          stroke="#FFFFFF"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
