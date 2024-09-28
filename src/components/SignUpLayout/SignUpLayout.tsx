import { AgreetoTerms } from "routes/SignUp/components/AgreetoTerms";
import { ProfileForm } from "routes/SignUp/components/ProfileForm";
import { TravelProfileForm } from "routes/SignUp/components/TravelProfileForm";
import { useSignUpState } from "states/useSignUp";

import { cssAlignHorizontalStyle, cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import { Button } from "../Button/Button";
import { Layout } from "../Layout/Layout";
import { Step } from "../Step";
import { useStep } from "../Step/useStep";
import { Typography } from "../Typography/Typography";
import {
  cssSignUpFooterStyle,
  cssSignUpHeaderStyle,
} from "./SignUpLayout.styles";

export const SignUpLayout = () => {
  const [step] = useStep();
  const { nextButtonProps, setNextButtonProps } = useSignUpState();

  const stepList = [
    {
      header: (
        <div css={cssAlignVerticalStyle({ gap: 4, alignItems: "flex-start" })}>
          <Typography color={COLORS.GRAY4} size={20} weight="bold" mode="block">
            미트래블을 이용하기 위해선
          </Typography>
          <Typography color={COLORS.GRAY4} size={20} weight="bold" mode="block">
            <Typography color={COLORS.PINK2} size={20} weight="bold">
              이용약관 동의
            </Typography>
            가 필요해요.
          </Typography>
        </div>
      ),
      extra: (
        <div css={cssAlignVerticalStyle}>
          <Typography color={COLORS.GRAY4} size="12">
            *이용약관 미동의 시,
          </Typography>
          <Typography color={COLORS.GRAY4} size="12">
            미트래블 이용이 불가해요.
          </Typography>
        </div>
      ),
      content: <AgreetoTerms />,
    },
    {
      header: (
        <div css={cssAlignVerticalStyle({ gap: 4, alignItems: "flex-start" })}>
          <Typography color={COLORS.GRAY4} size={20} weight="bold">
            시작하기 전, 미트래블에서
          </Typography>
          <Typography color={COLORS.GRAY4} size={20} weight="bold">
            <Typography color={COLORS.PINK2} size={20} weight="bold">
              사용할 프로필
            </Typography>
            을 만들어 봐요.
          </Typography>
        </div>
      ),
      content: <ProfileForm />,
    },
    {
      header: (
        <div css={cssAlignVerticalStyle({ gap: 4, alignItems: "flex-start" })}>
          <Typography color={COLORS.GRAY4} size={20} weight="bold">
            조금 더 자신을 소개하고 싶다면,
          </Typography>
          <Typography color={COLORS.GRAY4} size={20} weight="bold">
            적어도 되지만{" "}
            <Typography color={COLORS.PINK2} size={20} weight="bold">
              꼭 적을 필요는 없어요.
            </Typography>
          </Typography>
        </div>
      ),
      content: <TravelProfileForm />,
    },
  ];

  const handleOnPrevStep = () => {
    step.handleOnClickPrev();
  };

  const handleOnNextStep = () => {
    if (nextButtonProps.onClick) {
      nextButtonProps.onClick();
    }
    if (!step.isLast) {
      step.handleOnClickNext();
      setNextButtonProps({ disabled: true });
    }
  };

  return (
    <Layout>
      <Step step={step} stepList={stepList}>
        <Layout.Header css={cssSignUpHeaderStyle}>
          <div>{stepList[step.current].header}</div>
          <Step.Stepper />
        </Layout.Header>
        <Layout.Content>
          <Step.Content />
        </Layout.Content>
        <Layout.FixedFooter css={cssSignUpFooterStyle}>
          {stepList[step.current].extra}
          <div css={cssAlignHorizontalStyle}>
            {!step.isFirst && (
              <Button bgColor={COLORS.GRAY1} onClick={handleOnPrevStep}>
                <Typography color={COLORS.GRAY3} weight="bold" size={16}>
                  이전
                </Typography>
              </Button>
            )}
            <Button
              bgColor={COLORS.PINK3}
              onClick={handleOnNextStep}
              disabled={nextButtonProps.disabled}
            >
              <Typography color={COLORS.WHITE} weight="bold" size={16}>
                {step.isLast ? "시작하기!" : "다음"}
              </Typography>
            </Button>
          </div>
        </Layout.FixedFooter>
      </Step>
    </Layout>
  );
};
