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
import { Narration } from "../components/Caption";
import { SampleDataBadge, StepChip } from "../components/SceneTitle";
import { Highlight, Screen, Spotlight } from "../components/Screen";
import { colors, easeOut, fontFamily } from "../theme";

// The app's matching order (engine.ts): same category, serves the building,
// then sorted by rank and visit fee. Values are from the Technicians screen.
const steps = [
  { at: 80, label: "Specialty", value: "Heating" },
  { at: 105, label: "Serves", value: "Building A" },
  { at: 150, label: "Rank", value: "Primary" },
  { at: 175, label: "Visit fee", value: "180 EUR, estimated" },
];

const StepPill: React.FC<{ at: number; label: string; value: string }> = ({
  at,
  label,
  value,
}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: 10,
        padding: "12px 20px",
        borderRadius: 999,
        backgroundColor: "#FFFFFF",
        boxShadow: "0 10px 30px rgba(15,37,41,0.14)",
        opacity: interpolate(frame, [at, at + 10], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        translate: interpolate(frame, [at, at + 16], ["0px 16px", "0px 0px"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(...easeOut),
        }),
      }}
    >
      <span style={{ fontSize: 18, color: colors.muted, fontWeight: 500 }}>
        {label}
      </span>
      <span style={{ fontSize: 24, color: colors.ink, fontWeight: 600 }}>
        {value}
      </span>
    </div>
  );
};

export const MatchScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: colors.cream, fontFamily }}>
      <SampleDataBadge />
      <StepChip step="03" label="Technician match" />
      <Screen
        layers={[{ src: "technicians.png", width: 1920, height: 1080 }]}
        camera={[
          { f: 0, x: 960, y: 540, zoom: 0.72 },
          { f: 30, x: 960, y: 540, zoom: 0.72 },
          { f: 70, x: 1092, y: 470, zoom: 0.96 },
          { f: 240, x: 1092, y: 480, zoom: 0.98 },
        ]}
        overlay={
          <>
            <Highlight
              x={304}
              y={90}
              w={556}
              h={28}
              from={22}
              to={70}
              radius={10}
            />
            <Spotlight
              x={304}
              y={424}
              w={1576}
              h={76}
              from={74}
              pageW={1920}
              pageH={1080}
            />
            <Highlight x={304} y={424} w={1576} h={76} from={78} radius={12} />
          </>
        }
      />

      <div
        style={{
          position: "absolute",
          left: 260,
          top: 770,
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        {steps.map((s, i) => (
          <React.Fragment key={s.label}>
            {i > 0 ? (
              <div
                style={{
                  color: colors.coralDark,
                  fontSize: 26,
                  fontWeight: 600,
                  opacity: interpolate(frame, [s.at - 4, s.at + 6], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                }}
              >
                →
              </div>
            ) : null}
            <StepPill at={s.at} label={s.label} value={s.value} />
          </React.Fragment>
        ))}
      </div>

      <Sequence
        name="Spotlight"
        from={74}
        durationInFrames={fps}
        premountFor={fps}
      >
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.15} />
      </Sequence>
      {steps.map((s) => (
        <Sequence
          key={s.label}
          name={`Step: ${s.label}`}
          from={s.at}
          durationInFrames={fps}
          premountFor={fps}
        >
          <Audio src={staticFile("sfx/tick.wav")} volume={0.32} />
        </Sequence>
      ))}

      <Narration voice="s4a" from={8}>
        CareTaker only considers technicians who cover this trade and building.
      </Narration>
      <Narration voice="s4b" from={136}>
        It recommends the best match by rank, then by visit fee.
      </Narration>
    </AbsoluteFill>
  );
};
