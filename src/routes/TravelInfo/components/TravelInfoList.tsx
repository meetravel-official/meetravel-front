import { css } from "@emotion/react";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { useTravelInfo } from "states/useTravelInfo";

import { useGetAreaBasedList } from "@/api/hooks/visitKorea";
import { IAreaBasedList } from "@/api/interfaces/visitKorea";
import NotFound from "@/components/NotFound/NotFound";
import { cssAlignVerticalStyle } from "@/styles/align";

import { TravelInfoItem } from "./TravelInfoItem";
import { Spin } from "@/components/Spin/Spin";

export const TravelInfoList = () => {
  const { searchValue, setSelectedContent, setIsOpenTravelInfoDetailModal } =
    useTravelInfo();

  const {
    data: areaBasedListData,
    fetchNextPage,
    hasNextPage,
    isLoading,
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

  return isLoading ? (
    <div
      css={cssAlignVerticalStyle({
        alignItems: "center",
        justifyContent: "center",
      })}
    >
      <Spin size={36} />
    </div>
  ) : (
    <div css={cssAlignVerticalStyle({ gap: 8 })}>
      {travelInfoItemList && travelInfoItemList.length > 0 ? (
        travelInfoItemList.map((item, index) => (
          <TravelInfoItem
            key={index}
            travelInfo={item}
            onClickItem={handleOnClickTravelInfoItem}
          />
        ))
      ) : (
        <NotFound
          mainText="검색 결과가 없습니다."
          detailStyle={css`
            margin-top: 100px;
          `}
        />
      )}
      <div ref={ref} />
    </div>
  );
};
