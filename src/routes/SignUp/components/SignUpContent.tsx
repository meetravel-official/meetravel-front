import { BarStep } from "@/components/BarStep/BarStep";
import { StepProps } from "@/components/Step/StepInterface";
import { cssAlignVerticalStyle } from "@/styles/align";

export const SignUpContent = ({ step, stepList }: StepProps) => {
  return (
    <div css={cssAlignVerticalStyle({ gap: 40 })}>
      <div css={cssAlignVerticalStyle({ gap: 16 })}>
        <BarStep step={step} stepList={stepList} disabled="next" />
      </div>
    </div>
  );
};
