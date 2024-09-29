import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { useTravelInfo } from "states/useTravelInfo";

import { useGetAreaBasedList } from "@/api/hooks/visitKorea";
import { IAreaBasedList } from "@/api/interfaces/visitKorea";
import { cssAlignVerticalStyle } from "@/styles/align";

import { TravelInfoItem } from "./TravelInfoItem";

export const TravelInfoList = () => {
  const { searchValue, setSelectedContent, setIsOpenTravelInfoDetailModal } =
    useTravelInfo();

  const {
    data: areaBasedListData,
    fetchNextPage,
    hasNextPage,
  } = useGetAreaBasedList(searchValue);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const travelInfoItemList = useMemo(() => {
    if (areaBasedListData?.pages && areaBasedListData?.pages.length > 0) {
      return areaBasedListData?.pages.flatMap(
        (page) => page.data.response.body.items.item
      );
    }
    return [];
  }, [areaBasedListData]);

  const handleOnClickTravelInfoItem = (travelInfo: IAreaBasedList) => {
    setSelectedContent(travelInfo);
    setIsOpenTravelInfoDetailModal(true);
  };

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  return (
    <div css={cssAlignVerticalStyle({ gap: 8 })}>
      {travelInfoItemList.map((item, index) => (
        <TravelInfoItem
          key={index}
          travelInfo={item}
          onClickItem={handleOnClickTravelInfoItem}
        />
      ))}
      <div ref={ref} />
    </div>
  );
};
