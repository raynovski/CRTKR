import { Audio } from "@remotion/media";
import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Mark } from "../components/Mark";
import { colors, easeOut, fontFamily } from "../theme";
import { voiceFrames } from "../voice";

// Each pillar restates a design rule of the app (see AGENTS.md in the app repo).
const pillars = [
  {
    title: "AI handles the conversation",
    body: "Tenants and technicians just chat.",
  },
  {
    title: "Your rules make the decisions",
    body: "Coverage, urgency, budget, technician.",
  },
  {
    title: "People approve what matters",
    body: "Every step is in the audit log.",
  },
];

export const ValueScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = (delay: number) => ({
    opacity: interpolate(frame, [delay, delay + 16], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
    translate: interpolate(
      frame,
      [delay, delay + 24],
      ["0px 28px", "0px 0px"],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.bezier(...easeOut),
      },
    ),
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(1200px 760px at 50% 45%, #1F434A 0%, ${colors.inkDeep} 72%)`,
        fontFamily,
        alignItems: "center",
        paddingTop: 170,
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", gap: 26, ...enter(4) }}
      >
        <Mark size={104} tone="cream" />
        <div
          style={{
            color: colors.cream,
            fontSize: 92,
            fontWeight: 600,
            letterSpacing: -2.6,
          }}
        >
          CareTaker
        </div>
      </div>
      <div
        style={{
          marginTop: 34,
          color: colors.coral,
          fontSize: 64,
          fontWeight: 600,
          letterSpacing: -1.6,
          ...enter(16),
        }}
      >
        Calm control for every repair.
      </div>
      <div style={{ marginTop: 110, display: "flex", gap: 36 }}>
        {pillars.map((p, i) => (
          <div
            key={p.title}
            style={{
              width: 460,
              padding: "30px 34px",
              borderRadius: 24,
              backgroundColor: "rgba(247,245,239,0.06)",
              border: "1px solid rgba(247,245,239,0.14)",
              ...enter(40 + i * 12),
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: colors.coral,
              }}
            />
            <div
              style={{
                marginTop: 20,
                color: colors.cream,
                fontSize: 32,
                fontWeight: 600,
                letterSpacing: -0.6,
                lineHeight: 1.2,
              }}
            >
              {p.title}
            </div>
            <div
              style={{
                marginTop: 12,
                color: "rgba(247,245,239,0.66)",
                fontSize: 24,
                lineHeight: 1.4,
              }}
            >
              {p.body}
            </div>
          </div>
        ))}
      </div>
      {/* The tagline is already on screen, so this line has no caption. */}
      <Sequence
        name="Voice: s6"
        from={24}
        durationInFrames={voiceFrames.s6 + 4}
        premountFor={fps}
      >
        <Audio src={staticFile("voice/s6.mp3")} volume={0.8} />
      </Sequence>
    </AbsoluteFill>
  );
};
