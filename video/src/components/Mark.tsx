import React from "react";
import { colors } from "../theme";

/** The CareTaker house mark, redrawn from the app's icons.tsx. */
export const Mark: React.FC<{ size: number; tone?: "ink" | "cream" }> = ({
  size,
  tone = "ink",
}) => (
  <svg viewBox="0 0 100 100" width={size} height={size}>
    <path
      d="M82 88H18V45L50 17l32 28v21"
      fill="none"
      stroke={tone === "ink" ? colors.ink : colors.cream}
      strokeWidth="11"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="50" cy="60" r="12" fill={colors.coral} />
  </svg>
);
