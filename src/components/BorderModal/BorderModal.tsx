import { css, SerializedStyles } from "@emotion/react";
import React, { Fragment, useEffect } from "react";

import { ReactComponent as CrossIcon } from "@/assets/icons/cross.svg";

import { ModalButton, ModalType } from "../Modal/Modal";
import { Typography } from "../Typography/Typography";
import {
  cssCrossIcon,
  cssFooterStyle,
  cssModalContentStyle,
  cssModalHeaderStyle,
  cssModalStyle,
  cssOverlayStyle,
} from "./BorderModal.styles";

export interface BorderModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalDetailStyle?: SerializedStyles;
  zIndex?: number;
  title?: string | React.ReactNode;
  closableIcon?: boolean;
  modalType: ModalType;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}
/**
 * 모달 컴포넌트
 * @param modalType simple: center align, normal: no style, full: 100% width
 * @param modalDetailStyle modal style
 * @param title string 입력시 center align, ReactNode 입력시 해당 style 적용
 * @param closableIcon true: close button, false: no close button
 * @param footer flex 기본
 * @param zIndex modal z index(default: 99, overlay : z, modal : z + 1)
 */
const BorderModal = ({
  isOpen,
  onClose,
  modalDetailStyle,
  title,
  closableIcon = true,
  modalType = "normal",
  footer,
  children,
  zIndex,
}: BorderModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <>
          {modalType !== "full" && (
            <div css={cssOverlayStyle({ zIndex })}></div>
          )}
          <div css={cssModalStyle({ modalType, modalDetailStyle, zIndex })}>
            <div css={cssModalHeaderStyle}>
              {typeof title === "undefined" ? (
                <div />
              ) : typeof title === "string" ? (
                <Typography
                  size="16"
                  weight="bold"
                  mode="block"
                  detailStyle={css`
                    text-align: center;
                    transform: translate(15px, 3px);
                  `}
                >
                  {title}
                </Typography>
              ) : (
                title
              )}
              {closableIcon && (
                <button css={cssCrossIcon} onClick={onClose}>
                  <CrossIcon />
                </button>
              )}
            </div>
            <div css={cssModalContentStyle(modalType, Boolean(footer))}>
              {children}
            </div>
            {footer && <div css={cssFooterStyle}>{footer}</div>}
          </div>
        </>
      )}
    </>
  );
};

BorderModal.Button = ModalButton;

export default BorderModal;
