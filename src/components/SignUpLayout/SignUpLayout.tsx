import dayjs from "dayjs";
import { useEffect } from "react";
import { AgreetoTerms } from "routes/SignUp/components/AgreetoTerms";
import { ProfileForm } from "routes/SignUp/components/ProfileForm";
import { TravelProfileForm } from "routes/SignUp/components/TravelProfileForm";
import { useSignUpState } from "states/useSignUp";
import { nicknameRegex, phoneNumberRegex } from "utils/regex-utils";

import { usePostSignUp } from "@/api/hooks/auth";
import {
  IPostKaKaoSignUpRequest,
  IProfile,
  ISignUpTravelProfileForm,
} from "@/api/interfaces/kakaoSignUpInterface";
import { GetMyPageResponseMbtiEnumArray } from "@/api/interfaces/user";
import { cssAlignHorizontalStyle, cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import { Button } from "../Button/Button";
import useForm from "../Form/useForm";
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

  const { profileInfo, setProfileInfo, isDisabled } = useSignUpState();

  const mutationSignUp = usePostSignUp();

  const profileFormProps = useForm<IProfile>({
    initialValues: profileInfo,
    required: [
      "name",
      "nickname",
      "birthDayYear",
      "birthDayMonth",
      "birthDayDate",
      "gender",
      "phoneNumber",
      // "profileImageUrl",
    ],
    validate: {
      name: (value) => {
        if (
          value &&
          (value.length < 2 || value.length > 6 || !nicknameRegex.test(value))
        ) {
          return "이름을 한글, 영어로 구성된 2자 이상 6자 이하로 입력해주세요.(띄어쓰기 불가)";
        }
        return undefined;
      },
      nickname: (value) => {
        if (
          value &&
          (value.length < 2 || value.length > 6 || !nicknameRegex.test(value))
        ) {
          return "닉네임을 한글, 영어로 구성된 2자 이상 6자 이하로 입력해주세요.(띄어쓰기 불가)";
        }
        return undefined;
      },

      birthDayYear: (value) => {
        const year = Number(value);
        if (year <= 1900) {
          return "1900년 이후의 년도를 입력해주세요.";
        }
        if (
          profileFormProps.form.birthDayYear?.value &&
          profileFormProps.form.birthDayMonth?.value &&
          profileFormProps.form.birthDayDate?.value
        ) {
          const birthStr = `${profileFormProps.form.birthDayYear?.value.padStart(
            4,
            "0"
          )}-${profileFormProps.form.birthDayMonth?.value.padStart(
            2,
            "0"
          )}-${profileFormProps.form.birthDayDate.value.padStart(2, "0")}`;
          const birthDate = dayjs(birthStr, "YYYY-MM-DD");
          const age16 = birthDate.add(16, "year");
          if (dayjs().isBefore(age16)) {
            return "만 16세 이상만 가입 가능합니다.";
          }
        }
        return undefined;
      },
      birthDayMonth: (value) => {
        const month = Number(value);
        if (month <= 0 || month > 12) {
          return "1월부터 12월 사이의 숫자를 입력해주세요.";
        }
        return undefined;
      },
      birthDayDate: (value) => {
        const date = Number(value);
        if (date <= 0 || date > 31) {
          return "1일부터 31일 사이의 숫자를 입력해주세요.";
        }
        return undefined;
      },
      phoneNumber: (value) => {
        if (value && !phoneNumberRegex.test(value)) {
          return "휴대폰 번호를 올바르게 입력해주세요.(- 제외)";
        }
        return undefined;
      },
    },
  });

  const travelProfileFormProps = useForm<ISignUpTravelProfileForm>({
    initialValues: {
      travelFrequency: "",
      scheduleType: "",
      planningType: "",
      mbti: "",
      hobby: "",
      intro: "",
    },
    validate: {
      mbti: (value) => {
        if (value && !GetMyPageResponseMbtiEnumArray.includes(value)) {
          return "MBTI는 4글자 대문자로 입력해주세요.";
        }
        return undefined;
      },
    },
  });

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
      handleOnClickSubmit: () => {
        step.handleOnClickNext();
      },
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
      content: <ProfileForm {...profileFormProps} />,
      handleOnClickSubmit: () => {
        profileFormProps.invalidFields(({ errors, value }) => {
          if (!errors) {
            setProfileInfo({
              ...profileInfo,
              name: value.name?.value,
              nickname: value.nickname?.value,
              gender: value.gender?.value,
              phoneNumber: value.phoneNumber?.value,
              birthDayYear: value.birthDayYear?.value,
              birthDayMonth: value.birthDayMonth?.value?.padStart(2, "0"),
              birthDayDate: value.birthDayDate?.value?.padStart(2, "0"),
            });
            step.handleOnClickNext();
          }
        });
      },
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
      content: <TravelProfileForm {...travelProfileFormProps} />,
      handleOnClickSubmit: () => {
        travelProfileFormProps.invalidFields(async ({ errors, value }) => {
          if (!errors) {
            const mutationData = {
              ...profileInfo,
              birthDate: `${profileInfo?.birthDayYear || ""}-${
                profileInfo?.birthDayMonth || ""
              }-${profileInfo?.birthDayDate || ""}`,
              travelFrequency: value.travelFrequency?.value || undefined,
              scheduleType: value.scheduleType?.value || undefined,
              planningType: value.planningType?.value || undefined,
              hobby: value.hobby?.value || undefined,
              mbti: value.mbti?.value || undefined,
              intro: value.intro?.value || undefined,
            } as IPostKaKaoSignUpRequest;
            await mutationSignUp.mutateAsync({ ...mutationData });
          }
        });
      },
    },
  ];

  const handleOnPrevStep = () => {
    step.handleOnClickPrev();
  };

  useEffect(() => {
    console.log(profileFormProps.form);
  }, [profileFormProps]);

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
              onClick={stepList[step.current].handleOnClickSubmit}
              disabled={isDisabled}
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
