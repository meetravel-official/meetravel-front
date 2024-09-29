import { css } from "@emotion/react";
import * as Popover from "@radix-ui/react-popover";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useProfile } from "states/useProfile";
import { nicknameRegex } from "utils/regex-utils";

import { useGetCheckNickname } from "@/api/hooks/auth";
import { useGetMyPage, usePutInfo, usePutNickname } from "@/api/hooks/user";
import {
  GetMyPageResponseMbtiEnum,
  GetMyPageResponseMbtiEnumArray,
  GetMyPageResponsePlanningTypeEnum,
  GetMyPageResponseScheduleTypeEnum,
  GetMyPageResponseTravelFrequencyEnum,
} from "@/api/interfaces/user";
import { ReactComponent as CameraIcon } from "@/assets/icons/camera.svg";
import { ReactComponent as ExclamationCircleIcon } from "@/assets/icons/exclamation-circle.svg";
import { ReactComponent as PlanImpromptuIcon } from "@/assets/icons/plan-impromptu.svg";
import { ReactComponent as PlanPlannedIcon } from "@/assets/icons/plan-planned.svg";
import { ReactComponent as ScheduleRelaxIcon } from "@/assets/icons/schedule-relax.svg";
import { ReactComponent as ScheduleTightIcon } from "@/assets/icons/schedule-tight.svg";
import { Button, Typography, UserAvatar } from "@/components";
import BorderModal from "@/components/BorderModal/BorderModal";
import CheckButtonGroup from "@/components/CheckButton/CheckButtonGroup";
import Form from "@/components/Form/Form";
import { FormItem } from "@/components/Form/FormItem";
import useForm from "@/components/Form/useForm";
import Input from "@/components/Input/Input";
import Modal from "@/components/Modal/Modal";
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

export const ProfileEditModal = () => {
  const navigate = useNavigate();

  const [checkNickname, setCheckNickname] = useState<{
    isClick: boolean;
    isDuplicated: boolean;
  }>({ isClick: false, isDuplicated: false });
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const [isOpenCancelModal, setIsOpenCancelModal] = useState(false);

  const { isOpenEditModal, handleOnCloseEditModal } = useProfile();

  const queryClient = useQueryClient();
  const { data: profileData } = useGetMyPage();
  const { mutate } = useGetCheckNickname();
  const { mutateAsync: mutateInfo } = usePutInfo();
  const { mutateAsync: mutateNickname } = usePutNickname();

  const { form, registerField, resetFields, invalidFields, setFields } =
    useForm({
      initialValues: {
        nickname: profileData?.nickname,
        travelFrequency: profileData?.travelFrequency,
        mbti: profileData?.mbti,
        planningType: profileData?.planningType,
        scheduleType: profileData?.scheduleType,
        hobby: profileData?.hobby,
        intro: profileData?.intro,
        profileImageUrl: profileData?.profileImageUrl,
      },
      required: ["nickname"],
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
    if (form.nickname.value !== profileData?.nickname) {
      if (!checkNickname.isClick) {
        return (
          <Typography color={COLORS.SITUATION1} size="14">
            중복 여부를 확인해주세요.
          </Typography>
        );
      }
    }
  }, [
    checkNickname.isClick,
    checkNickname.isDuplicated,
    form.nickname.error,
    form.nickname.value,
    profileData?.nickname,
  ]);

  const handleOnCheckChange = (
    e: string[],
    type: "travelFrequency" | "scheduleType" | "planningType"
  ) => {
    const lastSelect = e?.[e.length - 1];
    if (lastSelect === form?.[type]?.value) {
      registerField(type).onChange("");
      return;
    }
    registerField(type).onChange(lastSelect || "");
  };

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
    if (form.nickname.value !== profileData?.nickname) {
      if (checkNickname.isDuplicated || !checkNickname.isClick) {
        return;
      }
    }
    invalidFields(async ({ value }) => {
      try {
        await mutateNickname({ nickname: value.nickname.value || "" });
        await mutateInfo({
          travelFrequency:
            (value.travelFrequency
              .value as GetMyPageResponseTravelFrequencyEnum) || "",
          mbti: (value.mbti.value as GetMyPageResponseMbtiEnum) || "",
          planningType:
            (value.planningType.value as GetMyPageResponsePlanningTypeEnum) ||
            "",
          scheduleType:
            (value.scheduleType.value as GetMyPageResponseScheduleTypeEnum) ||
            "",
          hobby: value.hobby.value || "",
          intro: value.intro.value || "",
        });
        await queryClient.invalidateQueries({ queryKey: ["useGetMyPage"] });
        toast.success("프로필이 수정되었습니다.");
        resetFields();
        handleOnCloseEditModal();
      } catch (error) {
        toast.error("잠시 후 다시 시도해주세요.");
      }
    });
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

  useEffect(() => {
    setFields({
      nickname: profileData?.nickname,
      travelFrequency: profileData?.travelFrequency,
      mbti: profileData?.mbti,
      planningType: profileData?.planningType,
      scheduleType: profileData?.scheduleType,
      hobby: profileData?.hobby,
      intro: profileData?.intro,
      profileImageUrl: profileData?.profileImageUrl,
    });
  }, [profileData, setFields]);

  return (
    <Fragment>
      <BorderModal
        modalType="full"
        isOpen={isOpenEditModal}
        onClose={handleOnClickClose}
        title={
          <Typography color={COLORS.GRAY3} size={20} weight={700}>
            프로필 편집
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
                      form.nickname.value === profileData?.nickname ||
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
                  {profileData?.gender === "남성" ? "男" : "女"}
                </Typography>
                <Typography color={COLORS.GRAY4} weight={400} size="16">
                  {profileData?.birthDate
                    ? dayjs(profileData?.birthDate, "YYYY-MM-DD").format(
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
              <CheckButtonGroup
                {...registerField("travelFrequency")}
                onChange={(e) => handleOnCheckChange(e, "travelFrequency")}
                gridDetailStyle={css`
                  width: 100%;
                `}
              >
                <CheckButtonGroup.CheckboxButton
                  value={SIGN_UP_TRAVEL_FREQUENCY_TYPE.NEVER}
                  detailStyle={cssRadioButtonStyle(
                    form.travelFrequency?.value ===
                      SIGN_UP_TRAVEL_FREQUENCY_TYPE.NEVER
                  )}
                >
                  안 가요!
                </CheckButtonGroup.CheckboxButton>
                <CheckButtonGroup.CheckboxButton
                  value={SIGN_UP_TRAVEL_FREQUENCY_TYPE.ONE_TO_THREE_TIMES}
                  detailStyle={cssRadioButtonStyle(
                    form.travelFrequency?.value ===
                      SIGN_UP_TRAVEL_FREQUENCY_TYPE.ONE_TO_THREE_TIMES
                  )}
                >
                  1-3
                </CheckButtonGroup.CheckboxButton>
                <CheckButtonGroup.CheckboxButton
                  value={SIGN_UP_TRAVEL_FREQUENCY_TYPE.FOUR_TO_SIX_TIMES}
                  detailStyle={cssRadioButtonStyle(
                    form.travelFrequency?.value ===
                      SIGN_UP_TRAVEL_FREQUENCY_TYPE.FOUR_TO_SIX_TIMES
                  )}
                >
                  4-6
                </CheckButtonGroup.CheckboxButton>
                <CheckButtonGroup.CheckboxButton
                  value={SIGN_UP_TRAVEL_FREQUENCY_TYPE.MORE_SEVEN_TIMES}
                  detailStyle={cssRadioButtonStyle(
                    form.travelFrequency?.value ===
                      SIGN_UP_TRAVEL_FREQUENCY_TYPE.MORE_SEVEN_TIMES
                  )}
                >
                  7번 이상
                </CheckButtonGroup.CheckboxButton>
              </CheckButtonGroup>
            </FormItem>
            <FormItem
              label="여행 취향은 어떻게 되세요?"
              formItemStyle={css`
                ${cssFormItemStyle};
                margin: 16px;
              `}
              name="scheduleType"
            >
              <CheckButtonGroup
                {...registerField("scheduleType")}
                onChange={(e) => handleOnCheckChange(e, "scheduleType")}
                gridDetailStyle={css`
                  width: 100%;
                `}
              >
                <CheckButtonGroup.CheckboxButton
                  value={SIGN_UP_SCHEDULE_TYPE.TIGHT}
                  detailStyle={cssRadioButtonStyle(
                    form.scheduleType?.value === SIGN_UP_SCHEDULE_TYPE.TIGHT
                  )}
                >
                  <div css={cssAlignHorizontalStyle({ gap: 8 })}>
                    <ScheduleTightIcon />
                    <span>빠듯하게</span>
                  </div>
                </CheckButtonGroup.CheckboxButton>
                <CheckButtonGroup.CheckboxButton
                  value={SIGN_UP_SCHEDULE_TYPE.RELAX}
                  detailStyle={cssRadioButtonStyle(
                    form.scheduleType?.value === SIGN_UP_SCHEDULE_TYPE.RELAX
                  )}
                >
                  <div css={cssAlignHorizontalStyle({ gap: 8 })}>
                    <ScheduleRelaxIcon />
                    <span>여유롭게</span>
                  </div>
                </CheckButtonGroup.CheckboxButton>
              </CheckButtonGroup>
            </FormItem>
            <FormItem
              label=""
              name="planningType"
              formItemStyle={cssFormItemStyle}
              labelStyle={css`
                display: none;
              `}
            >
              <CheckButtonGroup
                {...registerField("planningType")}
                onChange={(e) => handleOnCheckChange(e, "planningType")}
                gridDetailStyle={css`
                  width: 100%;
                `}
              >
                <CheckButtonGroup.CheckboxButton
                  value={SIGN_UP_PLANNING_TYPE.PLANNED}
                  detailStyle={cssRadioButtonStyle(
                    form.planningType?.value === SIGN_UP_PLANNING_TYPE.PLANNED
                  )}
                >
                  <div css={cssAlignHorizontalStyle({ gap: 8 })}>
                    <PlanPlannedIcon />
                    <span>계획적으로</span>
                  </div>
                </CheckButtonGroup.CheckboxButton>
                <CheckButtonGroup.CheckboxButton
                  value={SIGN_UP_PLANNING_TYPE.IMPROMPTU}
                  detailStyle={cssRadioButtonStyle(
                    form.planningType?.value === SIGN_UP_PLANNING_TYPE.IMPROMPTU
                  )}
                >
                  <div css={cssAlignHorizontalStyle({ gap: 8 })}>
                    <PlanImpromptuIcon />
                    <span>즉흥적으로</span>
                  </div>
                </CheckButtonGroup.CheckboxButton>
              </CheckButtonGroup>
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
