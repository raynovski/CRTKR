import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Caption } from "../components/Caption";
import { colors, easeOut, fontFamily } from "../theme";

const fragments = [
  { label: "Phone calls", x: 260, y: 250, delay: 22, drift: -18 },
  { label: "Email threads", x: 1380, y: 220, delay: 30, drift: 14 },
  { label: "Spreadsheets", x: 200, y: 640, delay: 38, drift: 12 },
  { label: "Contract PDFs", x: 1460, y: 600, delay: 46, drift: -14 },
  { label: "Budget sign-offs", x: 820, y: 760, delay: 54, drift: 10 },
];

export const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(1200px 700px at 50% 40%, #1F434A 0%, ${colors.inkDeep} 70%)`,
        fontFamily,
      }}
    >
      {fragments.map((f) => (
        <div
          key={f.label}
          style={{
            position: "absolute",
            left: f.x,
            top: f.y,
            padding: "16px 28px",
            borderRadius: 999,
            border: "1px solid rgba(247,245,239,0.18)",
            backgroundColor: "rgba(247,245,239,0.06)",
            color: "rgba(247,245,239,0.78)",
            fontSize: 30,
            fontWeight: 500,
            opacity: interpolate(
              frame,
              [f.delay, f.delay + 14, 120, 140],
              [0, 1, 1, 0.25],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            ),
            translate: interpolate(
              frame,
              [f.delay, 180],
              ["0px 30px", `${f.drift}px -10px`],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(...easeOut),
              },
            ),
            filter: `blur(${interpolate(frame, [120, 140], [0, 3], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}px)`,
          }}
        >
          {f.label}
        </div>
      ))}

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            color: colors.coral,
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: 3,
            textTransform: "uppercase",
            opacity: interpolate(frame, [4, 18], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          Facility management today
        </div>
        <div
          style={{
            marginTop: 26,
            color: colors.cream,
            fontSize: 96,
            fontWeight: 600,
            lineHeight: 1.04,
            letterSpacing: -3,
            opacity: interpolate(frame, [10, 28], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(frame, [10, 34], ["0px 30px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(...easeOut),
            }),
          }}
        >
          Every repair
          <br />
          starts with a chase.
        </div>
      </AbsoluteFill>

      <Caption from={0.4 * fps} durationInFrames={5.4 * fps} tone="light">
        Facility teams still handle every repair by hand: calls, emails,
        contracts and budget checks.
      </Caption>
    </AbsoluteFill>
  );
};
