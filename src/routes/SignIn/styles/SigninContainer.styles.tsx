import { css } from "@emotion/react";

export const cssKaKaoSignInBtnStyle = css`
  background-color: unset !important;
  .btn-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
`;

export const cssSignInComponentLayoutStyle = css`
  min-height: inherit;
  .logo-wrapper {
    display: flex;
    justify-content: center;
    height: calc(100vh - 100px);
  }
  a.kakao-sign-in-link {
    width: 100%;
  }
`;
