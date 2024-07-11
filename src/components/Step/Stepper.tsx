import { SerializedStyles } from "@emotion/react";

import { useStepConsumer } from "./Step";
import { cssStepDotStyle, cssStepperStyle } from "./Step.styles";

/**
 * Step - Stepper
 * @param disabled 스텝 도트 클릭 시 동작 제한
 * @param detailedStyle 상세 스타일 지정
 */

export const Stepper = ({
  detailStyle,
  disabled,
}: {
  detailStyle?: SerializedStyles;
  disabled?: "prev" | "next" | "all";
}) => {
  const { stepList, current, setCurrent } = useStepConsumer();

  const handleOnClickStepDot = (chosenStep: number) => {
    setCurrent(chosenStep);
  };

  const getDisabled = (index: number) => {
    if (disabled === "all" && current !== index) return true;
    if (disabled === "prev" && current > index) return true;
    if (disabled === "next" && current < index) return true;
    return false;
  };

  return (
    <div css={cssStepperStyle(detailStyle)}>
      {stepList.map((_step, index) => (
        <button
          key={index}
          css={cssStepDotStyle({
            active: current === index,
            disabled: getDisabled(index),
          })}
          disabled={getDisabled(index)}
          onClick={() => handleOnClickStepDot(index)}
        />
      ))}
    </div>
  );
};
