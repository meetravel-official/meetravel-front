import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { useHeaderState } from "states/useHeader";

import { ReactComponent as Back } from "@/assets/icons/back.svg";

import { Header } from "../Header/Header";

export const BackHeader = () => {
  const { resetTitle } = useHeaderState();
  const navigate = useNavigate();

  const handleOnClickBack = () => {
    navigate(-1);
    resetTitle();
  };

  return (
    <Header
      prefix={
        <Back
          onClick={handleOnClickBack}
          css={css`
            cursor: pointer;
          `}
        />
      }
    />
  );
};
