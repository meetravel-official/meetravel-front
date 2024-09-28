import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHeaderState } from "states/useHeader";

import { ReactComponent as BellInfoIcon } from "@/assets/icons/bell-info.svg";
import { ReactComponent as QnaIcon } from "@/assets/icons/qna.svg";
import { Typography } from "@/components";
import { ToggleSwitch } from "@/components/ToggleSwitch/ToggleSwitch";
import { cssAlignHorizontalStyle, cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import { cssMenuBtnStyle } from "./SettingContainter.styles";

export const SettingContainer = () => {
  const { setTitle } = useHeaderState();

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

  return (
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
          <ToggleSwitch isOn={isOn} handleToggle={handleOnClickNotification} />
        </div>
      </button>
    </div>
  );
};
