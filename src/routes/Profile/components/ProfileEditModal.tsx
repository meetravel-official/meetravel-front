import { css } from "@emotion/react";
import * as Popover from "@radix-ui/react-popover";
import dayjs from "dayjs";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "states/useProfile";
import { nicknameRegex } from "utils/regex-utils";

import { useGetCheckNickname } from "@/api/hooks/auth";
import { useGetMyPage } from "@/api/hooks/user";
import { GetMyPageResponseMbtiEnumArray } from "@/api/interfaces/user";
import { ReactComponent as CameraIcon } from "@/assets/icons/camera.svg";
import { ReactComponent as ExclamationCircleIcon } from "@/assets/icons/exclamation-circle.svg";
import { Button, Typography, UserAvatar } from "@/components";
import BorderModal from "@/components/BorderModal/BorderModal";
import Form from "@/components/Form/Form";
import { FormItem } from "@/components/Form/FormItem";
import useForm from "@/components/Form/useForm";
import Input from "@/components/Input/Input";
import { checkNotEmpty } from "@/components/Matching/Matching";
import Modal from "@/components/Modal/Modal";
import RadioButtonGroup from "@/components/RadioButton/RadioButtonGroup";
import {
  SIGN_UP_PLANNING_TYPE,
  SIGN_UP_SCHEDULE_TYPE,
  SIGN_UP_TRAVEL_FREQUENCY_TYPE,
} from "@/constants/signUp";
import { cssAlignHorizontalStyle, cssAlignVerticalStyle } from "@/styles/align";
import { cssDefaultBtnStyle } from "@/styles/button";
import { COLORS } from "@/styles/color";

import {
  cssDisableEditAreaStyle,
  cssEditProfileImgBoxStyle,
  cssEditProfileImgButtonStyle,
  cssFormItemStyle,
  cssPopOverContentStyle,
  cssRadioButtonStyle,
} from "./ProfileEditModal.styles";

interface ProfileEditModalProps {
  userId?: string;
}
export const ProfileEditModal = ({ userId }: ProfileEditModalProps) => {
  const navigate = useNavigate();

  const [checkNickname, setCheckNickname] = useState<{
    isClick: boolean;
    isDuplicated: boolean;
  }>({ isClick: false, isDuplicated: false });
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const [isOpenCancelModal, setIsOpenCancelModal] = useState(false);

  const { isOpenEditModal, handleOnCloseEditModal } = useProfile();
  const { data: profileData } = useGetMyPage(userId);
  const { mutate } = useGetCheckNickname();

  const { form, registerField, resetFields, invalidFields } = useForm({
    initialValues: {
      nickname: profileData?.data.nickname,
      travelFrequency: profileData?.data.travelFrequency,
      mbti: profileData?.data.mbti,
      planningType: profileData?.data.planningType,
      scheduleType: profileData?.data.scheduleType,
      hobby: profileData?.data.hobby,
      intro: profileData?.data.intro,
      profileImageUrl: profileData?.data.profileImageUrl,
    },
    validate: {
      nickname: (value) => {
        if (
          value &&
          (value.length < 2 || value.length > 6 || !nicknameRegex.test(value))
        ) {
          return "닉네임은 한글, 영어로 구성된 2자 이상 6자 이하로 입력해주세요.(띄어쓰기 포함 불가)";
        }

        return undefined;
      },
      mbti: (value) => {
        if (value && !GetMyPageResponseMbtiEnumArray.includes(value)) {
          return "MBTI는 4글자 대문자로 입력해주세요.";
        }
        return undefined;
      },
    },
  });

  const { onChange: onChangeTravelFrequency } =
    registerField("travelFrequency");
  const { onChange: onChangeScheduleType } = registerField("scheduleType");
  const { onChange: onChangePlanningType } = registerField("planningType");

  const handleCheckNickname = async () => {
    if (!!form.nickname.value && !form.nickname.error) {
      mutate(form.nickname.value, {
        onSuccess: (res) => {
          setCheckNickname({ isClick: true, isDuplicated: res.data });
        },
        onError: () => {
          setCheckNickname({ isClick: false, isDuplicated: false });
        },
      });
    }
  };

  const checkNicknameText = useMemo(() => {
    if (form.nickname.error) {
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
  }, [checkNickname.isClick, checkNickname.isDuplicated, form.nickname.error]);

  const handleOnOpenPopOver = () => {
    setIsOpenPopover(true);
  };

  const handleOnClosePopOver = () => {
    setIsOpenPopover(false);
  };

  const handleOnClickClose = () => {
    setIsOpenCancelModal(true);
    resetFields();
  };

  const handleOnClickSubmit = () => {
    invalidFields(({ value }) => {
      console.log(value);
    });
    resetFields();
  };

  const handleOnCloseCancelModal = () => {
    setIsOpenCancelModal(false);
  };

  const handleOnCloseEditModalAll = () => {
    handleOnCloseCancelModal();
    handleOnClosePopOver();
    handleOnCloseEditModal();
  };

  useEffect(() => {
    navigate("", {
      state: { isModal: true },
    });
  }, [navigate]);

  useEffect(() => {
    window.addEventListener("popstate", () => {
      handleOnCloseEditModalAll();
    });
    return () => {
      window.removeEventListener("popstate", () => {
        handleOnCloseEditModalAll();
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //TODO: api 연결

  return (
    <Fragment>
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
        <div css={cssAlignVerticalStyle({ gap: 16, alignItems: "center" })}>
          <div css={cssEditProfileImgBoxStyle}>
            <UserAvatar profileUrl={form.profileImageUrl.value} size={80} />
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
                      프로필 삭제
                    </Typography>
                  </button>
                  <button css={cssDefaultBtnStyle}>
                    <Typography color={COLORS.GRAY4} weight={700} size="16">
                      갤러리 이동
                    </Typography>
                  </button>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          </div>
          <Form
            formValue={form}
            formStyle={css`
              width: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;
              margin-bottom: 36px;
            `}
          >
            <FormItem name="nickname" label="" formItemStyle={cssFormItemStyle}>
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
                      setCheckNickname({ isClick: false, isDuplicated: false });
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
                      form.nickname.value === profileData?.data.nickname ||
                      !!form.nickname.error
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
            <div css={cssDisableEditAreaStyle}>
              <div css={cssAlignHorizontalStyle({ gap: 4 })}>
                <Typography color={COLORS.GRAY3} weight={700} size="16">
                  {profileData?.data?.gender === "남성" ? "男" : "女"}
                </Typography>
                <Typography color={COLORS.GRAY4} weight={400} size="16">
                  {profileData?.data?.birthDate
                    ? dayjs(profileData?.data?.birthDate, "YYYY-MM-DD").format(
                        "YYYY년생"
                      )
                    : "-"}
                </Typography>
              </div>
            </div>

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
                ${cssFormItemStyle};
                margin: 16px;
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
            <FormItem
              label="MBTI"
              name="mbti"
              formItemStyle={cssFormItemStyle}
              errorStyle={{ display: "block" }}
            >
              <Input
                {...registerField("mbti")}
                type="text"
                placeholder="MBTI는 어떻게 되시나요?"
                detailStyle={css`
                  width: 100%;
                `}
                maxLength={4}
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
          </Form>
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
      </BorderModal>
      <Modal
        zIndex={102}
        modalType="simple"
        isOpen={isOpenCancelModal}
        onClose={handleOnCloseCancelModal}
        closableIcon={false}
        footer={
          <Fragment>
            <Button bgColor={COLORS.PINK3} onClick={handleOnCloseEditModalAll}>
              <Typography color={COLORS.WHITE} size="16" weight={700}>
                나갈래요!
              </Typography>
            </Button>
            <Button onClick={handleOnCloseCancelModal}>
              <Typography color={COLORS.GRAY3} size="16" weight={700}>
                안 나갈래요!
              </Typography>
            </Button>
          </Fragment>
        }
      >
        <div css={cssAlignVerticalStyle({ gap: 12, alignItems: "center" })}>
          <ExclamationCircleIcon width={50} height={50} />
          <Typography color={COLORS.GRAY4} size="16" weight={700}>
            편집을 종료하시겠어요?
          </Typography>
          <Typography
            color={COLORS.GRAY3}
            size="12"
            weight={400}
            align="center"
          >
            *현재까지 작성된 내용은 저장되지 않으며,
            <br />
            기존 설정으로 유지돼요.
          </Typography>
        </div>
      </Modal>
    </Fragment>
  );
};
