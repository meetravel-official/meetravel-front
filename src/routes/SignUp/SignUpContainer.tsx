import { css } from "@emotion/react";

import { Button, Step, Typography } from "@/components";
import { cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import { AgreetoTerms } from "./components/AgreetoTerms";
import { SignUpContent } from "./components/SignUpContent";
import { SignUpHeader } from "./components/SignUpHeader";
import { cssSignUpContainerStyle } from "./styles/SignUpContainer.styles";

export const SignUpContainer = () => {
  const [step] = Step.useStep();

  const stepList = [
    {
      title: "이용 약관 동의",
      content: <AgreetoTerms step={step} />,
    },
    {
      title: "필수 권한 동의",
      content: <div>필수 권한 동의필수 권한 동의</div>,
    },
    {
      title: "필수 프로필 작성",
      content: <div>필수 프로필 작성필수 프로필 작성</div>,
    },
    {
      title: "선택 프로필 작성",
      content: <div>선택 프로필 작성선택 프로필 작성</div>,
    },
  ];
  return (
    <div
      css={css`
        ${cssSignUpContainerStyle}
        ${cssAlignVerticalStyle({
          gap: 32,
          alignItems: "space-between",
          justifyContent: "space-between",
        })}
      `}
    >
      <div>
        <SignUpHeader />
        <SignUpContent step={step} stepList={stepList} />
      </div>
      <Button
        bgColor={COLORS.PINK3}
        onClick={step.handleOnClickNext}
        detailStyle={css``}
      >
        <Typography color={COLORS.WHITE} weight="bold" size={16}>
          약관 전체 허용
        </Typography>
      </Button>
    </div>
  );
};
