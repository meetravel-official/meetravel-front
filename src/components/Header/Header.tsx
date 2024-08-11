import { ReactNode } from "react";
import { useHeaderState } from "states/useHeader";

import { COLORS } from "@/styles/color";

import { Typography } from "../Typography/Typography";
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
      <div css={cssHeaderCenterStyle}>
        <Typography color={COLORS.GRAY3} size="20" weight="bold">
          {title}
        </Typography>
      </div>
      {suffix && <div>{suffix}</div>}
    </div>
  );
};
