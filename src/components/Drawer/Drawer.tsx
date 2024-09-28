import { css, SerializedStyles } from "@emotion/react";

import { WIDTH } from "@/styles/breakpoint";

import Modal, { ModalType } from "../Modal/Modal";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  modalDetailStyle?: SerializedStyles;
  title?: string | React.ReactNode;
  closableIcon?: boolean;
  modalType?: ModalType;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  zIndex?: number;
}

const Drawer = ({ isOpen, onClose, children }: DrawerProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      modalType={"simple"}
      closableIcon={false}
      isAutoClose={true}
      modalDetailStyle={css`
        all: unset;
        box-sizing: border-box;
        position: fixed;
        bottom: 0;
        z-index: 100;
        width: 100%;

        height: 150px; // TODO: feed 추가되면 늘리기 224px
        left: 50%;
        max-width: ${WIDTH.SM};
        border-radius: 8px 8px 0 0;
        padding: 20px 8px 0 8px;

        background-color: white;
        animation: fadeInUp 0.2s linear forwards;
        @keyframes fadeInUp {
          from {
            transform: translate(-50%, -50%) translateY(100%);
            opacity: 0;
          }
          to {
            transform: translate(-50%, 0%) translateY(0);
            opacity: 1;
          }
        }
      `}
    >
      {children}
    </Modal>
  );
};
export default Drawer;
