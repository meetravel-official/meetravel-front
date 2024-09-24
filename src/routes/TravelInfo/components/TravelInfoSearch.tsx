import { useCallback, useMemo } from "react";
import { useTravelInfo } from "states/useTravelInfo";
import { getShortAreaName } from "utils/area-utils";

import { useGetAreaCode } from "@/api/hooks/visitKorea";
import { IAriaCode } from "@/api/interfaces/visitKorea";
import { SelectByModal } from "@/components/SelectByModal/SelectByModal";
import { cssAlignHorizontalStyle } from "@/styles/align";

import {
  cssAreaCodeSelectListStyle,
  cssContentTypeSelectListStyle,
} from "../styles/TravelInfoSearch.styles";

export const TravelInfoSearch = () => {
  const { searchValue, setSearchValue } = useTravelInfo();

  const { data: areaCodeData } = useGetAreaCode();

  const areaCodeList = useMemo(() => {
    if (areaCodeData?.data.response?.body?.items?.item) {
      return areaCodeData.data.response.body.items.item.map(
        (item: IAriaCode) => ({
          code: item.code,
          label: getShortAreaName(item.name),
        })
      );
    }
    return [];
  }, [areaCodeData]);

  const contentTypeIdList = useMemo(() => {
    return [
      { contentTypeId: "12", label: "관광지" },
      { contentTypeId: "14", label: "문화시설" },
      { contentTypeId: "15", label: "축제공연행사" },
      { contentTypeId: "28", label: "레포츠" },
      { contentTypeId: "32", label: "숙박" },
      { contentTypeId: "38", label: "쇼핑" },
      { contentTypeId: "39", label: "음식점" },
    ];
  }, []);

  const handleOnSelectAreaCode = useCallback(
    (selectedAreaCode: { code: string; label: string }) => {
      setSearchValue({
        ...searchValue,
        areaCode: selectedAreaCode.code,
        areaCodeLabel: selectedAreaCode.label,
      });
    },
    [searchValue, setSearchValue]
  );

  const handleOnSelectContentType = useCallback(
    (selectedContentType: { contentTypeId: string; label: string }) => {
      setSearchValue({
        ...searchValue,
        contentTypeId: selectedContentType.contentTypeId,
        contentTypeIdLabel: selectedContentType.label,
      });
    },
    [searchValue, setSearchValue]
  );

  return (
    <div
      css={cssAlignHorizontalStyle({
        gap: 4,
      })}
    >
      <SelectByModal
        value={searchValue.areaCodeLabel}
        placeholder="지역 선택"
        options={areaCodeList}
        width={110}
        onSelect={handleOnSelectAreaCode}
        optionListStyle={cssAreaCodeSelectListStyle}
      />
      <SelectByModal
        value={searchValue.contentTypeIdLabel}
        placeholder="여행 타입 선택"
        options={contentTypeIdList}
        width={138}
        onSelect={handleOnSelectContentType}
        optionListStyle={cssContentTypeSelectListStyle}
      />
    </div>
  );
};
