import { SerializedStyles } from "@emotion/react";

import { Bar, Step } from "@/components";
import { StepProps } from "@/components/Step/StepInterface";
import { cssAlignVerticalStyle } from "@/styles/align";

export const BarStep = ({
  step,
  stepList,
  contentDetailStyle,
  disabled,
}: StepProps & {
  contentDetailStyle?: SerializedStyles;
  disabled?: "prev" | "next" | "all";
}) => {
  return (
    <Step step={step} stepList={stepList}>
      <div css={cssAlignVerticalStyle({ gap: 16, alignItems: "flex-start" })}>
        <Step.Stepper disabled={disabled || "all"} />
        <Bar />
        <Step.Content detailStyle={contentDetailStyle} />
      </div>
    </Step>
  );
};
