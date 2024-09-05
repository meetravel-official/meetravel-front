import { css, SerializedStyles } from "@emotion/react";
import React, { useState } from "react";

import RadioButton from "./RadioButton";
import { GroupContainer } from "./RadioButton.style";

export type GridType = "column" | "row";

interface IRadioGroupProps {
  children: React.ReactNode;
  defaultValue: string;
  onChange?: (value: string) => void;
  gridType?: GridType;
  gridDetailStyle?: SerializedStyles;
  buttonDetailStyle?: SerializedStyles;
}
/**
 * RadioGroup
 * @param gridType inline grid 설정
 * @param gridDetailStyle grid 세부 설정
 * @param buttonDetailStyle radio group 내부 버튼 스타일 통일 필요시 사용
 */
const RadioButtonGroup = ({
  children,
  defaultValue,
  onChange,
  gridType = "column",
  gridDetailStyle,
  buttonDetailStyle,
}: IRadioGroupProps) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleChange = (value: string) => {
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div role="group" css={GroupContainer(gridType, gridDetailStyle)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            checked: child.props.value === selectedValue,
            onChange: () => handleChange(child.props.value),
            detailStyle: buttonDetailStyle
              ? buttonDetailStyle
              : child.props.detailStyle,
          });
        }
        return child;
      })}
    </div>
  );
};

RadioButtonGroup.RadioButton = RadioButton;

export default RadioButtonGroup;
