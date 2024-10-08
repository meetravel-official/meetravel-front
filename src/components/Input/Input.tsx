import { SerializedStyles } from "@emotion/react";

import {
  cssInputIconStyle,
  cssInputStyle,
  cssInputWrapperStyle,
} from "./Input.styles";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  error?: string;
  suffix?: React.ReactNode;
  detailStyle?: SerializedStyles;
  inputDetailStyle?: SerializedStyles;
}

/**
 * Input - form 대응
 * @param inputStyle Input의 style을 설정
 * @params form 대응 - vlue, onChange, error 필요
 */
const Input = ({
  error,
  placeholder,
  detailStyle,
  inputDetailStyle,
  suffix,
  ...props
}: InputProps) => {
  return (
    <div css={cssInputWrapperStyle(error, detailStyle)}>
      <input
        type="input"
        css={cssInputStyle(inputDetailStyle)}
        placeholder={placeholder}
        {...props}
      />
      {suffix && <div css={cssInputIconStyle}>{suffix}</div>}
    </div>
  );
};

export default Input;
