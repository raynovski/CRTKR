import React from "react";
import {
  Easing,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, easeOut, fontFamily } from "../theme";

type CaptionProps = {
  readonly children: string;
  readonly from: number;
  readonly durationInFrames: number;
  readonly tone?: "light" | "dark";
};

const CaptionInner: React.FC<{
  children: string;
  tone: "light" | "dark";
  durationInFrames: number;
}> = ({ children, tone, durationInFrames }) => {
  const frame = useCurrentFrame();
  const fadeOut = durationInFrames - 10;

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 64,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          padding: "18px 36px",
          borderRadius: 18,
          backgroundColor:
            tone === "dark"
              ? "rgba(15, 37, 41, 0.86)"
              : "rgba(247, 245, 239, 0.12)",
          border: tone === "dark" ? "none" : "1px solid rgba(247,245,239,0.2)",
          color: colors.cream,
          fontFamily,
          fontSize: 38,
          fontWeight: 500,
          lineHeight: 1.3,
          letterSpacing: -0.2,
          textAlign: "center",
          boxShadow: "0 18px 50px rgba(15,37,41,0.22)",
          opacity: interpolate(
            frame,
            [0, 10, fadeOut, fadeOut + 10],
            [0, 1, 1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          ),
          translate: interpolate(frame, [0, 14], ["0px 18px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(...easeOut),
          }),
        }}
      >
        {children}
      </div>
    </div>
  );
};

/** Professional English caption, shown as a subtitle bar. */
export const Caption: React.FC<CaptionProps> = ({
  children,
  from,
  durationInFrames,
  tone = "dark",
}) => {
  const { fps } = useVideoConfig();
  return (
    <Sequence
      name={`Caption: ${children.slice(0, 32)}`}
      from={from}
      durationInFrames={durationInFrames}
      premountFor={fps}
    >
      <CaptionInner tone={tone} durationInFrames={durationInFrames}>
        {children}
      </CaptionInner>
    </Sequence>
  );
};
