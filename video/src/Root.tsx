import React from "react";
import { Composition, Folder } from "remotion";
import { CareTakerDemo, SCENES, TOTAL_DURATION } from "./CareTakerDemo";
import { AnalysisScene } from "./scenes/AnalysisScene";
import { ApprovalScene } from "./scenes/ApprovalScene";
import { MatchScene } from "./scenes/MatchScene";
import { ProblemScene } from "./scenes/ProblemScene";
import { RequestScene } from "./scenes/RequestScene";
import { ValueScene } from "./scenes/ValueScene";

const size = { width: 1920, height: 1080, fps: 30 };

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CareTakerDemo"
        component={CareTakerDemo}
        durationInFrames={TOTAL_DURATION}
        {...size}
      />
      <Folder name="Scenes">
        <Composition
          id="Problem"
          component={ProblemScene}
          durationInFrames={SCENES.problem}
          {...size}
        />
        <Composition
          id="Request"
          component={RequestScene}
          durationInFrames={SCENES.request}
          {...size}
        />
        <Composition
          id="Analysis"
          component={AnalysisScene}
          durationInFrames={SCENES.analysis}
          {...size}
        />
        <Composition
          id="Match"
          component={MatchScene}
          durationInFrames={SCENES.match}
          {...size}
        />
        <Composition
          id="Approval"
          component={ApprovalScene}
          durationInFrames={SCENES.approval}
          {...size}
        />
        <Composition
          id="Value"
          component={ValueScene}
          durationInFrames={SCENES.value}
          {...size}
        />
      </Folder>
    </>
  );
};
