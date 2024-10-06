import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import BorderModal from "@/components/BorderModal/BorderModal";

import { TravelInfoDetail } from "./TravelInfoDetail";

interface TravelInfoDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  travelId?: string;
}

export const TravelInfoDetailModal = ({
  isOpen,
  onClose,
  travelId,
}: TravelInfoDetailModalProps) => {
  const navigate = useNavigate();

  const handleOnClose = () => {
    navigate(-1);
    onClose();
  };

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
  }, [isOpen, navigate, onClose]);

  return (
    <BorderModal modalType="full" isOpen={isOpen} onClose={handleOnClose}>
      <TravelInfoDetail travelId={travelId} />
    </BorderModal>
  );
};
