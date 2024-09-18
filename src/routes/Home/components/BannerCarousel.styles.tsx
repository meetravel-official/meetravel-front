import { css } from "@emotion/react";

import { cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

export const cssBannerCarouselItemStyle = css`
  all: unset;
  cursor: pointer;

  position: relative;
  width: 100%;
  height: 100%;

  .typography {
    text-shadow: 0px 0px 2px ${COLORS.GRAY5};
  }
`;

export const cssBannerCarouselItemImageStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
`;

export const cssBannerCarouselItemTitleStyle = css`
  position: absolute;
  top: 16px;
  left: 20px;
  z-index: 1;

  ${cssAlignVerticalStyle({ gap: 4, alignItems: "flex-start" })};
  width: max-content;
`;

export const cssBannerCarouselItemDateStyle = css`
  position: absolute;
  bottom: 24px;
  right: 20px;
  z-index: 1;
`;
