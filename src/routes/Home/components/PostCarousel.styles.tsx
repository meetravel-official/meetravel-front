import { css } from "@emotion/react";

import { cssAlignVerticalStyle } from "@/styles/align";

export const cssPostCarouselItemStyle = css`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const cssPostCarouselItemImageStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
`;

export const cssPostCarouselItemTitleStyle = css`
  position: absolute;
  top: 16px;
  left: 20px;
  z-index: 1;

  ${cssAlignVerticalStyle({ gap: 4, alignItems: "flex-start" })};
  width: max-content;
`;

export const cssPostCarouselItemDateStyle = css`
  position: absolute;
  bottom: 24px;
  right: 20px;
  z-index: 1;
`;
