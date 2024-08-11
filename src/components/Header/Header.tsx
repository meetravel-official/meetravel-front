import { ReactNode } from "react";
import { useHeaderState } from "states/useHeader";

import { cssHeaderCenterStyle, cssHeaderStyle } from "./Header.styles";

interface HeaderProps {
  prefix?: ReactNode;
  suffix?: ReactNode;
}

export const Header = ({ prefix, suffix }: HeaderProps) => {
  const { title } = useHeaderState();

  return (
    <div css={cssHeaderStyle}>
      {prefix && <div>{prefix}</div>}
      <div css={cssHeaderCenterStyle}>{title}</div>
      {suffix && <div>{suffix}</div>}
    </div>
  );
};
