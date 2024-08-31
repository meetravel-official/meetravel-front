import { SerializedStyles } from "@emotion/react";

import { useStepConsumer } from "./Step";
import { cssStepContentStyle } from "./Step.styles";

/**
 * Step Content - 선택된 단계의 콘텐트를 표시
 * @param detailedStyle 상세 스타일 지정
 */
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
