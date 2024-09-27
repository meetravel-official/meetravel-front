import { useCallback, useMemo } from "react";
import { Outlet } from "react-router-dom";
import { useTravelInfo } from "states/useTravelInfo";
import { getShortAreaName } from "utils/area-utils";

import { useGetAreaCode } from "@/api/hooks/visitKorea";
import { IAriaCode } from "@/api/interfaces/visitKorea";
import { cssAlignHorizontalStyle, cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import { Layout } from "../Layout/Layout";
import MatchingButton from "../Matching/Matching";
import { NavBar } from "../NavBar/NavBar";
import { SelectByModal } from "../SelectByModal/SelectByModal";
import { Typography } from "../Typography/Typography";
import {
  cssAreaCodeSelectListStyle,
  cssContentTypeSelectListStyle,
  cssTravelLayoutHeaderStyle,
} from "./TravelInfoLayout.styles";

export const TravelInfoLayout = () => {
  const { data: areaCodeData } = useGetAreaCode();

  const { searchValue, setSearchValue } = useTravelInfo();

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
    <Layout>
      <Layout.Header css={cssTravelLayoutHeaderStyle}>
        <div css={cssAlignVerticalStyle({ gap: 28, alignItems: "flex-start" })}>
          <Typography size="20" weight={700} color={COLORS.GRAY3}>
            여행 정보
          </Typography>
          <div
            css={cssAlignHorizontalStyle({
              gap: 8,
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
        </div>
      </Layout.Header>
      <Layout.Content>
        <Outlet />
      </Layout.Content>
      <Layout.FixedFooter>
        <MatchingButton />
        <NavBar />
      </Layout.FixedFooter>
    </Layout>
  );
};
