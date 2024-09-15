import { useEffect } from "react";
import { useTravelInfo } from "states/useTravelInfo";

import { Bar, Typography } from "@/components";
import Modal from "@/components/Modal/Modal";
import { cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import { TravelInfoDetail } from "./components/TravelInfoDetail";
import { TravelInfoList } from "./components/TravelInfoList";
import { TravelInfoSearch } from "./components/TravelInfoSearch";

export const TravelInfoContainer = () => {
  const { isOpenTravelInfoDetailModal, setIsOpenTravelInfoDetailModal } =
    useTravelInfo();

  useEffect(() => {
    return () => {
      setIsOpenTravelInfoDetailModal(false);
    };
  }, [setIsOpenTravelInfoDetailModal]);

  return (
    <div css={cssAlignVerticalStyle({ gap: 16 })}>
      <div css={cssAlignVerticalStyle({ gap: 16, alignItems: "flex-start" })}>
        <Typography size="20" weight="regular" color={COLORS.GRAY3}>
          여행 정보
        </Typography>
        <Bar />
      </div>
      <div css={cssAlignVerticalStyle({ gap: 16, alignItems: "flex-start" })}>
        <TravelInfoSearch />
        <TravelInfoList />
      </div>
      <Modal
        modalType="full"
        isOpen={isOpenTravelInfoDetailModal}
        onClose={() => setIsOpenTravelInfoDetailModal(false)}
      >
        <TravelInfoDetail />
      </Modal>
    </div>
  );
};
