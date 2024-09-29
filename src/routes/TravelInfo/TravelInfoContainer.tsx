import { Fragment, useEffect } from "react";
import { useTravelInfo } from "states/useTravelInfo";
import { checkUser } from "utils/check-user";

import { TravelInfoDetailModal } from "@/components/TravelInfoDetailModal/TravelInfoDetailModal";

import { TravelInfoList } from "./components/TravelInfoList";

export const TravelInfoContainer = checkUser(() => {
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
    <Fragment>
      <TravelInfoList />
      <TravelInfoDetailModal
        isOpen={isOpenTravelInfoDetailModal}
        onClose={() => setIsOpenTravelInfoDetailModal(false)}
        travelInfo={selectedContent}
      />
    </Fragment>
  );
});
