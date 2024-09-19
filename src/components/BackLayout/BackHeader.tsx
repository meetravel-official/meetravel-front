import { css, SerializedStyles } from "@emotion/react";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useHeaderState } from "states/useHeader";

import { ReactComponent as Back } from "@/assets/icons/back.svg";

import { Header } from "../Header/Header";

interface BackHeaderProps {
  titleContent?: ReactNode;
  prefixStyle?: SerializedStyles;
}

export const BackHeader = ({ titleContent, prefixStyle }: BackHeaderProps) => {
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
      detailStyle={css`
        ${prefixStyle}
      `}
      titleContent={titleContent}
    />
  );
};
