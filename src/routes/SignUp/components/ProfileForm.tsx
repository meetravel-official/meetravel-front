import { css } from "@emotion/react";
import * as Popover from "@radix-ui/react-popover";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { useSignUpState } from "states/useSignUp";
import { numberRegex } from "utils/regex-utils";

import { useGetCheckNickname } from "@/api/hooks/auth";
import { IProfile } from "@/api/interfaces/kakaoSignUpInterface";
import { ReactComponent as CameraIcon } from "@/assets/icons/camera.svg";
import { Button, Typography, UserAvatar } from "@/components";
import Form from "@/components/Form/Form";
import { FormItem } from "@/components/Form/FormItem";
import { FormValues } from "@/components/Form/useForm";
import Input from "@/components/Input/Input";
import RadioButtonGroup from "@/components/RadioButton/RadioButtonGroup";
import { SIGN_UP_GENDER_TYPE } from "@/constants/signUp";
import { cssAlignHorizontalStyle, cssAlignVerticalStyle } from "@/styles/align";
import { cssDefaultBtnStyle } from "@/styles/button";
import { COLORS } from "@/styles/color";

import {
  cssDateInputBoxStyle,
  cssDateInputInnerStyle,
  cssDateInputStyle,
  cssEditProfileImgBoxStyle,
  cssEditProfileImgButtonStyle,
  cssFormItemStyle,
  cssPopOverContentStyle,
  cssRadioButtonStyle,
} from "../styles/SignUpInnerContents.styles";

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
  const [isOpenPopover, setIsOpenPopover] = useState(false);

  // zustand
  const { setDisabled } = useSignUpState();

  const { mutate } = useGetCheckNickname();

  const { onChange: onChangeYear } = registerField("birthDayYear");
  const { onChange: onChangeMonth } = registerField("birthDayMonth");
  const { onChange: onChangeDate } = registerField("birthDayDate");
  const { onChange: onChangePhoneNumber } = registerField("phoneNumber");

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

  const handleOnChangeYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value || "0");

    if (
      numberRegex.test(e.target.value) &&
      e.target.value.length <= 4 &&
      value >= 0 &&
      value <= dayjs().year()
    ) {
      onChangeYear(e.target.value);
    }
  };

  const handleOnChangeMonth = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value || "0");

    if (
      numberRegex.test(e.target.value) &&
      e.target.value.length <= 2 &&
      value >= 0 &&
      value < 13
    ) {
      onChangeMonth(e.target.value);
    }
  };
  const handleOnChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value || "0");

    if (
      numberRegex.test(e.target.value) &&
      e.target.value.length <= 2 &&
      value >= 0 &&
      value < 32
    ) {
      onChangeDate(e.target.value);
    }
  };

  const handleOnChangPhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (numberRegex.test(e.target.value) && e.target.value.length <= 11) {
      onChangePhoneNumber(e.target.value);
    }
  };

  const handleOnOpenPopOver = () => {
    setIsOpenPopover(true);
  };

  const handleOnClosePopOver = () => {
    setIsOpenPopover(false);
  };

  useEffect(() => {
    if (
      checkNickname.isClick &&
      !checkNickname.isDuplicated &&
      checkNickname.value === form.nickname?.value
    )
      setDisabled(false);
    else setDisabled(true);
  }, [checkNickname, form.nickname?.value, setDisabled]);

  return (
    <Form
      formValue={form}
      formStyle={css`
        padding-bottom: 80px;
      `}
    >
      <div css={cssEditProfileImgBoxStyle}>
        <UserAvatar profileUrl={form.profileImageUrl?.value} size={80} />
        <Popover.Root open={isOpenPopover}>
          <Popover.Trigger asChild>
            <button
              css={cssEditProfileImgButtonStyle}
              onClick={handleOnOpenPopOver}
            >
              <CameraIcon />
            </button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              css={cssPopOverContentStyle}
              onInteractOutside={handleOnClosePopOver}
            >
              <button css={cssDefaultBtnStyle}>
                <Typography color={COLORS.GRAY4} weight={700} size="16">
                  이미지 삭제
                </Typography>
              </button>
              <button css={cssDefaultBtnStyle}>
                <Typography color={COLORS.GRAY4} weight={700} size="16">
                  업로드
                </Typography>
              </button>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
      <FormItem
        label="이름"
        name="name"
        formItemStyle={cssFormItemStyle}
        errorStyle={{ display: "block" }}
      >
        <Input
          placeholder="최소 2자 이상/6자 이하 입력"
          maxLength={6}
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
                outline: ${form.nickname?.error
                  ? `1.5px solid ${COLORS.SITUATION1}`
                  : `1.5px solid ${COLORS.PINK1}`};
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
            <div css={cssDateInputBoxStyle(form.birthDayYear?.error)}>
              <div css={cssDateInputInnerStyle}>
                <input
                  css={cssDateInputStyle(40)}
                  {...registerField("birthDayYear")}
                  onChange={handleOnChangeYear}
                  onBlur={() => {
                    if (form.birthDayYear?.value)
                      onChangeYear(form.birthDayYear.value.padStart(4, "0"));
                  }}
                />
                <Typography color={COLORS.PINK3}>년</Typography>
              </div>
            </div>
            <div css={cssDateInputBoxStyle(form.birthDayMonth?.error)}>
              <div css={cssDateInputInnerStyle}>
                <input
                  css={cssDateInputStyle(20)}
                  {...registerField("birthDayMonth")}
                  onChange={handleOnChangeMonth}
                  onBlur={() => {
                    if (form.birthDayMonth?.value)
                      onChangeMonth(form.birthDayMonth.value.padStart(2, "0"));
                  }}
                />
                <Typography color={COLORS.PINK3}>월</Typography>
              </div>
            </div>
            <div css={cssDateInputBoxStyle(form.birthDayDate?.error)}>
              <div css={cssDateInputInnerStyle}>
                <input
                  css={cssDateInputStyle(20)}
                  {...registerField("birthDayDate")}
                  onChange={handleOnChangeDate}
                  onBlur={() => {
                    if (form.birthDayDate?.value)
                      onChangeDate(form.birthDayDate.value.padStart(2, "0"));
                  }}
                />
                <Typography color={COLORS.PINK3}>일</Typography>
              </div>
            </div>
          </div>
          {(form.birthDayYear?.error ||
            form.birthDayMonth?.error ||
            form.birthDayDate?.error) && (
            <Typography size="14" color={COLORS.SITUATION1} weight={400}>
              {form.birthDayYear?.error ||
                form.birthDayMonth?.error ||
                form.birthDayDate?.error}
            </Typography>
          )}
        </div>
      </div>
      <FormItem
        label="전화번호"
        name="phoneNumber"
        formItemStyle={cssFormItemStyle}
        errorStyle={{ display: "block" }}
      >
        <Input
          {...registerField("phoneNumber")}
          detailStyle={css`
            width: 100%;
          `}
          onChange={handleOnChangPhoneNumber}
        />
      </FormItem>
    </Form>
  );
};
