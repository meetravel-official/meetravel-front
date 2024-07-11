import { SerializedStyles } from "@emotion/react";

import { useStepConsumer } from "./Step";
import { cssStepContentStyle } from "./Step.styles";

export const StepContent = ({
  detailStyle,
}: {
  detailStyle?: SerializedStyles;
}) => {
  const { stepList, current } = useStepConsumer();

  return (
    <div css={cssStepContentStyle(detailStyle)}>
      {stepList[current].content}
    </div>
  );
};
