import { Audio } from "@remotion/media";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  staticFile,
  useVideoConfig,
} from "remotion";
import { AnalysisScene } from "./scenes/AnalysisScene";
import { ApprovalScene } from "./scenes/ApprovalScene";
import { MatchScene } from "./scenes/MatchScene";
import { ProblemScene } from "./scenes/ProblemScene";
import { RequestScene } from "./scenes/RequestScene";
import { ValueScene } from "./scenes/ValueScene";
import { colors } from "./theme";

export const SCENES = {
  problem: 210,
  request: 270,
  analysis: 245,
  match: 240,
  approval: 255,
  value: 180,
};
export const TRANSITION = 18;
export const TOTAL_DURATION =
  Object.values(SCENES).reduce((a, b) => a + b, 0) -
  TRANSITION * (Object.keys(SCENES).length - 1);

const cutPoints = (() => {
  const out: number[] = [];
  let t = 0;
  const d = Object.values(SCENES);
  for (let i = 0; i < d.length - 1; i++) {
    t += d[i] - TRANSITION;
    out.push(t);
  }
  return out;
})();

export const CareTakerDemo: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: colors.inkDeep }}>
      <TransitionSeries>
        <TransitionSeries.Sequence
          name="1 · Problem"
          durationInFrames={210}
          premountFor={fps}
        >
          <ProblemScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />
        <TransitionSeries.Sequence
          name="2 · Request"
          durationInFrames={270}
          premountFor={fps}
        >
          <RequestScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />
        <TransitionSeries.Sequence
          name="3 · AI analysis"
          durationInFrames={245}
          premountFor={fps}
        >
          <AnalysisScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />
        <TransitionSeries.Sequence
          name="4 · Technician match"
          durationInFrames={240}
          premountFor={fps}
        >
          <MatchScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />
        <TransitionSeries.Sequence
          name="5 · Approval"
          durationInFrames={255}
          premountFor={fps}
        >
          <ApprovalScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />
        <TransitionSeries.Sequence
          name="6 · Value"
          durationInFrames={180}
          premountFor={fps}
        >
          <ValueScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      <Audio
        name="Ambient bed"
        src={staticFile("sfx/ambient.mp3")}
        volume={(f) =>
          interpolate(
            f,
            [0, 30, TOTAL_DURATION - 45, TOTAL_DURATION],
            [0, 0.42, 0.42, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          )
        }
      />
      {cutPoints.map((t, i) => (
        <Sequence
          key={t}
          name={`Transition whoosh ${i + 1}`}
          from={t - 4}
          durationInFrames={fps}
          premountFor={fps}
        >
          <Audio src={staticFile("sfx/whoosh.wav")} volume={0.35} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
