import { css } from "@emotion/react";
import React from "react";

import { Button, Step, Typography } from "@/components";
import { cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import { AgreetoTerms } from "./components/AgreetoTerms";
import { ProfileForm } from "./components/ProfileForm";
import { RequiredPermissions } from "./components/RequiredPermissions";
import { SignUpContent } from "./components/SignUpContent";
import { SignUpHeader } from "./components/SignUpHeader";
import { cssSignUpContainerStyle } from "./styles/SignUpContainer.styles";

export const SignUpContainer = () => {
  const [step] = Step.useStep();

  const stepList = [
    {
      title: "이용 약관 동의",
      header: (
        <React.Fragment>
          <Typography color={COLORS.GRAY4} size={20} weight="bold">
            미트래블을 이용하기 위해선
          </Typography>
          <Typography color={COLORS.GRAY4} size={20} weight="bold">
            <Typography color={COLORS.PINK2} size={20} weight="bold">
              이용 약관 동의
            </Typography>
            가 필요해요.
          </Typography>
        </React.Fragment>
      ),
      content: <AgreetoTerms />,
      button: "약관 전체 허용",
    },
    {
      title: "필수 권한 동의",
      header: (
        <React.Fragment>
          <Typography color={COLORS.GRAY4} size={20} weight="bold">
            미트래블을 이용하기 위해선
          </Typography>
          <Typography color={COLORS.GRAY4} size={20} weight="bold">
            <Typography color={COLORS.PINK2} size={20} weight="bold">
              필수 권한 동의
            </Typography>
            가 필요해요.
          </Typography>
        </React.Fragment>
      ),
      content: <RequiredPermissions />,
      button: "권한 전체 허용",
    },
    {
      title: "필수 프로필 작성",
      header: (
        <React.Fragment>
          <Typography color={COLORS.GRAY4} size={20} weight="bold">
            시작하기 전, 미트래블에서
          </Typography>
          <Typography color={COLORS.GRAY4} size={20} weight="bold">
            <Typography color={COLORS.PINK2} size={20} weight="bold">
              사용할 프로필
            </Typography>
            을 만들어 봐요.
          </Typography>
        </React.Fragment>
      ),
      content: <ProfileForm />,
      button: "다음",
    },
    {
      title: "선택 프로필 작성",
      header: (
        <React.Fragment>
          <Typography color={COLORS.GRAY4} size={20} weight="bold">
            조금 더 자신을 소개하고 싶다면,
          </Typography>
          <Typography color={COLORS.GRAY4} size={20} weight="bold">
            적어도 되지만
            <Typography color={COLORS.PINK2} size={20} weight="bold">
              {" "}
              꼭 적을 필요는 없어요.
            </Typography>
          </Typography>
        </React.Fragment>
      ),
      content: <div>선택 프로필 작성</div>,
      button: "시작하기",
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
        <SignUpHeader
          step={step}
          headerContent={stepList[step.current].header}
        />
        <SignUpContent step={step} stepList={stepList} />
      </div>
      <Button bgColor={COLORS.PINK3} onClick={step.handleOnClickNext}>
        <Typography color={COLORS.WHITE} weight="bold" size={16}>
          {stepList[step.current].button}
        </Typography>
      </Button>
    </div>
  );
};
