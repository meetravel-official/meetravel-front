import { Step } from "@/components";
import { StepProps } from "@/components/Step/StepInterface";
import { cssAlignVerticalStyle } from "@/styles/align";

export const HomeStep = ({ step, stepList }: StepProps) => {
  return (
    <div css={cssAlignVerticalStyle({ gap: 8 })}>
      <Step step={step} stepList={stepList}>
        <div css={cssAlignVerticalStyle({ gap: 16, alignItems: "flex-start" })}>
          <Step.Stepper />
          <div />
          <Step.Content />
        </div>
      </Step>
    </div>
  );
};
