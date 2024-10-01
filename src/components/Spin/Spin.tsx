import { cssSpinStyle } from "./Spin.styles";

export interface SpinProps {
  size?: number;
  color?: string;
}

export const Spin = (props: SpinProps) => {
  return <div css={cssSpinStyle(props)}></div>;
};
