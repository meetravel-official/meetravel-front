import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import BorderModal from "@/components/BorderModal/BorderModal";

import { ContentSeptember } from "./ContentSeptember";
import { cssPostModalBodyStyle } from "./PostModal.styles";

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface PostModalContentProps {
  handleOnLinkMap: (searchKeyword: string) => void;
}
export const PostModal = ({ isOpen, onClose }: PostModalProps) => {
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

  const handleOnLinkMap = (searchKeyword: string) => {
    return window.open(
      `https://map.kakao.com/link/search/${searchKeyword}`,
      "_blank"
    );
  };

  return (
    <BorderModal modalType="full" isOpen={isOpen} onClose={onClose}>
      <div css={cssPostModalBodyStyle}>
        <ContentSeptember handleOnLinkMap={handleOnLinkMap} />
      </div>
    </BorderModal>
  );
};
