import { css } from "@emotion/react";

import { ITagStyle } from "./Tag";

export const cssTagStyle = ({
  width,
  bgColor,
  color,
  align,
  detailStyle,
}: ITagStyle) => css`
  width: ${typeof width === "number" ? `${width}px` : width};
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: ${align};
  background-color: ${bgColor};
  color: ${color};
  border: none;
  border-radius: 50px;
  gap: 8px;
  ${detailStyle}
`;
