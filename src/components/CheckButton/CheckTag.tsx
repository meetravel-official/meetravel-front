import { css, SerializedStyles } from "@emotion/react";

import { RadioInput } from "../RadioButton/RadioButton.style";
import { cssCheckTagStyle } from "./CheckButton.style";

interface IRadioProps {
  children?: React.ReactNode;
  value?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  detailStyle?: SerializedStyles;
}

/**
 * CheckButton Component
 * @param detailStyle checkbox 버튼 세부 스타일, CheckboxGroup에서 buttonDetailStyle 사용시 적용x
 */
const CheckTag = ({
  children,
  value = "",
  checked = false,
  onChange,
  icon,
  detailStyle,
}: IRadioProps) => {
  return (
    <div>
      <label css={cssCheckTagStyle({ checked, detailStyle })}>
        <input
          css={RadioInput}
          type="checkbox"
          value={value}
          checked={checked}
          onChange={onChange}
        />
        {icon}
        <div
          css={css`
            text-align: center;
          `}
        >
          {children}
        </div>
      </label>
    </div>
  );
};

export default CheckTag;
