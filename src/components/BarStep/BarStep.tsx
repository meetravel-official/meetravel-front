import { Bar, Step } from "@/components";
import { StepProps } from "@/components/Step/StepInterface";
import { cssAlignVerticalStyle } from "@/styles/align";

export const BarStep = ({ step, stepList }: StepProps) => {
  return (
    <Step step={step} stepList={stepList}>
      <div css={cssAlignVerticalStyle({ gap: 16, alignItems: "flex-start" })}>
        <Step.Stepper disabled="all" />
        <Bar />
        <Step.Content />
      </div>
    </Step>
  );
};
