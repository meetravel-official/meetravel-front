import { SerializedStyles } from "@emotion/react";

import {
  cssInputIconStyle,
  cssInputStyle,
  cssInputWrapperStyle,
} from "./Input.styles";

interface InputProps {
  value?: string | number | readonly string[];
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  inputStyle?: InputStyle;
  error?: string;
  suffix?: React.ReactNode;
  detailStyle?: SerializedStyles;
}

export interface InputStyle {
  width?: string;
  height?: string;
}
/**
 * Input - form 대응
 * @param inputStyle Input의 style을 설정
 * @params form 대응 - vlue, onChange, error 필요
 */
const Input = ({
  value,
  onChange,
  error,
  placeholder,
  inputStyle: style = {},
  detailStyle,
  suffix,
}: InputProps) => {
  return (
    <div>
      <div css={cssInputWrapperStyle(style, error, detailStyle)}>
        {value && onChange ? (
          <input
            type="input"
            css={cssInputStyle}
            value={value || ""}
            onChange={onChange}
            placeholder={placeholder}
          />
        ) : (
          <input type="input" css={cssInputStyle} placeholder={placeholder} />
        )}
        <div css={cssInputIconStyle}>{suffix}</div>
      </div>
    </div>
  );
};

export default Input;
