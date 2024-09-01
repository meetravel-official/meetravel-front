import { css, SerializedStyles } from "@emotion/react";

import { COLORS } from "@/styles/color";

export const CheckboxLabel = ({
  checked,
  detailStyle,
}: {
  checked?: boolean;
  detailStyle?: SerializedStyles;
}) => css`
  -webkit-tap-highlight-color: transparent !important; // 모바일에서 링크 클릭 시 하이라이트 제거
  cursor: pointer;
  transition-property: color, background-color, text-decoration-color, fill,
    stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
  outline: ${checked ? `1px solid ${COLORS.PINK3}` : "none"};
  border: none;
  background-color: ${COLORS.GRAY1};
  color: ${checked ? COLORS.PINK3 : COLORS.GRAY4};
  width: 104px;
  height: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  border-radius: 8px;

  ${detailStyle}
`;
