import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useHeaderState } from "states/useHeader";
import { removeUserCookie } from "utils/token-utils";

import { usePostSignOut } from "@/api/hooks/auth";
import { ReactComponent as BellInfoIcon } from "@/assets/icons/bell-info.svg";
import { ReactComponent as QnaIcon } from "@/assets/icons/qna.svg";
import { Typography } from "@/components";
import { ToggleSwitch } from "@/components/ToggleSwitch/ToggleSwitch";
import { cssAlignHorizontalStyle, cssAlignVerticalStyle } from "@/styles/align";
import { cssDefaultBtnStyle } from "@/styles/button";
import { COLORS } from "@/styles/color";

import { pageRoutes } from "..";
import {
  cssMenuBtnStyle,
  cssSettingContainerStyle,
} from "./SettingContainter.styles";

export const SettingContainer = () => {
  const navigate = useNavigate();
  const { setTitle } = useHeaderState();

  const { mutate } = usePostSignOut();

  const [isOn, setIsOn] = useState(localStorage.getItem("isOn") === "true");

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
        <button css={cssDefaultBtnStyle}>
          <Typography color={COLORS.GRAY2} size="12" weight={400}>
            회원탈퇴
          </Typography>
        </button>
      </div>
    </div>
  );
};
