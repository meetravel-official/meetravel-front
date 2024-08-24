import { SerializedStyles } from "@emotion/react";
import { PropsWithChildren } from "react";

import { COLORS } from "@/styles/color";

import { cssButtonStyle } from "./Button.styles";

type TButtonHeightProps = "regular" | "large";
export interface IButtonStyle {
  icon?: React.ReactNode;
  height?: TButtonHeightProps | number | string;
  width?: number | string;
  bgColor?: string;
  color?: string;
  align?: "start" | "end" | "center" | "justify";
  disabled?: boolean;
  detailStyle?: SerializedStyles;
}

type TButtonProps = PropsWithChildren & IButtonStyle;
/**
 * Button component
 * @param icon button icon, default: undefined
 * @param height button height, default: regular
 * @param width button width, default: 100%
 * @param bgColor button background color, default: #F5F5F5(GRAY1)
 * @param color button color, default: #FFD0E1(PINK1)
 * @param align icon-button align, default: center
 * @param disabled default: false
 * @param detailStyle 기타 세부 css 전달
 */

export const Button = ({
  children,
  icon,
  height = "regular",
  width = "100%",
  bgColor = COLORS.GRAY1,
  color = COLORS.PINK1,
  align = "center",
  disabled,
  detailStyle,
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
    >
      {icon}
      {children}
    </button>
  );
};
