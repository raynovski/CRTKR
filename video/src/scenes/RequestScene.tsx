import { Audio } from "@remotion/media";
import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Narration } from "../components/Caption";
import { SampleDataBadge, SceneTitle } from "../components/SceneTitle";
import { colors, easeOut, fontFamily } from "../theme";

const PHONE_W = 360; // screen width in px; screenshots are 390 CSS px wide
const PHONE_H = Math.round((PHONE_W * 844) / 390);
const BEZEL = 14;
const S = PHONE_W / 390; // CSS px -> phone px

const screens = [
  { src: "tenant-home.png", in: 0 },
  { src: "tenant-new-typed.png", in: 55 },
  { src: "tenant-case-1040.png", in: 126 },
];

const Tap: React.FC<{ x: number; y: number; at: number }> = ({ x, y, at }) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [at, at + 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  if (frame < at) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: x * S - 26,
        top: y * S - 26,
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: "rgba(23,52,58,0.28)",
        scale: `${0.5 + t * 0.8}`,
        opacity: 1 - t,
      }}
    />
  );
};

export const RequestScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(1100px 800px at 70% 50%, #FFFFFF 0%, ${colors.cream} 65%)`,
        fontFamily,
      }}
    >
      <SampleDataBadge />
      <SceneTitle
        step="01 · Report"
        title={"Tenants report\nissues in a chat."}
        style={{ left: 200, top: 330, whiteSpace: "pre-line" }}
      />
      <div
        style={{
          position: "absolute",
          left: 200,
          top: 560,
          width: 640,
          color: colors.muted,
          fontSize: 30,
          lineHeight: 1.45,
          opacity: interpolate(frame, [16, 32], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Instead of a form, the CareTaker assistant asks only what it needs to
        open the case.
      </div>

      <div
        style={{
          position: "absolute",
          left: 1130,
          top: 70,
          width: PHONE_W + BEZEL * 2,
          height: PHONE_H + BEZEL * 2,
          borderRadius: 64,
          backgroundColor: colors.ink,
          padding: BEZEL,
          boxShadow:
            "0 50px 100px rgba(15,37,41,0.30), 0 10px 26px rgba(15,37,41,0.18)",
          opacity: interpolate(frame, [0, 16], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [0, 30], ["0px 60px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(...easeOut),
          }),
        }}
      >
        <div
          style={{
            position: "relative",
            width: PHONE_W,
            height: PHONE_H,
            borderRadius: 50,
            overflow: "hidden",
            backgroundColor: colors.cream,
          }}
        >
          {screens.map((s) => (
            <Img
              key={s.src}
              src={staticFile(`screens/${s.src}`)}
              style={{
                position: "absolute",
                inset: 0,
                width: PHONE_W,
                height: PHONE_H,
                opacity: interpolate(frame, [s.in, s.in + 10], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
                translate: interpolate(
                  frame,
                  [s.in, s.in + 14],
                  ["0px 14px", "0px 0px"],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                    easing: Easing.bezier(...easeOut),
                  },
                ),
              }}
            />
          ))}
          {/* "Report a problem" button, then the send button */}
          <Tap x={195} y={212} at={40} />
          <Tap x={350} y={804} at={112} />
        </div>
      </div>

      <Sequence
        name="Tap: report"
        from={40}
        durationInFrames={fps}
        premountFor={fps}
      >
        <Audio src={staticFile("sfx/click.wav")} volume={0.5} />
      </Sequence>
      <Sequence
        name="Tap: send"
        from={112}
        durationInFrames={fps}
        premountFor={fps}
      >
        <Audio src={staticFile("sfx/click.wav")} volume={0.5} />
      </Sequence>
      <Sequence
        name="Message in"
        from={126}
        durationInFrames={fps}
        premountFor={fps}
      >
        <Audio src={staticFile("sfx/tick.wav")} volume={0.45} />
      </Sequence>

      <Narration voice="s2a" from={8}>
        A tenant reports a cold radiator from their phone, by text or voice.
      </Narration>
      <Narration voice="s2b" from={138}>
        The assistant asks one follow-up question, and the case is opened.
      </Narration>
    </AbsoluteFill>
  );
};
