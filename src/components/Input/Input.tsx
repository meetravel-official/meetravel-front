import { cssInputStyle } from "./Input.styles";

interface InputProps {
  value?: string | number | readonly string[];
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  inputStyle?: InputStyle;
  error?: string;
}
export interface InputStyle {
  width?: string;
  height?: string;
}
/**
 * Input - form 대응
 * @param inputStyle Input의 style을 설정
 */
const Input = ({
  value,
  onChange,
  error,
  placeholder,
  inputStyle: style = {},
}: InputProps) => {
  return (
    <input
      type="input"
      css={cssInputStyle(style, error)}
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default Input;
