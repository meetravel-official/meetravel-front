import { SerializedStyles } from "@emotion/react";

import { Bar, Step } from "@/components";
import { StepProps } from "@/components/Step/StepInterface";
import { cssAlignVerticalStyle } from "@/styles/align";

export const BarStep = ({
  step,
  stepList,
  contentDetailStyle,
}: StepProps & { contentDetailStyle?: SerializedStyles }) => {
  return (
    <Step step={step} stepList={stepList}>
      <div css={cssAlignVerticalStyle({ gap: 16, alignItems: "flex-start" })}>
        <Step.Stepper disabled="all" />
        <Bar />
        <Step.Content detailStyle={contentDetailStyle} />
      </div>
    </Step>
  );
};
