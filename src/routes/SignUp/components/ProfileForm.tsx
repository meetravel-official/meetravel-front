import { css } from "@emotion/react";
import { ISignUpFormValues, useSignUpFormState } from "states/useCheckUser";

import { ISignUpEssentialForm } from "@/api/interfaces/kakaoSignUpInterface";
import { Button, Typography } from "@/components";
import Form from "@/components/Form/Form";
import { FormItem } from "@/components/Form/FormItem";
import useForm from "@/components/Form/useForm";
import Input from "@/components/Input/Input";
import { checkNotEmpty } from "@/components/Matching/Matching";
import RadioButtonGroup from "@/components/RadioButton/RadioButtonGroup";
import { SIGN_UP_GENDER_TYPE } from "@/constants/signUp";
import { cssAlignHorizontalStyle, cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import { ISignUpProps } from "../SignUpContainer";
import { cssAgreetoTermsStyle } from "../styles/SignUpInnerContents.styles";

export const ProfileForm = ({ step }: ISignUpProps) => {
  // zustand
  const { signUpInfo, setSignUpInfo } = useSignUpFormState();

  const { form, registerField, invalidFields } = useForm<ISignUpEssentialForm>({
    initialValues: {
      name: "",
      nickname: "",
      birthDayYear: "",
      birthDayMonth: "",
      birthDayDate: "",
      gender: "",
      phoneNumber: "",
      verificationNumber: "",
      profileImageUrl: "",
    },
    required: [
      "name",
      "nickname",
      "birthDayYear",
      "birthDayMonth",
      "birthDayDate",
      "gender",
      "phoneNumber",
      // "verificationNumber",
      // "profileImageUrl",
    ],
    validate: {
      birthDayYear: (value) => {
        const year = Number(value);
        if (year <= 1900) {
          return "1900년 이후의 년도를 입력해주세요.";
        } else if (year > new Date().getFullYear()) {
          return `${new Date().getFullYear()} 이후의 년도는 입력할 수 없습니다.`;
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
        if (value && value.length < 9) {
          return "휴대폰 번호를 입력해주세요.";
        }
        return undefined;
      },
    },
  });

  const { onChange: onChangeGender } = registerField("gender");

  const handleOnNextStep = () => {
    invalidFields(({ errors }) => {
      if (errors) {
        console.log(errors);
      } else {
        const padSingleDigit = (
          value: string | undefined
        ): string | undefined => {
          if (value && value.length < 2 && Number(value) < 10) {
            return `0${value}`;
          }
          return value;
        };

        const validateBirthDayMonth = padSingleDigit(
          form?.birthDayMonth?.value
        );
        const validateBirthDayDate = padSingleDigit(form?.birthDayDate?.value);

        const signUpFormInfo: ISignUpFormValues = {
          name: form.name?.value || "",
          nickname: form.nickname?.value || "",
          birthDayYear: form.birthDayYear?.value || "",
          birthDayMonth: validateBirthDayMonth || "",
          birthDayDate: validateBirthDayDate || "",
          gender: form.gender?.value || "",
          phoneNumber: form.phoneNumber?.value || "",
          verificationNumber: form.verificationNumber?.value || "",
          profileImageUrl: form.profileImageUrl?.value || "",
        };
        setSignUpInfo({ ...signUpInfo, ...signUpFormInfo });
        step.handleOnClickNext();
      }
    });
  };

  const handleBlurOnScroll = (e: React.WheelEvent<HTMLInputElement>) => {
    return (e.target as HTMLElement).blur();
  };

  return (
    <div
      css={css`
        ${cssAlignVerticalStyle({
          justifyContent: "space-between",
          alignItems: "space-between",
        })}
        ${cssAgreetoTermsStyle}
      `}
    >
      <Form formValue={form}>
        <FormItem label="이름" name="name">
          <Input
            {...registerField("name")}
            type="text"
            detailStyle={css`
              width: 100%;
            `}
          />
        </FormItem>
        <div
          css={cssAlignHorizontalStyle({
            alignItems: "flex-end",
            width: "100%",
          })}
        >
          <FormItem
            label="닉네임"
            name="nickname"
            formItemStyle={css`
              width: 100%;
            `}
          >
            <Input
              {...registerField("nickname")}
              type="text"
              detailStyle={css`
                width: 100%;
              `}
            />
          </FormItem>
          <Button
            detailStyle={css`
              margin-bottom: 8px;
              white-space: nowrap;
            `}
            width={"max-content"}
            bgColor={COLORS.PINK2}
            color={COLORS.WHITE}
            // TODO: onClick
          >
            중복확인
          </Button>
        </div>
        <FormItem
          label="성별"
          labelStyle={css`
            font-size: 16px;
            font-weight: 400;
            line-height: 20.39px;
          `}
          name="gender"
        >
          <RadioButtonGroup
            {...registerField("gender")}
            defaultValue={
              checkNotEmpty([form.gender]) ? form.gender?.value : undefined
            }
            onChange={(e) => {
              onChangeGender(e);
            }}
            gridDetailStyle={css`
              width: 100%;
            `}
          >
            <RadioButtonGroup.RadioButton
              value={SIGN_UP_GENDER_TYPE.FEMALE}
              detailStyle={css`
                font-size: 16px;
                font-weight: 400;
                line-height: 20.39px;
                width: 100%;
                height: 48px;
                background-color: ${form.gender?.value ===
                SIGN_UP_GENDER_TYPE.MALE
                  ? COLORS.GRAY2
                  : ""};
              `}
            >
              여성
            </RadioButtonGroup.RadioButton>
            <RadioButtonGroup.RadioButton
              value={SIGN_UP_GENDER_TYPE.MALE}
              detailStyle={css`
                font-size: 16px;
                font-weight: 400;
                line-height: 20.39px;
                width: 100%;
                height: 48px;
                background-color: ${form.gender?.value ===
                SIGN_UP_GENDER_TYPE.FEMALE
                  ? COLORS.GRAY2
                  : ""};
              `}
            >
              남성
            </RadioButtonGroup.RadioButton>
          </RadioButtonGroup>
        </FormItem>
        <div
          css={cssAlignHorizontalStyle({
            justifyContent: "center",
            alignItems: "flex-end",
          })}
        >
          <FormItem label="생년월일" name="birthDayYear">
            <Input
              {...registerField("birthDayYear")}
              type="number"
              suffix={<Typography color={COLORS.PINK3}>년</Typography>}
              detailStyle={css`
                width: unset;
              `}
              onWheel={(event) => handleBlurOnScroll(event)}
            />
          </FormItem>
          <Input
            {...registerField("birthDayMonth")}
            type="number"
            suffix={<Typography color={COLORS.PINK3}>월</Typography>}
            detailStyle={css`
              width: unset;
              margin-bottom: 8px;
            `}
            onWheel={(event) => handleBlurOnScroll(event)}
          />
          <Input
            {...registerField("birthDayDate")}
            type="number"
            suffix={<Typography color={COLORS.PINK3}>일</Typography>}
            detailStyle={css`
              width: unset;
              margin-bottom: 8px;
            `}
            onWheel={(event) => handleBlurOnScroll(event)}
          />
        </div>
        <div
          css={cssAlignHorizontalStyle({
            alignItems: "flex-end",
            width: "100%",
          })}
        >
          <FormItem
            label="전화번호"
            name="phoneNumber"
            formItemStyle={css`
              width: 100%;
            `}
          >
            <Input
              {...registerField("phoneNumber")}
              type="number"
              detailStyle={css`
                width: 100%;
              `}
            />
          </FormItem>
          <Button
            detailStyle={css`
              margin-bottom: 8px;
              white-space: nowrap;
            `}
            width={"max-content"}
            bgColor={COLORS.PINK2}
            color={COLORS.WHITE}
            // TODO: onClick
          >
            인증번호 발송
          </Button>
        </div>
        <div
          css={cssAlignHorizontalStyle({
            alignItems: "flex-end",
            width: "100%",
          })}
        >
          <FormItem
            label="인증번호"
            name="verificationNumber"
            formItemStyle={css`
              width: 100%;
            `}
          >
            <Input
              {...registerField("verificationNumber")}
              type="text"
              detailStyle={css`
                width: 100%;
              `}
            />
          </FormItem>
          <Button
            detailStyle={css`
              margin-bottom: 8px;
              white-space: nowrap;
            `}
            width={"max-content"}
            bgColor={COLORS.PINK2}
            color={COLORS.WHITE}
            // TODO: onClick
          >
            인증 완료
          </Button>
        </div>
      </Form>
      <div className="button-to-next">
        <Button bgColor={COLORS.PINK3} onClick={handleOnNextStep}>
          <Typography color={COLORS.WHITE} weight="bold" size={16}>
            다음
          </Typography>
        </Button>
      </div>
    </div>
  );
};
