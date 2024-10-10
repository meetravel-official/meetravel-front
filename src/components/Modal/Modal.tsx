import { css, SerializedStyles } from "@emotion/react";
import React, { Fragment, useEffect } from "react";

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
  zIndex?: number;
  isAutoClose?: boolean;
}
/**
 * 모달 컴포넌트
 * @param modalType simple: center align, normal: no style, full: 100% width
 * @param modalDetailStyle modal style
 * @param title string 입력시 center align, ReactNode 입력시 해당 style 적용
 * @param closableIcon true: close button, false: no close button
 * @param footer flex 기본
 * @param zIndex 모달, 오버레이 z-index(default: 99)
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
  zIndex,
  isAutoClose = false,
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
          {modalType !== "full" && (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
            <div
              css={cssOverlayStyle({ zIndex })}
              onClick={() => {
                if (isAutoClose) onClose();
              }}
            />
          )}
          <div css={cssModalStyle({ modalType, modalDetailStyle, zIndex })}>
            <div css={cssModalContentStyle(modalType, Boolean(footer))}>
              <div
                css={css`
                  display: grid;
                  grid-template-columns: 1fr auto;
                  align-items: center;
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
            {footer && <div css={cssFooterStyle({ modalType })}>{footer}</div>}
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
export const ModalButton = ({ ...props }: TButtonProps) => {
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
