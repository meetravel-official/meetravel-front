import { css, SerializedStyles } from "@emotion/react";

import { RadioInput } from "../Radio/Radio.style";
import { CheckboxLabel } from "./Checkbox.style";

interface IRadioProps {
  children?: React.ReactNode;
  value?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  detailStyle?: SerializedStyles;
}

/**
 * Checkbox Component
 * @param detailStyle checkbox 버튼 세부 스타일, CheckboxGroup에서 buttonDetailStyle 사용시 적용x
 */
const Checkbox = ({
  children,
  value = "",
  checked = false,
  onChange,
  detailStyle,
}: IRadioProps) => {
  return (
    <div>
      <label css={CheckboxLabel({ checked, detailStyle })}>
        <input
          css={RadioInput}
          type="checkbox"
          value={value}
          checked={checked}
          onChange={onChange}
        />
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

export default Checkbox;
