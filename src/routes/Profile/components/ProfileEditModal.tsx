import { css } from "@emotion/react";
import { useProfile } from "states/useProfile";

import { useGetMyPage } from "@/api/hooks/user";
import { Button, Typography, UserAvatar } from "@/components";
import BorderModal from "@/components/BorderModal/BorderModal";
import Form from "@/components/Form/Form";
import { FormItem } from "@/components/Form/FormItem";
import useForm from "@/components/Form/useForm";
import Input from "@/components/Input/Input";
import { checkNotEmpty } from "@/components/Matching/Matching";
import RadioButtonGroup from "@/components/RadioButton/RadioButtonGroup";
import {
  SIGN_UP_PLANNING_TYPE,
  SIGN_UP_SCHEDULE_TYPE,
  SIGN_UP_TRAVEL_FREQUENCY_TYPE,
} from "@/constants/signUp";
import { cssAlignHorizontalStyle, cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import {
  cssFormItemStyle,
  cssRadioButtonStyle,
} from "./ProfileEditModal.styles";

interface ProfileEditModalProps {
  userId?: string;
}
export const ProfileEditModal = ({ userId }: ProfileEditModalProps) => {
  const { isOpenEditModal, handleOnCloseEditModal } = useProfile();
  const { data: profileData } = useGetMyPage(userId);

  const { form, registerField, resetFields, invalidFields } = useForm({
    initialValues: {
      nickname: profileData?.data.nickname,
      travelFrequency: profileData?.data.travelFrequency,
      mbti: profileData?.data.mbti,
      planningType: profileData?.data.planningType,
      scheduleType: profileData?.data.scheduleType,
      hobby: profileData?.data.hobby,
      intro: profileData?.data.intro,
    },
  });
  const { onChange: onChangeTravelFrequency } =
    registerField("travelFrequency");
  const { onChange: onChangeScheduleType } = registerField("scheduleType");
  const { onChange: onChangePlanningType } = registerField("planningType");

  const handleOnClickClose = () => {
    handleOnCloseEditModal();
    resetFields();
  };

  const handleOnClickSubmit = () => {
    invalidFields(({ value }) => {
      console.log(value);
    });
    resetFields();
  };

  return (
    <BorderModal
      modalType="full"
      isOpen={isOpenEditModal}
      onClose={handleOnClickClose}
      title={
        <Typography color={COLORS.GRAY3} size={20} weight={700}>
          마이 페이지 편집
        </Typography>
      }
    >
      <Form formValue={form}>
        <div
          css={cssAlignVerticalStyle({
            gap: 16,
          })}
        >
          <UserAvatar profileUrl={""} size={80} />
          <FormItem name="nickname" label="" formItemStyle={cssFormItemStyle}>
            <div css={cssAlignHorizontalStyle({ gap: 8, width: "100%" })}>
              <Input
                {...registerField("nickname")}
                type="text"
                detailStyle={css`
                  width: 100%;
                `}
                placeholder="닉네임을 적어주세요."
              />
              <Button
                bgColor={COLORS.PINK2}
                detailStyle={css`
                  width: 91px;
                  box-sizing: border-box;
                  padding: 14px 16px;
                  white-space: nowrap;
                `}
              >
                <Typography color={COLORS.WHITE} size={16} weight={700}>
                  중복 확인
                </Typography>
              </Button>
            </div>
          </FormItem>
          <div
            css={cssAlignVerticalStyle({
              gap: 16,
              alignItems: "flex-start",
            })}
          >
            <FormItem
              label="1년에 여행은 몇 번정도 가시나요?"
              formItemStyle={cssFormItemStyle}
              name="travelFrequency"
            >
              <RadioButtonGroup
                {...registerField("travelFrequency")}
                defaultValue={
                  checkNotEmpty([form.travelFrequency])
                    ? form.travelFrequency?.value
                    : undefined
                }
                onChange={(e) => {
                  onChangeTravelFrequency(e);
                }}
                gridDetailStyle={css`
                  width: 100%;
                `}
              >
                <RadioButtonGroup.RadioButton
                  value={SIGN_UP_TRAVEL_FREQUENCY_TYPE.NEVER}
                  detailStyle={cssRadioButtonStyle(
                    form.travelFrequency?.value ===
                      SIGN_UP_TRAVEL_FREQUENCY_TYPE.NEVER
                  )}
                >
                  안 가요!
                </RadioButtonGroup.RadioButton>
                <RadioButtonGroup.RadioButton
                  value={SIGN_UP_TRAVEL_FREQUENCY_TYPE.ONE_TO_THREE_TIMES}
                  detailStyle={cssRadioButtonStyle(
                    form.travelFrequency?.value ===
                      SIGN_UP_TRAVEL_FREQUENCY_TYPE.ONE_TO_THREE_TIMES
                  )}
                >
                  1-3
                </RadioButtonGroup.RadioButton>
                <RadioButtonGroup.RadioButton
                  value={SIGN_UP_TRAVEL_FREQUENCY_TYPE.FOUR_TO_SIX_TIMES}
                  detailStyle={cssRadioButtonStyle(
                    form.travelFrequency?.value ===
                      SIGN_UP_TRAVEL_FREQUENCY_TYPE.FOUR_TO_SIX_TIMES
                  )}
                >
                  4-6
                </RadioButtonGroup.RadioButton>
                <RadioButtonGroup.RadioButton
                  value={SIGN_UP_TRAVEL_FREQUENCY_TYPE.MORE_SEVEN_TIMES}
                  detailStyle={cssRadioButtonStyle(
                    form.travelFrequency?.value ===
                      SIGN_UP_TRAVEL_FREQUENCY_TYPE.MORE_SEVEN_TIMES
                  )}
                >
                  7번 이상
                </RadioButtonGroup.RadioButton>
              </RadioButtonGroup>
            </FormItem>
            <FormItem
              label="여행 취향은 어떻게 되세요?"
              formItemStyle={css`
                ${cssFormItemStyle}
                margin: 0;
              `}
              name="travelFrequency"
            >
              <RadioButtonGroup
                {...registerField("travelFrequency")}
                defaultValue={
                  checkNotEmpty([form.travelFrequency])
                    ? form.travelFrequency?.value
                    : undefined
                }
                onChange={(e) => {
                  onChangeScheduleType(e);
                }}
                gridDetailStyle={css`
                  width: 100%;
                `}
              >
                <RadioButtonGroup.RadioButton
                  value={SIGN_UP_SCHEDULE_TYPE.TIGHT}
                  detailStyle={cssRadioButtonStyle(
                    form.scheduleType?.value === SIGN_UP_SCHEDULE_TYPE.TIGHT
                  )}
                >
                  빠듯하게
                </RadioButtonGroup.RadioButton>
                <RadioButtonGroup.RadioButton
                  value={SIGN_UP_SCHEDULE_TYPE.RELAX}
                  detailStyle={cssRadioButtonStyle(
                    form.scheduleType?.value === SIGN_UP_SCHEDULE_TYPE.RELAX
                  )}
                >
                  여유롭게
                </RadioButtonGroup.RadioButton>
              </RadioButtonGroup>
            </FormItem>
            <FormItem
              label=""
              name="planningType"
              formItemStyle={cssFormItemStyle}
              labelStyle={css`
                display: none;
              `}
            >
              <RadioButtonGroup
                {...registerField("planningType")}
                defaultValue={
                  checkNotEmpty([form.planningType])
                    ? form.planningType?.value
                    : undefined
                }
                onChange={(e) => {
                  onChangePlanningType(e);
                }}
                gridDetailStyle={css`
                  width: 100%;
                `}
              >
                <RadioButtonGroup.RadioButton
                  value={SIGN_UP_PLANNING_TYPE.PLANNED}
                  detailStyle={cssRadioButtonStyle(
                    form.planningType?.value === SIGN_UP_PLANNING_TYPE.PLANNED
                  )}
                >
                  계획적으로
                </RadioButtonGroup.RadioButton>
                <RadioButtonGroup.RadioButton
                  value={SIGN_UP_PLANNING_TYPE.IMPROMPTU}
                  detailStyle={cssRadioButtonStyle(
                    form.planningType?.value === SIGN_UP_PLANNING_TYPE.IMPROMPTU
                  )}
                >
                  즉흥적으로
                </RadioButtonGroup.RadioButton>
              </RadioButtonGroup>
            </FormItem>
            <FormItem
              label="취미"
              name="hobby"
              formItemStyle={cssFormItemStyle}
            >
              <Input
                {...registerField("hobby")}
                type="text"
                placeholder="취미를 적어주세요."
                detailStyle={css`
                  width: 100%;
                `}
              />
            </FormItem>
            <FormItem label="MBTI" name="mbti" formItemStyle={cssFormItemStyle}>
              <Input
                {...registerField("mbti")}
                type="text"
                placeholder="MBTI는 어떻게 되시나요?"
                detailStyle={css`
                  width: 100%;
                `}
              />
            </FormItem>
            <FormItem
              label="한 줄 자기 소개"
              name="intro"
              formItemStyle={cssFormItemStyle}
            >
              <Input
                {...registerField("intro")}
                type="text"
                placeholder="본인을 한 줄로 표현한다면?"
                detailStyle={css`
                  width: 100%;
                `}
              />
            </FormItem>
          </div>
          <Button
            bgColor={COLORS.PINK3}
            height="large"
            onClick={handleOnClickSubmit}
          >
            <Typography color={COLORS.WHITE} weight={700} size="16">
              저장
            </Typography>
          </Button>
        </div>
      </Form>
    </BorderModal>
  );
};
