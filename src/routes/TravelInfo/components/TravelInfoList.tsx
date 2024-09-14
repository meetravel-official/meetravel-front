import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { useTravelInfo } from "states/useTravelInfo";

import { useGetAreaBasedList } from "@/api/hooks/visitKorea";
import { cssAlignVerticalStyle } from "@/styles/align";

import { TravelInfoItem } from "./TravelInfoItem";

export const TravelInfoList = () => {
  const { searchValue } = useTravelInfo();

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

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  return (
    <div css={cssAlignVerticalStyle({ gap: 8 })}>
      {travelInfoItemList.map((item, index) => (
        <TravelInfoItem key={index} travelInfo={item} />
      ))}
      <div ref={ref} />
    </div>
  );
};
