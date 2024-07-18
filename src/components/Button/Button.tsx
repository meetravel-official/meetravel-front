import { SerializedStyles } from "@emotion/react";
import { PropsWithChildren } from "react";

import { COLORS } from "@/styles/color";

import { cssButtonStyle } from "./Button.styles";

export interface IButtonStyle {
  icon?: React.ReactNode;
  size?: "regular" | "large" | number;
  width?: number;
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
 * @param size button size, default: regular
 * @param width button width, default: 100%
 * @param bgColor button background color, default: #F5F5F5(GRAY1)
 * @param color button color, default: #FFD0E1(PINK1)
 * @param align text align, default: center
 * @param disabled default: false
 * @param detailStyle 기타 세부 css 전달
 */

export const Button = ({
  children,
  icon,
  size = "regular",
  width = 100,
  bgColor = COLORS.GRAY1,
  color = COLORS.PINK1,
  align = "center",
  disabled,
  detailStyle,
}: TButtonProps) => {
  const buttonSize = (size: number | string) => {
    if (typeof size === "number") {
      return size;
    } else {
      switch (size) {
        case "regular":
          return 48;
        case "large":
          return 52;
        default:
          return 48;
      }
    }
  };

  return (
    <button
      className="button"
      css={cssButtonStyle({
        size: buttonSize(size),
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
