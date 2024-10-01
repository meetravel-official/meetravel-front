import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { IGalleryImage } from "@/api/interfaces/visitKorea";
import BorderModal from "@/components/BorderModal/BorderModal";

import { cssPostModalBodyStyle } from "./PostModal.styles";

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  scrollTo?: string;
  imgDataList?: (IGalleryImage | undefined)[];
  postContent: (props: PostModalContentProps) => ReactNode;
}

export interface PostModalContentProps {
  imgDataList?: (IGalleryImage | undefined)[];
  handleOnLinkMap: (searchKeyword: string) => void;
}
export const PostModal = ({
  isOpen,
  onClose,
  scrollTo,
  imgDataList,
  postContent,
}: PostModalProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen)
      navigate("", {
        state: { isModal: true },
      });
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

  useEffect(() => {
    if (scrollTo) {
      const element = document.getElementById(scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }
  }, [scrollTo]);

  const handleOnLinkMap = (searchKeyword: string) => {
    return window.open(
      `https://map.kakao.com/link/search/${searchKeyword}`,
      "_blank"
    );
  };

  return (
    <BorderModal modalType="full" isOpen={isOpen} onClose={handleOnClose}>
      <div css={cssPostModalBodyStyle}>
        {postContent({ imgDataList, handleOnLinkMap })}
      </div>
    </BorderModal>
  );
};
