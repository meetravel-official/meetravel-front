import { useEffect } from "react";
import { useTravelInfo } from "states/useTravelInfo";

import { Bar, Typography } from "@/components";
import { TravelInfoDetailModal } from "@/components/TravelInfoDetailModal/TravelInfoDetailModal";
import { cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import { TravelInfoList } from "./components/TravelInfoList";
import { TravelInfoSearch } from "./components/TravelInfoSearch";

export const TravelInfoContainer = () => {
  const {
    isOpenTravelInfoDetailModal,
    setIsOpenTravelInfoDetailModal,
    selectedContent,
  } = useTravelInfo();

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
      <TravelInfoDetailModal
        isOpen={isOpenTravelInfoDetailModal}
        onClose={() => setIsOpenTravelInfoDetailModal(false)}
        travelInfo={selectedContent}
      />
    </div>
  );
};
