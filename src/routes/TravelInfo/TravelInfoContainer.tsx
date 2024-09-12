import { useCallback, useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { useTravelInfo } from "states/useTravelInfo";

import { useGetAreaBasedList, useGetAreaCode } from "@/api/hooks/visitKorea";
import { IAriaCode } from "@/api/interfaces/visitKorea";
import { Bar, Typography } from "@/components";
import Select from "@/components/Select/Select";
import { cssAlignHorizontalStyle, cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import { TravelInfoItem } from "./components/TravelInfoItem";

export const TravelInfoContainer = () => {
  const { searchValue, setSearchValue } = useTravelInfo();

  const { data: areaCodeData } = useGetAreaCode();
  const {
    data: areaBasedListData,
    fetchNextPage,
    hasNextPage,
  } = useGetAreaBasedList(searchValue);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const areaCodeList = useMemo(() => {
    if (areaCodeData?.data.response?.body?.items?.item) {
      return areaCodeData.data.response.body.items.item.map(
        (item: IAriaCode) => ({
          key: item.code,
          value: item.name,
        })
      );
    }
    return [];
  }, [areaCodeData]);

  const contentTypeIdList = useMemo(() => {
    return [
      { key: "12", value: "관광지" },
      { key: "14", value: "문화시설" },
      { key: "15", value: "축제공연행사" },
      { key: "28", value: "레포츠" },
      { key: "32", value: "숙박" },
      { key: "38", value: "쇼핑" },
      { key: "39", value: "음식점" },
    ];
  }, []);

  const travelInfoItemList = useMemo(() => {
    if (areaBasedListData?.pages && areaBasedListData?.pages.length > 0) {
      return areaBasedListData?.pages.flatMap(
        (page) => page.data.response.body.items.item
      );
    }
    return [];
  }, [areaBasedListData]);

  const handleOnChangeAreaCode = useCallback(
    (selectedValue: string) => {
      const selectedItem = areaCodeList.find(
        (item: { key: string; value: string }) => item.value === selectedValue
      );
      if (selectedItem)
        setSearchValue({
          ...searchValue,
          areaCodeLabel: selectedItem.value,
          areaCode: selectedItem.key,
        });
    },
    [areaCodeList, searchValue, setSearchValue]
  );

  const handleOnChangeContentTypeId = useCallback(
    (selectedValue: string) => {
      const selectedItem = contentTypeIdList.find(
        (item: { key: string; value: string }) => item.value === selectedValue
      );
      if (selectedItem)
        setSearchValue({
          ...searchValue,
          contentTypeId: selectedItem.key,
          contentTypeIdLabel: selectedItem.value,
        });
    },
    [contentTypeIdList, searchValue, setSearchValue]
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  return (
    <div css={cssAlignVerticalStyle({ gap: 16 })}>
      <div css={cssAlignVerticalStyle({ gap: 16, alignItems: "flex-start" })}>
        <Typography size="20" weight="regular" color={COLORS.GRAY3}>
          여행 정보
        </Typography>
        <Bar />
      </div>
      <div css={cssAlignVerticalStyle({ gap: 16, alignItems: "flex-start" })}>
        <div
          css={cssAlignHorizontalStyle({
            gap: 4,
          })}
        >
          <Select
            width="106px"
            placeholder="지역 선택"
            value={searchValue.areaCodeLabel}
            selectOptions={areaCodeList}
            onChange={(selectedValue) =>
              handleOnChangeAreaCode(selectedValue as string)
            }
          />
          <Select
            width="138px"
            placeholder="여행 타입 선택"
            selectOptions={contentTypeIdList}
            value={searchValue.contentTypeIdLabel}
            onChange={(selectedValue) => {
              handleOnChangeContentTypeId(selectedValue as string);
            }}
          />
        </div>
        <div css={cssAlignVerticalStyle({ gap: 8 })}>
          {travelInfoItemList.map((item, index) => (
            <TravelInfoItem key={index} travelInfo={item} />
          ))}
          <div ref={ref} />
        </div>
      </div>
    </div>
  );
};
