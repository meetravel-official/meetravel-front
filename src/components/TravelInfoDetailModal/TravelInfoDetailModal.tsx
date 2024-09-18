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
    <BorderModal modalType="full" isOpen={isOpen} onClose={onClose}>
      <TravelInfoDetail travelInfo={travelInfo} />
    </BorderModal>
  );
};
