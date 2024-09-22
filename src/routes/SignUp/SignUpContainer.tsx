import { css } from "@emotion/react";
import React from "react";

import { Step, Typography } from "@/components";
import { StepInstance } from "@/components/Step/StepInterface";
import { cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import { AgreetoTerms } from "./components/AgreetoTerms";
import { ProfileForm } from "./components/ProfileForm";
import { RequiredPermissions } from "./components/RequiredPermissions";
import { SignUpContent } from "./components/SignUpContent";
import { SignUpHeader } from "./components/SignUpHeader";
import { TravelProfileForm } from "./components/TravelProfileForm";
import { cssSignUpContainerStyle } from "./styles/SignUpContainer.styles";

export interface ISignUpProps {
  step: StepInstance;
}

export const SignUpContainer = () => {
  const [step] = Step.useStep();

  // TODO: api 회원가입 post

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
      content: <AgreetoTerms step={step} />,
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
      content: <RequiredPermissions step={step} />,
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
      content: <ProfileForm step={step} />,
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
      content: <TravelProfileForm />,
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
    </div>
  );
};
