import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { IAreaBasedList } from "@/api/interfaces/visitKorea";
import BorderModal from "@/components/BorderModal/BorderModal";

import { TravelInfoDetail } from "./TravelInfoDetail";

interface TravelInfoDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  travelInfo?: IAreaBasedList;
}

export const TravelInfoDetailModal = ({
  isOpen,
  onClose,
  travelInfo,
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
      <TravelInfoDetail travelInfo={travelInfo} />
    </BorderModal>
  );
};
