import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { colors, easeOut, fontFamily } from "../theme";

/** Small step label + headline shown at the top-left of a product scene. */
export const SceneTitle: React.FC<{
  step: string;
  title: string;
  style?: React.CSSProperties;
}> = ({ step, title, style }) => {
  const frame = useCurrentFrame();
  const enter = (delay: number) => ({
    opacity: interpolate(frame, [delay, delay + 14], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
    translate: interpolate(
      frame,
      [delay, delay + 20],
      ["0px 24px", "0px 0px"],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.bezier(...easeOut),
      },
    ),
  });
  return (
    <div style={{ position: "absolute", fontFamily, ...style }}>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 12,
          padding: "8px 18px",
          borderRadius: 999,
          backgroundColor: colors.coralTint,
          color: colors.coralDark,
          fontSize: 24,
          fontWeight: 600,
          letterSpacing: 0.4,
          textTransform: "uppercase",
          ...enter(0),
        }}
      >
        {step}
      </div>
      <div
        style={{
          marginTop: 22,
          color: colors.ink,
          fontSize: 64,
          fontWeight: 600,
          lineHeight: 1.08,
          letterSpacing: -1.6,
          ...enter(5),
        }}
      >
        {title}
      </div>
    </div>
  );
};

/** "Product demo · sample data" disclosure, kept in the corner of product scenes. */
export const SampleDataBadge: React.FC = () => (
  <div
    style={{
      position: "absolute",
      right: 200,
      top: 40,
      fontFamily,
      fontSize: 18,
      fontWeight: 500,
      color: colors.muted,
      letterSpacing: 0.3,
    }}
  >
    Recorded in the CareTaker demo · sample data
  </div>
);

/** Compact step chip shown above the product window. */
export const StepChip: React.FC<{ step: string; label: string }> = ({
  step,
  label,
}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        left: 200,
        top: 30,
        display: "flex",
        alignItems: "center",
        gap: 14,
        fontFamily,
        opacity: interpolate(frame, [4, 18], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        translate: interpolate(frame, [4, 22], ["-16px 0px", "0px 0px"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(...easeOut),
        }),
      }}
    >
      <div
        style={{
          padding: "6px 14px",
          borderRadius: 999,
          backgroundColor: colors.ink,
          color: colors.cream,
          fontSize: 20,
          fontWeight: 600,
          letterSpacing: 0.6,
        }}
      >
        {step}
      </div>
      <div
        style={{
          color: colors.ink,
          fontSize: 28,
          fontWeight: 600,
          letterSpacing: -0.4,
        }}
      >
        {label}
      </div>
    </div>
  );
};
