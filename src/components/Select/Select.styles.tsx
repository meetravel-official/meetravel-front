import { css } from "@emotion/react";

import { COLORS } from "@/styles/color";

import { ISelectStyle } from "./Select";

type ISelectStyleOmit = Omit<ISelectStyle, "selectOptions" | "onChange">;

interface ISelectStyleProps extends ISelectStyleOmit {
  isOpen: boolean;
}

export const cssSelectStyle = ({
  width,
  bgColor,
  color,
  borderWidth,
  borderColor,
  disabled,
  isOpen,
  detailStyles,
}: ISelectStyleProps) => css`
  button {
    all: unset;
  }
  .select-trigger {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 16px 20px;
    font-size: 16px;
    font-weight: 700;
    line-height: 1;
    width: ${width ? width : "fit-content"};
    gap: 8px;
    background-color: ${disabled ? COLORS.GRAY3 : bgColor};
    border: ${borderWidth}px solid ${borderColor};
    color: ${disabled ? COLORS.GRAY3 : color};
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom-left-radius: ${isOpen ? "unset" : "8px"};
    border-bottom-right-radius: ${isOpen ? "unset" : "8px"};
  }
  .select-content {
    overflow: hidden;
    background-color: ${disabled ? COLORS.GRAY3 : bgColor};
    font-weight: 700;
    border: ${borderWidth}px solid ${borderColor};
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    border-top-left-radius: ${isOpen ? "unset" : "8px"};
    border-top-right-radius: ${isOpen ? "unset" : "8px"};
    border-top: unset;
  }
  .select-item {
    font-size: 16px;
    line-height: 1;
    color: ${disabled ? COLORS.GRAY3 : color};
    border-bottom: ${borderWidth}px solid;
    display: flex;
    align-items: center;
    height: 25px;
    padding: 16px 20px;
    position: relative;
    &:active {
      background-color: ${COLORS.PINK1};
    }
    &:last-child {
      border-bottom: none;
    }
    &:focus-visible {
      outline: unset;
    }
    .select-icon {
      max-height: 14px;
    }
    ${detailStyles}
  }
`;
