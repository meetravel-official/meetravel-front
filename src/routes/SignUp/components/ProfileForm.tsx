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
  });

  const { onChange: onChangeGender } = registerField("gender");

  const handleOnNextStep = () => {
    invalidFields(({ errors }) => {
      if (errors) {
        console.log("error in if", errors);
      } else {
        const signUpFormInfo: ISignUpFormValues = {
          name: form.name?.value || "",
          nickname: form.nickname?.value || "",
          birthDayYear: form.birthDayYear?.value || "",
          birthDayMonth: form.birthDayMonth?.value || "",
          birthDayDate: form.birthDayDate?.value || "",
          gender: form.gender?.value || "",
          phoneNumber: form.phoneNumber?.value || "",
          verificationNumber: form.verificationNumber?.value || "",
          profileImageUrl: form.profileImageUrl?.value || "",
        };
        setSignUpInfo({ ...signUpInfo, ...signUpFormInfo });
        console.log("세번째 탭에서 저장되는 내용", signUpFormInfo);
        step.handleOnClickNext();
      }
    });
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
        <FormItem label="닉네임" name="nickname">
          <Input
            {...registerField("nickname")}
            type="text"
            detailStyle={css`
              width: 100%;
            `}
          />
        </FormItem>
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
          />
          <Input
            {...registerField("birthDayDate")}
            type="number"
            suffix={<Typography color={COLORS.PINK3}>일</Typography>}
            detailStyle={css`
              width: unset;
              margin-bottom: 8px;
            `}
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
