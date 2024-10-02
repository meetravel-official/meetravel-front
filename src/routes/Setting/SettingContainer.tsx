import { Fragment, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useHeaderState } from "states/useHeader";
import { checkUser } from "utils/check-user";
import { removeUserCookie } from "utils/token-utils";

import { usePostSignOut } from "@/api/hooks/auth";
import { useDeleteUser } from "@/api/hooks/user";
import { ReactComponent as BellInfoIcon } from "@/assets/icons/bell-info.svg";
import { ReactComponent as ExclamationCircleIcon } from "@/assets/icons/exclamation-circle.svg";
import { ReactComponent as QnaIcon } from "@/assets/icons/qna.svg";
import { Button, Typography } from "@/components";
import Modal from "@/components/Modal/Modal";
import { ToggleSwitch } from "@/components/ToggleSwitch/ToggleSwitch";
import { cssAlignHorizontalStyle, cssAlignVerticalStyle } from "@/styles/align";
import { cssDefaultBtnStyle } from "@/styles/button";
import { COLORS } from "@/styles/color";

import { pageRoutes } from "..";
import {
  cssMenuBtnStyle,
  cssSettingContainerStyle,
} from "./SettingContainter.styles";

export const SettingContainer = checkUser(() => {
  const navigate = useNavigate();
  const { setTitle } = useHeaderState();

  const { mutate } = usePostSignOut();
  const { mutate: mutateDelete, isPending: isPendingDelete } = useDeleteUser();

  const [isOn, setIsOn] = useState(localStorage.getItem("isOn") === "true");
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  useEffect(() => {
    setTitle("설정");
  }, [setTitle]);

  const handleOnClickQna = () => {
    toast.warn("문의하기 기능은 추후 업데이트 예정입니다.");
  };

  const handleOnClickNotification = useCallback(() => {
    const newValue = !isOn;
    setIsOn(newValue);
    localStorage.setItem("isOn", newValue.toString());
    if (newValue) {
      toast.success("알림이 켜졌습니다.");
    } else {
      toast.success("알림이 꺼졌습니다.");
    }
  }, [isOn]);

  const handleOnClickSignOut = () => {
    mutate(undefined, {
      onSettled: () => {
        toast.success("로그아웃을 성공했습니다.");
        removeUserCookie();
        navigate(pageRoutes.SIGN_IN);
      },
    });
  };

  const handleOnOpenDeleteModal = () => {
    setIsOpenDeleteModal(true);
  };

  const handleOnCloseDeleteModal = () => {
    setIsOpenDeleteModal(false);
  };

  const handleOnClickDeleteUser = () => {
    mutateDelete(undefined, {
      onSuccess: () => {
        toast.success("회원 탈퇴를 성공했습니다.");
        removeUserCookie();
        navigate(pageRoutes.SIGN_IN);
      },
      onError: () => {
        toast.error("회원 탈퇴에 실패했습니다");
      },
    });
  };

  return (
    <div css={cssSettingContainerStyle}>
      <div css={cssAlignVerticalStyle({ gap: 24 })}>
        <button css={cssMenuBtnStyle} onClick={handleOnClickQna}>
          <QnaIcon />
          <Typography color={COLORS.GRAY4} size={16} weight={700}>
            문의하기
          </Typography>
        </button>
        <button css={cssMenuBtnStyle}>
          <BellInfoIcon />
          <div
            css={cssAlignHorizontalStyle({
              justifyContent: "space-between",
              width: "100%",
            })}
          >
            <Typography color={COLORS.GRAY4} size={16} weight={700}>
              알림 설정
            </Typography>
            <ToggleSwitch
              isOn={isOn}
              handleToggle={handleOnClickNotification}
            />
          </div>
        </button>
      </div>
      <div css={cssAlignHorizontalStyle({ gap: 40 })}>
        <button css={cssDefaultBtnStyle} onClick={handleOnClickSignOut}>
          <Typography color={COLORS.GRAY2} size="12" weight={400}>
            로그아웃
          </Typography>
        </button>
        <Typography color={COLORS.GRAY2} size="12" weight={400}>
          |
        </Typography>
        <button css={cssDefaultBtnStyle} onClick={handleOnOpenDeleteModal}>
          <Typography color={COLORS.GRAY2} size="12" weight={400}>
            회원탈퇴
          </Typography>
        </button>
      </div>
      <Modal
        modalType="simple"
        closableIcon={false}
        isOpen={isOpenDeleteModal}
        onClose={handleOnCloseDeleteModal}
        footer={
          <Fragment>
            <Button bgColor={COLORS.PINK3} onClick={handleOnCloseDeleteModal}>
              <Typography color={COLORS.WHITE} size="16" weight={700}>
                아니요
              </Typography>
            </Button>
            <Button onClick={handleOnClickDeleteUser} loading={isPendingDelete}>
              <Typography color={COLORS.GRAY3} size="16" weight={700}>
                탈퇴
              </Typography>
            </Button>
          </Fragment>
        }
      >
        <div css={cssAlignVerticalStyle({ gap: 12, alignItems: "center" })}>
          <ExclamationCircleIcon width={50} height={50} />
          <Typography color={COLORS.GRAY4} size="16" weight={700}>
            정말 탈퇴하시겠어요?
          </Typography>
        </div>
      </Modal>
    </div>
  );
});
