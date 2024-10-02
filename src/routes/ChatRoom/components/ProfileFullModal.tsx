import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Typography } from "@/components";
import BorderModal from "@/components/BorderModal/BorderModal";
import { ProfileForm } from "@/components/ProfileForm/ProfileForm";
import { cssAlignHorizontalStyle } from "@/styles/align";
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
    if (isOpen) {
      navigate("", {
        state: { isModal: true },
      });
    }
  }, [isOpen, navigate]);

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

  const handleOnClose = () => {
    navigate(-1);
    onClose();
  };

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
      onClose={handleOnClose}
    >
      <ProfileForm userId={userId} />
    </BorderModal>
  );
};
