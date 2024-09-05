import { BarStep } from "@/components/BarStep/BarStep";
import { StepProps } from "@/components/Step/StepInterface";
import { cssAlignHorizontalStyle, cssAlignVerticalStyle } from "@/styles/align";

export const SignUpContent = ({ step, stepList }: StepProps) => {
  return (
    <div css={cssAlignVerticalStyle({ gap: 40 })}>
      <div css={cssAlignVerticalStyle({ gap: 16 })}>
        <BarStep step={step} stepList={stepList} />
        <div css={cssAlignHorizontalStyle}>
          {(!step.isFirst || step.isLast) && (
            <button onClick={step.handleOnClickPrev}>이전</button>
          )}
          {step.isLast ? (
            <button onClick={step.handleOnReset}>처음으로</button>
          ) : (
            <button onClick={step.handleOnClickNext}>확인</button>
          )}
        </div>
      </div>
    </div>
  );
};
