import { css, SerializedStyles } from "@emotion/react";

import { RadioInput, RadioButtonLabel } from "./RadioButton.style";

interface IRadioProps {
  children?: React.ReactNode;
  value?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  detailStyle?: SerializedStyles;
}

/**
 * Radio Component
 * @param detailStyle radio 버튼 세부 스타일, RadioGroup에서 buttonDetailStyle 사용시 적용x
 */
const RadioButton = ({
  children,
  value = "",
  checked = false,
  onChange,
  detailStyle,
}: IRadioProps) => {
  return (
    <div>
      <label css={RadioButtonLabel({ checked, detailStyle })}>
        <input
          css={RadioInput}
          type="radio"
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

export default RadioButton;
