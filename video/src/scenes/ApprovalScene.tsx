import { Audio } from "@remotion/media";
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Caption } from "../components/Caption";
import { Cursor } from "../components/Cursor";
import { SampleDataBadge, StepChip } from "../components/SceneTitle";
import { Highlight, Screen } from "../components/Screen";
import { colors, fontFamily } from "../theme";

const CLICK = 112;
const SWITCH = 136; // approved case screen fades in

/** Press feedback drawn over the real "Approve visit" button. */
const ButtonPress: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        left: 772,
        top: 721,
        width: 640,
        height: 56,
        borderRadius: 28,
        backgroundColor: "rgba(23,52,58,1)",
        opacity: interpolate(
          frame,
          [CLICK - 2, CLICK + 2, CLICK + 12],
          [0, 0.14, 0],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        ),
      }}
    />
  );
};

export const ApprovalScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: colors.cream, fontFamily }}>
      <SampleDataBadge />
      <StepChip step="04" label="Human approval" />
      <Screen
        layers={[
          { src: "approval-1040.png", width: 1920, height: 1080 },
          {
            src: "case-1040-approved.png",
            width: 1920,
            height: 1526,
            fadeIn: [SWITCH, SWITCH + 12],
          },
        ]}
        camera={[
          { f: 0, x: 960, y: 540, zoom: 0.72 },
          { f: 20, x: 960, y: 540, zoom: 0.72 },
          { f: 50, x: 1092, y: 460, zoom: 1.05 },
          { f: SWITCH, x: 1092, y: 520, zoom: 1.05 },
          { f: SWITCH + 30, x: 1110, y: 1140, zoom: 0.94 },
          { f: 240, x: 1110, y: 1150, zoom: 0.95 },
        ]}
        overlay={
          <>
            <Highlight
              x={772}
              y={212}
              w={640}
              h={88}
              from={46}
              to={SWITCH - 20}
            />
            <Highlight
              x={800}
              y={560}
              w={584}
              h={50}
              from={70}
              to={SWITCH - 20}
              radius={10}
            />
            <ButtonPress />
            <Highlight
              x={1548}
              y={1188}
              w={304}
              h={52}
              from={SWITCH + 32}
              radius={10}
            />
            <Highlight
              x={332}
              y={1388}
              w={1136}
              h={40}
              from={SWITCH + 52}
              radius={10}
            />
            {frame < SWITCH + 4 ? (
              <Cursor
                path={[
                  { f: 78, x: 1300, y: 960 },
                  { f: CLICK - 4, x: 1100, y: 752 },
                ]}
                clickAt={CLICK}
              />
            ) : null}
          </>
        }
      />

      <Sequence
        name="Click approve"
        from={CLICK}
        durationInFrames={fps}
        premountFor={fps}
      >
        <Audio src={staticFile("sfx/click.wav")} volume={0.6} />
      </Sequence>
      <Sequence
        name="Approved chime"
        from={CLICK + 8}
        durationInFrames={2 * fps}
        premountFor={fps}
      >
        <Audio src={staticFile("sfx/chime.wav")} volume={0.35} />
      </Sequence>
      <Sequence
        name="Pan to audit"
        from={SWITCH}
        durationInFrames={fps}
        premountFor={fps}
      >
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.14} />
      </Sequence>

      <Caption from={0.3 * fps} durationInFrames={3.5 * fps}>
        The cost is over the limit, so the AI stops and explains why.
      </Caption>
      <Caption from={3.9 * fps} durationInFrames={4 * fps}>
        A person approves with one click, and the decision goes into the audit
        log.
      </Caption>
    </AbsoluteFill>
  );
};
