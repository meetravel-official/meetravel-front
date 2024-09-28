import { css } from "@emotion/react";
import { useEffect, useMemo, useState } from "react";
import {
  cssFormItemStyle,
  cssRadioButtonStyle,
} from "routes/Profile/components/ProfileEditModal.styles";
import { useSignUpState } from "states/useSignUp";

import { useGetCheckNickname } from "@/api/hooks/auth";
import { IProfile } from "@/api/interfaces/kakaoSignUpInterface";
import { Button, Typography } from "@/components";
import Form from "@/components/Form/Form";
import { FormItem } from "@/components/Form/FormItem";
import { FormValues } from "@/components/Form/useForm";
import Input from "@/components/Input/Input";
import { checkNotEmpty } from "@/components/Matching/Matching";
import RadioButtonGroup from "@/components/RadioButton/RadioButtonGroup";
import { SIGN_UP_GENDER_TYPE } from "@/constants/signUp";
import { cssAlignHorizontalStyle, cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

interface ProfileFormProps {
  form: FormValues<IProfile>;
  registerField: (key: keyof IProfile) => {
    value?: string;
    onChange: (e: any) => void;
    error: string | undefined;
  };
}

export const ProfileForm = ({ form, registerField }: ProfileFormProps) => {
  const [checkNickname, setCheckNickname] = useState<{
    isClick: boolean;
    isDuplicated: boolean;
    value: string;
  }>({ isClick: false, isDuplicated: false, value: "" });

  // zustand
  const { setDisabled } = useSignUpState();

  const { mutate } = useGetCheckNickname();

  const { onChange: onChangeGender } = registerField("gender");

  const handleCheckNickname = () => {
    if (!!form.nickname?.value && !form.nickname?.error) {
      mutate(form.nickname.value, {
        onSuccess: (res) => {
          setCheckNickname({
            isClick: true,
            isDuplicated: res.data,
            value: form.nickname?.value || "",
          });
        },
        onError: () => {
          setCheckNickname({ isClick: false, isDuplicated: false, value: "" });
        },
      });
    }
  };

  const handleBlurOnScroll = (e: React.WheelEvent<HTMLInputElement>) => {
    return (e.target as HTMLElement).blur();
  };

  const checkNicknameText = useMemo(() => {
    if (form.nickname?.error) {
      return (
        <Typography color={COLORS.SITUATION1} size="14">
          {form.nickname.error}
        </Typography>
      );
    } else if (checkNickname.isClick) {
      if (checkNickname.isDuplicated) {
        return (
          <Typography color={COLORS.SITUATION1} size="14">
            중복된 닉네임입니다.
          </Typography>
        );
      } else {
        return (
          <Typography color={COLORS.GRAY2} size="14">
            사용 가능한 닉네임입니다.
          </Typography>
        );
      }
    }
    if (form.nickname?.value !== checkNickname.value) {
      if (!checkNickname.isClick) {
        return (
          <Typography color={COLORS.SITUATION1} size="14">
            중복 여부를 확인해주세요.
          </Typography>
        );
      }
    }
  }, [checkNickname, form.nickname]);

  useEffect(() => {
    setDisabled(false);
  }, [setDisabled]);

  return (
    <Form formValue={form}>
      <FormItem label="이름" name="name" formItemStyle={cssFormItemStyle}>
        <Input
          {...registerField("name")}
          type="text"
          detailStyle={css`
            width: 100%;
          `}
        />
      </FormItem>
      <FormItem name="nickname" label="닉네임" formItemStyle={cssFormItemStyle}>
        <div
          css={cssAlignVerticalStyle({
            gap: 8,
            alignItems: "flex-start",
          })}
        >
          <div css={cssAlignHorizontalStyle({ gap: 8, width: "100%" })}>
            <Input
              {...registerField("nickname")}
              type="text"
              detailStyle={css`
                width: 100%;
              `}
              placeholder="최소 2자 이상/6자 이하 입력"
              maxLength={6}
              onChange={(e) => {
                registerField("nickname").onChange(e);
                setCheckNickname({
                  isClick: false,
                  isDuplicated: false,
                  value: "",
                });
              }}
            />
            <Button
              bgColor={COLORS.PINK2}
              detailStyle={css`
                width: 91px;
                box-sizing: border-box;
                padding: 14px 16px;
                white-space: nowrap;
              `}
              onClick={handleCheckNickname}
              disabled={
                form.nickname?.value === checkNickname.value ||
                !!form.nickname?.error
              }
            >
              <Typography color={COLORS.WHITE} size={16} weight={700}>
                중복 확인
              </Typography>
            </Button>
          </div>
          {checkNicknameText}
        </div>
      </FormItem>
      <FormItem label="성별" name="gender" formItemStyle={cssFormItemStyle}>
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
            detailStyle={cssRadioButtonStyle(
              form.gender?.value === SIGN_UP_GENDER_TYPE.FEMALE
            )}
          >
            여성
          </RadioButtonGroup.RadioButton>
          <RadioButtonGroup.RadioButton
            value={SIGN_UP_GENDER_TYPE.MALE}
            detailStyle={cssRadioButtonStyle(
              form.gender?.value === SIGN_UP_GENDER_TYPE.MALE
            )}
          >
            남성
          </RadioButtonGroup.RadioButton>
        </RadioButtonGroup>
      </FormItem>
      <div css={cssFormItemStyle}>
        <div
          css={cssAlignVerticalStyle({
            gap: 10,
            alignItems: "flex-start",
            width: "100%",
          })}
        >
          <Typography size="16" color={COLORS.GRAY3} weight={700}>
            생년월일
          </Typography>
          <div css={cssAlignHorizontalStyle({ gap: 8, width: "100%" })}>
            <Input
              {...registerField("birthDayYear")}
              type="number"
              suffix={<Typography color={COLORS.PINK3}>년</Typography>}
              onWheel={(event) => handleBlurOnScroll(event)}
            />
            <Input
              {...registerField("birthDayMonth")}
              type="number"
              suffix={<Typography color={COLORS.PINK3}>월</Typography>}
              onWheel={(event) => handleBlurOnScroll(event)}
            />
            <Input
              {...registerField("birthDayDate")}
              type="number"
              suffix={<Typography color={COLORS.PINK3}>일</Typography>}
              onWheel={(event) => handleBlurOnScroll(event)}
            />
          </div>
        </div>
      </div>
      <FormItem
        label="전화번호"
        name="phoneNumber"
        formItemStyle={cssFormItemStyle}
      >
        <Input
          {...registerField("phoneNumber")}
          type="number"
          detailStyle={css`
            width: 100%;
          `}
        />
      </FormItem>
    </Form>
  );
};
