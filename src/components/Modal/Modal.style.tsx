import { css, SerializedStyles } from "@emotion/react";

import { WIDTH } from "@/styles/breakpoint";
import { COLORS } from "@/styles/color";

import { ModalType } from "./Modal";

export const cssModalStyle = ({
  modalType,
  modalDetailStyle,
  zIndex,
}: {
  modalType: ModalType;
  modalDetailStyle?: SerializedStyles;
  zIndex?: number;
}) => {
  const modalTypeStyles = {
    simple: css`
      text-align: center;
    `,
    normal: css`
      margin: auto;
      width: 300px;
    `,
    full: css`
      position: fixed;
      box-sizing: border-box;
      width: 100%;
      max-width: ${WIDTH.SM};
      padding: 15px;
      padding-top: 16px;
      margin: 0;
      margin-top: -1px;
      height: calc(var(--vh, 1vh) * 100);
    `,
  };
  return css`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: auto;
    border-radius: ${modalType === "full" ? 0 : "8px"};
    background-color: white;
    width: 300px;
    padding: 20px 10px 10px;
    animation: fade-in 200ms;
    z-index: ${zIndex ? zIndex + 1 : 100};
    @keyframes fade-in {
      from {
        opacity: 0;
        transform: translate(-50%, -48%) scale(0.96);
      }
      to {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
    }
    ${modalTypeStyles[modalType]}
    ${modalDetailStyle}
  `;
};
export const cssModalContentStyle = (
  modalType?: ModalType,
  isFooter?: boolean
) => css`
  overflow-y: auto;
  overflow-x: hidden;
  height: ${modalType === "full"
    ? isFooter
      ? "calc(var(--vh, 1vh) * 100 - 85px)"
      : "calc(var(--vh, 1vh) * 100 - 31px)"
    : "auto"};
  margin-bottom: 5px;
  padding: 1px;
`;

export const cssOverlayStyle = ({ zIndex }: { zIndex?: number }) => css`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
  z-index: ${zIndex || 99};
  backdrop-filter: blur(3px);
`;

export const cssCrossIcon = css`
  position: relative;
  cursor: pointer;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: none;
  background-color: rgba(0, 0, 0, 0);
  &:hover {
    transition: background-color 500ms;
    background-color: ${COLORS.GRAY1};
  }
  &:focus {
    outline: 2px solid ${COLORS.PINK1};
    border: none;
  }
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 14px;
    height: 14px;
  }
`;

export const cssFooterStyle = css`
  display: flex;
  gap: 8px;
`;
