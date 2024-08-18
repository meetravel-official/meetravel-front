import { ReactNode } from "react";
import { useHeaderState } from "states/useHeader";

import { COLORS } from "@/styles/color";

import { Typography } from "../Typography/Typography";
import { cssHeaderCenterStyle, cssHeaderStyle } from "./Header.styles";

interface HeaderProps {
  prefix?: ReactNode;
  titleContent?: ReactNode;
  suffix?: ReactNode;
}

/**
 * Header
 * @description 레이아웃이나 페이지 상단에 직접 이용 가능
 * @param prefix - 왼쪽 컨트롤 컴포넌트 지정
 * @param titleContent - zustand로 지정한 타이틀 대신 reactNode 지정 가능
 * @param suffix - 오른쪽 컨트롤 컴포넌트 지정
 */
export const Header = ({ prefix, titleContent, suffix }: HeaderProps) => {
  const { title } = useHeaderState();

  return (
    <div css={cssHeaderStyle}>
      {prefix && <div>{prefix}</div>}
      <div css={cssHeaderCenterStyle}>
        {titleContent ? (
          titleContent
        ) : (
          <Typography color={COLORS.GRAY3} size="20" weight="bold">
            {title}
          </Typography>
        )}
      </div>
      {suffix && <div>{suffix}</div>}
    </div>
  );
};
