import { SerializedStyles } from "@emotion/react";
import { Fragment, useState } from "react";

import { ReactComponent as SelectArrow } from "@/assets/icons/select-arrow.svg";
import { COLORS } from "@/styles/color";

import { Button } from "../Button/Button";
import Modal from "../Modal/Modal";
import { Typography } from "../Typography/Typography";
import { cssSelectBtnStyle, cssSelectListStyle } from "./SelectByModal.styles";

interface SelectByModalProps {
  placeholder?: string;
  value?: string;
  onSelect?: (value: { label: string } & any) => void;
  options?: ({ label: string } & any)[];
  optionListStyle?: SerializedStyles;
  width?: number;
}
export const SelectByModal = ({
  placeholder,
  value,
  onSelect,
  options,
  optionListStyle,
  width,
}: SelectByModalProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <Fragment>
      <button
        css={cssSelectBtnStyle(width)}
        onClick={() => {
          setIsOpenModal(true);
        }}
      >
        <Typography color={COLORS.GRAY3} weight="bold" size="16">
          {value || placeholder}
        </Typography>
        <SelectArrow
          width={12}
          height={12}
          stroke={COLORS.GRAY3}
          strokeWidth={2}
        />
      </button>
      <Modal
        modalType="simple"
        title={placeholder}
        isOpen={isOpenModal}
        onClose={() => {
          setIsOpenModal(false);
        }}
      >
        <div css={cssSelectListStyle({ optionListStyle })}>
          {options?.map((item) => (
            <Button
              key={item.label}
              onClick={() => {
                if (onSelect) onSelect(item);
                setIsOpenModal(false);
              }}
            >
              <Typography color={COLORS.GRAY5} weight="bold">
                {item.label}
              </Typography>
            </Button>
          ))}
        </div>
      </Modal>
    </Fragment>
  );
};
