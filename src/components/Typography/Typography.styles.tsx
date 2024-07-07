import { css } from "@emotion/react";

import { TypographyStyle } from "./Typography";

export const cssTypographyStyle = (props: TypographyStyle) =>
  css`
    display: ${props.mode};
    color: ${props.color};
    text-align: ${props.align};
    font-weight: ${props.weight};
    font-size: ${props.size}px;
    text-decoration: ${props.underline ? "underline" : "none"};
    ${props.detailStyle}
  `;
