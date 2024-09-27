import { css } from "@emotion/react";

export const cssModalButtonStyle = css`
  position: absolute;
  right: 16px;
  bottom: 80px;
  width: 60px;
  height: 60px;
  border-radius: 100%;
  box-shadow: 0 0 12px 0px #00000040;
  svg {
    scale: 1.4;
    transform: translate(-1px, 1px);
  }
`;

export const cssModalTitleStyle = css`
  display: flex;
`;

export const cssModalTitleTextStyle = css`
  display: block;
  margin-bottom: 32px;
  margin-left: 8px;
`;

export const cssModalFooterStyle = css`
  width: -webkit-fill-available;
  display: flex;
  gap: 8px;
  bottom: 15px;
  z-index: 100;
  backdrop-filter: blur(10px);
  height: 60px;
  align-items: center;
`;
