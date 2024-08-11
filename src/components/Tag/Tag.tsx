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

type TTagProps = PropsWithChildren & ITagStyle;
/**
 * Tag component
 * @param icon tag icon, default: undefined
 * @param width tag width, default: fit-content
 * @param bgColor tag background color, default: #FFD0E1(PINK1)
 * @param color tag color, default: #6F6969(GRAY4)
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
}: TTagProps) => {
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
