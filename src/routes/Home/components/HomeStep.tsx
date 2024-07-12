import { css } from "@emotion/react";

import { Step } from "@/components";
import { StepProps } from "@/components/Step/StepInterface";
import { cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

export const HomeStep = ({ step, stepList }: StepProps) => {
  return (
    <div css={cssAlignVerticalStyle({ gap: 8 })}>
      <Step step={step} stepList={stepList}>
        <div css={cssAlignVerticalStyle({ gap: 16, alignItems: "flex-start" })}>
          <Step.Stepper />
          <div />
          <Step.Content
            detailStyle={css`
              background: ${COLORS.PINK2};
              color: white;
              min-height: 50vh;
            `}
          />
        </div>
      </Step>
    </div>
  );
};
