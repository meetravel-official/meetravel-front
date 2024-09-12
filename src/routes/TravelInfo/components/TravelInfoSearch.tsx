import { useCallback, useMemo } from "react";
import { useTravelInfo } from "states/useTravelInfo";

import { useGetAreaCode } from "@/api/hooks/visitKorea";
import { IAriaCode } from "@/api/interfaces/visitKorea";
import Select from "@/components/Select/Select";
import { cssAlignHorizontalStyle } from "@/styles/align";

export const TravelInfoSearch = () => {
  const { searchValue, setSearchValue } = useTravelInfo();

  const { data: areaCodeData } = useGetAreaCode();

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

  return (
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
  );
};
