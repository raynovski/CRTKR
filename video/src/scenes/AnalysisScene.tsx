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
import { Highlight, Screen } from "../components/Screen";
import { colors, easeOut, fontFamily } from "../theme";

// Values below are read from the case #1040 screen ("What the AI found" and
// "Coverage and approval" panels); the card only restates what is on screen.
const checks = [
  { at: 70, label: "Issue", value: "Heating, one radiator", tone: "ok" },
  { at: 122, label: "Urgency", value: "Normal, no safety risk", tone: "ok" },
  { at: 150, label: "Contract", value: "Included in the contract", tone: "ok" },
  {
    at: 185,
    label: "Budget",
    value: "180 EUR, over the 150 EUR limit",
    tone: "warn",
  },
] as const;

const CheckRow: React.FC<{
  at: number;
  label: string;
  value: string;
  tone: "ok" | "warn";
}> = ({ at, label, value, tone }) => {
  const frame = useCurrentFrame();
  const spin = interpolate(frame, [at - 18, at], [0, 360], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const done = frame >= at;
  const visible = interpolate(frame, [at - 20, at - 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const color = tone === "ok" ? colors.green : colors.coralDark;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 18,
        padding: "16px 0",
        borderTop: "1px solid rgba(23,52,58,0.08)",
        opacity: visible,
        translate: `${(1 - visible) * -14}px 0px`,
      }}
    >
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 17,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: done ? color : "transparent",
          border: done ? "none" : "3px solid rgba(23,52,58,0.15)",
          borderTopColor: done ? undefined : colors.coral,
          rotate: done ? "0deg" : `${spin}deg`,
          color: "#fff",
          fontSize: 20,
          fontWeight: 700,
        }}
      >
        {done ? (tone === "ok" ? "✓" : "!") : null}
      </div>
      <div>
        <div style={{ fontSize: 18, color: colors.muted, fontWeight: 500 }}>
          {label}
        </div>
        <div
          style={{
            fontSize: 24,
            color: colors.ink,
            fontWeight: 600,
            letterSpacing: -0.3,
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
};

export const AnalysisScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: colors.cream, fontFamily }}>
      <SampleDataBadge />
      <StepChip step="02" label="AI analysis" />
      <Screen
        layers={[{ src: "case-1040.png", width: 1920, height: 1582 }]}
        camera={[
          { f: 0, x: 960, y: 494, zoom: 0.79 },
          { f: 40, x: 960, y: 494, zoom: 0.79 },
          { f: 72, x: 1312, y: 560, zoom: 1.25 },
          { f: 128, x: 1312, y: 600, zoom: 1.25 },
          { f: 160, x: 1312, y: 1060, zoom: 1.25 },
          { f: 245, x: 1312, y: 1080, zoom: 1.25 },
        ]}
        overlay={
          <>
            <Highlight x={1548} y={340} w={304} h={185} from={62} to={112} />
            <Highlight x={1548} y={545} w={304} h={70} from={114} to={148} />
            <Highlight x={1548} y={940} w={304} h={62} from={146} to={182} />
            <Highlight x={1548} y={1095} w={304} h={70} from={182} to={280} />
          </>
        }
      />

      {/* Analysis checklist card, floating over the left of the window */}
      <div
        style={{
          position: "absolute",
          left: 250,
          top: 440,
          width: 520,
          padding: "26px 30px 12px",
          borderRadius: 22,
          backgroundColor: "rgba(255,255,255,0.96)",
          boxShadow: "0 30px 80px rgba(15,37,41,0.22)",
          opacity: interpolate(frame, [48, 62], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [48, 70], ["0px 30px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(...easeOut),
          }),
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 22,
            fontWeight: 600,
            color: colors.ink,
            marginBottom: 10,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: colors.coral,
            }}
          />
          Case #1040 · checked against your rules
        </div>
        {checks.map((c) => (
          <CheckRow
            key={c.label}
            at={c.at}
            label={c.label}
            value={c.value}
            tone={c.tone}
          />
        ))}
      </div>

      <Sequence
        name="Push in"
        from={40}
        durationInFrames={fps}
        premountFor={fps}
      >
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.18} />
      </Sequence>
      <Sequence
        name="Check: issue"
        from={70}
        durationInFrames={fps}
        premountFor={fps}
      >
        <Audio src={staticFile("sfx/tick.wav")} volume={0.4} />
      </Sequence>
      <Sequence
        name="Check: urgency"
        from={122}
        durationInFrames={fps}
        premountFor={fps}
      >
        <Audio src={staticFile("sfx/tick.wav")} volume={0.4} />
      </Sequence>
      <Sequence
        name="Check: contract"
        from={150}
        durationInFrames={fps}
        premountFor={fps}
      >
        <Audio src={staticFile("sfx/tick.wav")} volume={0.4} />
      </Sequence>
      <Sequence
        name="Check: budget"
        from={185}
        durationInFrames={fps}
        premountFor={fps}
      >
        <Audio
          src={staticFile("sfx/tick.wav")}
          volume={0.4}
          playbackRate={0.85}
        />
      </Sequence>

      <Narration voice="s3a" from={8}>
        The AI turns the conversation into a structured case.
      </Narration>
      <Narration voice="s3b" from={104}>
        Your rules then set urgency, check the contract and the cost limit.
      </Narration>
    </AbsoluteFill>
  );
};
