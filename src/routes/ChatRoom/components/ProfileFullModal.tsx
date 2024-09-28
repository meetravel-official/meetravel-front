import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ReactComponent as ReportIcon } from "@/assets/icons/report.svg";
import { Typography } from "@/components";
import BorderModal from "@/components/BorderModal/BorderModal";
import { ProfileForm } from "@/components/ProfileForm/ProfileForm";
import { cssAlignHorizontalStyle } from "@/styles/align";
import { cssDefaultBtnStyle } from "@/styles/button";
import { COLORS } from "@/styles/color";

interface ProfileFullModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: string;
}
export const ProfileFullModal = ({
  isOpen,
  onClose,
  userId,
}: ProfileFullModalProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("", {
      state: { isModal: true },
    });
  }, [navigate]);

  useEffect(() => {
    window.addEventListener("popstate", () => {
      onClose();
    });
    return () => {
      window.removeEventListener("popstate", () => {
        onClose();
      });
    };
  }, [onClose]);

  return (
    <BorderModal
      title={
        <div
          css={cssAlignHorizontalStyle({
            width: "100%",
            justifyContent: "space-between",
          })}
        >
          <Typography color={COLORS.GRAY3} size="20" weight={700}>
            프로필
          </Typography>
        </div>
      }
      modalType="full"
      isOpen={isOpen}
      onClose={onClose}
    >
      {/* TODO: 타인의 프로필 조회하기 추가되면 수정 */}
      <ProfileForm userId={userId} />
    </BorderModal>
  );
};
