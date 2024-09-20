import { css } from "@emotion/react";
import { useCallback, useState } from "react";
import { useUserState } from "states/useCheckUser";

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

import { cssAgreetoTermsStyle } from "../styles/SignUpInnerContents.styles";

export const ProfileForm = () => {
  // zustand
  const { userInfo } = useUserState();

  // react state
  const [checked, setChecked] = useState({ private: false, term: false });

  const { form, registerField, invalidFields } = useForm<ISignUpEssentialForm>({
    initialValues: {
      name: "",
      nickname: "",
      birthDayYear: "",
      birthDayMonth: "",
      birthDayDate: "",
      gender: "",
      phoneNumber: "",
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
      "profileImageUrl",
    ],
  });
  const { onChange: onChangeGender } = registerField("gender");

  const handleOnSubmit = useCallback(() => {
    invalidFields(({ errors }) => {
      if (errors) {
        console.log("error", errors);
      } else {
        console.log("success", form);
      }
    });
  }, [form, invalidFields]);
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
          <Input {...registerField("name")} type="text" />
        </FormItem>
        <FormItem label="닉네임" name="nickname">
          <Input {...registerField("nickname")} type="text" />
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
              type="date"
              suffix={<Typography color={COLORS.PINK3}>년</Typography>}
              detailStyle={css`
                width: 100%;
              `}
            />
          </FormItem>
          <FormItem label="" name="birthDayMonth">
            <Input
              {...registerField("birthDayMonth")}
              type="date"
              suffix={<Typography color={COLORS.PINK3}>월</Typography>}
              detailStyle={css`
                width: 100%;
              `}
            />
          </FormItem>
          <FormItem label="" name="birthDayDate">
            <Input
              {...registerField("birthDayDate")}
              type="date"
              suffix={<Typography color={COLORS.PINK3}>일</Typography>}
              detailStyle={css`
                width: 100%;
              `}
            />
          </FormItem>
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
              checkNotEmpty([form.gender]) ? form.gender.value : undefined
            }
            onChange={(e) => {
              onChangeGender(e);
            }}
            buttonDetailStyle={css`
              font-size: 16px;
              font-weight: 400;
              line-height: 20.39px;
              width: 100%;
              height: 48px;
            `}
            gridDetailStyle={css`
              width: 100%;
            `}
          >
            <RadioButtonGroup.RadioButton value={SIGN_UP_GENDER_TYPE.FEMALE}>
              여성
            </RadioButtonGroup.RadioButton>
            <RadioButtonGroup.RadioButton value={SIGN_UP_GENDER_TYPE.MALE}>
              남성
            </RadioButtonGroup.RadioButton>
          </RadioButtonGroup>
        </FormItem>
      </Form>
      <Button onClick={handleOnSubmit}>확인용 버튼</Button>
    </div>
  );
};
