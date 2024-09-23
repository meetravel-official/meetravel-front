import { css, SerializedStyles } from "@emotion/react";

import { COLORS } from "@/styles/color";

export const cssSelectBtnStyle = (width?: number) => css`
  all: unset;

  background: white;

  box-sizing: border-box;
  width: ${width ? `${width}px` : "auto"};
  height: max-content;
  padding: 16px 14px;
  line-height: 100%;

  border: 1px solid ${COLORS.GRAY3};
  border-radius: 8px;

  display: inline-flex;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;

  svg {
    transform: rotate(90deg);
  }
`;

export const cssSelectListStyle = ({
  optionListStyle,
}: {
  optionListStyle?: SerializedStyles;
}) => css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 30px;
  ${optionListStyle}
`;
