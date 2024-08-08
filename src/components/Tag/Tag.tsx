import { SerializedStyles } from "@emotion/react";
import { PropsWithChildren } from "react";

import { COLORS } from "@/styles/color";

import { cssTagStyle } from "./Tag.styles";

export interface ITagStyle {
  icon?: React.ReactNode;
  width?: number | string;
  bgColor?: string;
  color?: string;
  align?: "start" | "end" | "center" | "justify";
  detailStyle?: SerializedStyles;
}

type TButtonProps = PropsWithChildren & ITagStyle;
/**
 * Button component
 * @param icon button icon, default: undefined
 * @param width button width, default: fit-content
 * @param bgColor button background color, default: #FFD0E1(PINK1)
 * @param color button color, default: #6F6969(GRAY4)
 * @param align text align, default: center
 * @param detailStyle 기타 세부 css 전달
 */

export const Tag = ({
  children,
  icon,
  width = "fit-content",
  bgColor = COLORS.PINK1,
  color = COLORS.GRAY4,
  align = "center",
  detailStyle,
}: TButtonProps) => {
  return (
    <div
      className="tag"
      css={cssTagStyle({
        width,
        bgColor,
        color,
        align,
        detailStyle,
      })}
    >
      {icon}
      {children}
    </div>
  );
};
