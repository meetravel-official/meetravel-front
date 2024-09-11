import { css, SerializedStyles } from "@emotion/react";
import React, { Fragment, useEffect, useState } from "react";

import { ReactComponent as CrossIcon } from "@/assets/icons/cross.svg";

import { Button, TButtonProps } from "../Button/Button";
import { Typography } from "../Typography/Typography";
import {
  cssCrossIcon,
  cssFooterStyle,
  cssModalContentStyle,
  cssModalStyle,
  cssOverlayStyle,
} from "./Modal.style";

export type ModalType = "simple" | "normal" | "full";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalDetailStyle?: SerializedStyles;
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
 */
const Modal = ({
  isOpen,
  onClose,
  modalDetailStyle,
  title,
  closableIcon = true,
  modalType = "normal",
  footer,
  children,
}: ModalProps) => {
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
          {modalType !== "full" && <div css={cssOverlayStyle}></div>}
          <div css={cssModalStyle(modalType, modalDetailStyle)}>
            <div css={cssModalContentStyle(modalType)}>
              <div
                css={css`
                  display: grid;
                  grid-template-columns: 1fr auto;
                  margin: 2px;
                `}
              >
                <div>
                  {typeof title === "string" ? (
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
                </div>
                {closableIcon && (
                  <button css={cssCrossIcon} onClick={onClose}>
                    <CrossIcon />
                  </button>
                )}
              </div>

              {children}
            </div>
            {footer && <div css={cssFooterStyle}>{footer}</div>}
          </div>
        </>
      )}
    </>
  );
};
/**
 * 모달내 버튼 스타일 유지를 위한 컴포넌트
 * @param props Button props 전달
 */
const ModalButton = ({ ...props }: TButtonProps) => {
  return (
    <Button
      {...props}
      height="regular"
      detailStyle={css`
        border-radius: 4px;
        font-size: 16px;
      `}
    />
  );
};

Modal.Button = ModalButton;

export default Modal;
