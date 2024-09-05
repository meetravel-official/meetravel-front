import { SerializedStyles } from "@emotion/react";
import React, { useState } from "react";

import { GroupContainer } from "../RadioButton/RadioButton.style";
import CheckButton from "./CheckButton";

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
 * CheckButtonGroup
 * @param gridType inline grid 설정
 * @param gridDetailStyle grid 세부 설정
 * @param buttonDetailStyle checkbox group 내부 버튼 스타일 통일 필요시 사용
 */
const CheckButtonGroup = ({
  children,
  defaultValue,
  onChange,
  gridType = "column",
  gridDetailStyle,
  buttonDetailStyle,
}: IRadioGroupProps) => {
  const [selectedValue, setSelectedValue] = useState<string[]>([defaultValue]);

  const handleChange = (value: string) => {
    setSelectedValue((pre) =>
      pre.includes(value)
        ? [...pre].filter((item) => item !== value)
        : [...pre, value]
    );
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div role="group" css={GroupContainer(gridType, gridDetailStyle)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            checked: selectedValue.includes(child.props.value),
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

CheckButtonGroup.CheckboxButton = CheckButton;

export default CheckButtonGroup;
