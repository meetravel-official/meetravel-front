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
  error?: string;
  suffix?: React.ReactNode;
  detailStyle?: SerializedStyles;
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
  detailStyle,
  suffix,
}: InputProps) => {
  return (
    <div css={cssInputWrapperStyle(error, detailStyle)}>
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
      {suffix && <div css={cssInputIconStyle}>{suffix}</div>}
    </div>
  );
};

export default Input;
