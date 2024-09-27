import { SerializedStyles } from "@emotion/react";
import { PropsWithChildren } from "react";

import { ReactComponent as LinkArrow } from "@/assets/icons/link-arrow.svg";
import { COLORS } from "@/styles/color";

import { cssButtonStyle, cssLinkStyle } from "./Button.styles";

type TButtonHeightProps = "regular" | "large";
export interface IButtonStyle {
  icon?: React.ReactNode;
  height?: TButtonHeightProps | number | string;
  width?: number | string;
  bgColor?: string;
  color?: string;
  align?: "start" | "end" | "center" | "justify";
  disabled?: boolean;
  link?: boolean;
  linkColor?: string;
  detailStyle?: SerializedStyles;
  onClick?: () => void;
}

export type TButtonProps = PropsWithChildren & IButtonStyle;
/**
 * Button component
 * @param icon button icon, default: undefined
 * @param height button height, default: regular
 * @param width button width, default: 100%
 * @param bgColor button background color, default: #F5F5F5(GRAY1)
 * @param color button color, default: #FFD0E1(PINK1)
 * @param align icon-button align, default: center
 * @param disabled default: false
 * @param link default: false
 * @param linkColor 화살표 아이콘 컬러 default:#FF96AF
 * @param detailStyle 기타 세부 css 전달
 * @param onClick 버튼 클릭 이벤트
 */

export const Button = ({
  children,
  icon,
  height = "regular",
  width = "100%",
  bgColor = COLORS.GRAY1,
  color = COLORS.PINK1,
  align = "center",
  link,
  linkColor = COLORS.PINK2,
  disabled,
  detailStyle,
  onClick,
}: TButtonProps) => {
  const buttonHeight = (height: TButtonHeightProps | number | string) => {
    if (typeof height === "string") {
      switch (height) {
        case "regular":
          return 48;
        case "large":
          return 52;
        default:
          return height;
      }
    } else {
      return height;
    }
  };

  return (
    <button
      className="button"
      css={cssButtonStyle({
        height: buttonHeight(height),
        width,
        bgColor,
        color,
        align,
        disabled,
        detailStyle,
      })}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      {children}
      {link && (
        <LinkArrow
          css={cssLinkStyle}
          stroke={linkColor}
          strokeWidth={2}
          width={8}
          height={16}
        />
      )}
    </button>
  );
};
