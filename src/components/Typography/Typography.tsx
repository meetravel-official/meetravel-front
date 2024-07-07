import { SerializedStyles } from "@emotion/react";
import { PropsWithChildren } from "react";

import { COLORS } from "@/styles/color";

import { cssTypographyStyle } from "./Typography.styles";

export interface TypographyStyle {
  mode?: "inline" | "block";
  size?: "24" | "20" | "16" | "14" | "12" | number;
  weight?:
    | "thin"
    | "extraLight"
    | "light"
    | "regular"
    | "medium"
    | "semiBold"
    | "bold"
    | "extraBold"
    | "black"
    | number;
  color?: string;
  align?: "start" | "end" | "center" | "justify";
  underline?: boolean;
  detailStyle?: SerializedStyles;
}

type TypographyProps = PropsWithChildren & TypographyStyle;
/**
 * Typography component
 * @param mode display mode, default: inline
 * @param size font size(px), default: 16px
 * @param weight font weight, default: regular(400)
 * @param color font color, default: #393636(gray5)
 * @param align text align, default: start
 * @param underline default: false
 * @param detailStyle 기타 세부 css 전달
 */
export const Typography = ({
  children,
  mode = "inline",
  color = COLORS.GRAY5,
  align = "start",
  size = "16",
  weight = "regular",
  underline,
  detailStyle,
}: TypographyProps) => {
  const fontWeight = (weight: number | string) => {
    if (typeof weight === "number") return weight;
    else {
      switch (weight) {
        case "thin":
          return 100;
        case "extraLight":
          return 200;
        case "light":
          return 300;
        case "medium":
          return 500;
        case "semiBold":
          return 600;
        case "bold":
          return 700;
        case "extraBold":
          return 800;
        case "black":
          return 900;
        case "regular":
        default:
          return 400;
      }
    }
  };

  return (
    <span
      className="typography"
      css={cssTypographyStyle({
        mode,
        size,
        weight: fontWeight(weight),
        color,
        align,
        underline,
        detailStyle,
      })}
    >
      {children}
    </span>
  );
};
