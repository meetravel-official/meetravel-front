import { css } from "@emotion/react";

export const cssUserAvatarRootStyle = (size?: number) => css`
  display: flex;
  width: ${size || 48}px;
  height: ${size || 48}px;
  border-radius: 100%;
`;

export const cssUserAvatarImageStyle = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
`;
