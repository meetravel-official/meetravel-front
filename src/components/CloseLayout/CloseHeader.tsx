import { css } from "@emotion/react";
import { useHeaderState } from "states/useHeader";

import { ReactComponent as Cross } from "@/assets/icons/cross.svg";

import { Header } from "../Header/Header";

export const CloseHeader = () => {
  const { resetTitle } = useHeaderState();

  const handleOnClickClose = () => {
    window.close();
    resetTitle();
  };

  return (
    <Header
      suffix={
        <Cross
          onClick={handleOnClickClose}
          css={css`
            cursor: pointer;
          `}
        />
      }
    />
  );
};
