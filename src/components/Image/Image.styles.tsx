import { css } from "@emotion/react";

import { COLORS } from "@/styles/color";

import { ImageStyle } from "./Image";

export const cssImageStyle = ({ width, height, objectFit }: ImageStyle) => css`
  width: ${width || "100%"};
  height: ${height || "auto"};
  object-fit: ${objectFit || "cover"};
`;

export const cssNoImageStyle = ({ width, height }: ImageStyle) => css`
  width: ${width || "100%"};
  height: ${height || "auto"};
  background: ${COLORS.GRAY2};

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    height: 50%;
    width: auto;
    aspect-ratio: 1;
  }
`;

export const cssLoadingStyle = () => css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  background: ${COLORS.GRAY2};
  @keyframes purse {
    50% {
      filter: brightness(110%);
    }
  }
  animation: purse 2s ease-in-out infinite;
`;

export const cssImageContainerStyle = ({ width, height }: ImageStyle) => css`
  position: relative;
  width: ${width || "100%"};
  height: ${height || "auto"};
`;
