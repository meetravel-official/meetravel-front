import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { TravelInfoItem } from "routes/TravelInfo/components/TravelInfoItem";
import { useHeaderState } from "states/useHeader";
import { checkUser } from "utils/check-user";

import { IAreaBasedList } from "@/api/interfaces/visitKorea";
import NotFound from "@/components/NotFound/NotFound";
import { TravelInfoDetailModal } from "@/components/TravelInfoDetailModal/TravelInfoDetailModal";
import { cssAlignVerticalStyle } from "@/styles/align";

export const LikePlaceContainer = checkUser(() => {
  const { setTitle } = useHeaderState();

  const [isOpenTravelInfoDetailModal, setIsOpenTravelInfoDetailModal] =
    useState(false);
  const [selectedContent, setSelectedContent] = useState<IAreaBasedList>();

  const likePlaceList: string[] =
    typeof localStorage.getItem("likePlaceList") === "string"
      ? JSON.parse(localStorage.getItem("likePlaceList") as string)
      : [];

  const travelInfo = (contentid: string) => {
    if (
      localStorage.getItem(contentid) &&
      typeof localStorage.getItem(contentid) === "string"
    ) {
      return JSON.parse(localStorage.getItem(contentid) as string);
    }
  };

  const handleOnClickTravelInfoItem = (travelInfo: IAreaBasedList) => {
    setSelectedContent(travelInfo);
    setIsOpenTravelInfoDetailModal(true);
  };

  useEffect(() => {
    setTitle("좋아요한 여행 정보");
  }, [setTitle]);

  return (
    <div css={cssAlignVerticalStyle({ gap: 8 })}>
      {likePlaceList.length > 0 ? (
        likePlaceList.map((contentid) => (
          <TravelInfoItem
            key={contentid}
            travelInfo={travelInfo(contentid)}
            onClickItem={handleOnClickTravelInfoItem}
          />
        ))
      ) : (
        <NotFound
          mainText="아직 좋아요한 여행 정보가 없습니다"
          subText="여행 정보 탭에서 마음에 드는 정보에 하트를 눌러 주세요!"
          detailStyle={css`
            margin-top: 100px;
          `}
        />
      )}
      <TravelInfoDetailModal
        isOpen={isOpenTravelInfoDetailModal}
        onClose={() => setIsOpenTravelInfoDetailModal(false)}
        travelId={selectedContent?.contentid}
      />
    </div>
  );
});
