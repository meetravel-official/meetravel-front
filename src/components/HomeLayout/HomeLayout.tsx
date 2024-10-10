import { useCallback, useMemo } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSearch } from "states/useSearch";
import { getShortAreaName } from "utils/area-utils";

import { useGetAreaCode } from "@/api/hooks/visitKorea";
import { SortType } from "@/api/interfaces/chat";
import { IAriaCode } from "@/api/interfaces/visitKorea";
import { ReactComponent as Back } from "@/assets/icons/back.svg";
import { pageRoutes } from "@/routes";
import { cssAlignHorizontalStyle, cssAlignVerticalStyle } from "@/styles/align";
import { cssDefaultBtnStyle } from "@/styles/button";
import { COLORS } from "@/styles/color";

import { Layout } from "../Layout/Layout";
import MatchingButton from "../Matching/Matching";
import { NavBar } from "../NavBar/NavBar";
import { SearchInput } from "../SearchInput/SearchInput";
import { SelectByModal } from "../SelectByModal/SelectByModal";
import {
  cssAreaCodeListStyle,
  cssHomeHeaderLinkBoxStyle,
  cssHomeHeaderLinkStyle,
  cssHomeHeaderStyle,
} from "./HomeLayout.styles";

export const HomeLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { searchValue, setSearchValue } = useSearch();

  const { data: areaCodeData } = useGetAreaCode();

  const isSearchMode = useMemo(() => {
    return location.pathname.includes(pageRoutes.SEARCH);
  }, [location.pathname]);

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

  const sortList: { code: SortType; label: string }[] = useMemo(() => {
    return [
      {
        code: "CREATED_LATEST",
        label: "최신순",
      },
      {
        code: "QUICK_LATEST",
        label: "빠른 출발 순",
      },
    ];
  }, []);

  const handleOnSelectArea = useCallback(
    (selectedArea: { code: string; label: string }) => {
      setSearchValue({
        ...searchValue,
        areaCode: selectedArea.code,
      });
    },
    [searchValue, setSearchValue]
  );

  const handleOnSelectSort = useCallback(
    (selectedOrder: { code: SortType; label: string }) => {
      setSearchValue({
        ...searchValue,
        sort: selectedOrder.code,
      });
    },
    [searchValue, setSearchValue]
  );

  const handleOnClickSearchQuery = useCallback(
    (inputValue?: string) => {
      setSearchValue({
        ...searchValue,
        query: inputValue,
      });
    },
    [searchValue, setSearchValue]
  );

  const handleOnClickBack = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <Layout.Header css={cssHomeHeaderStyle}>
        {isSearchMode ? (
          <div
            css={cssAlignVerticalStyle({ gap: 28, alignItems: "flex-start" })}
          >
            <div css={cssAlignHorizontalStyle({ gap: 16, width: "100%" })}>
              <button css={cssDefaultBtnStyle} onClick={handleOnClickBack}>
                <Back />
              </button>
              <SearchInput
                placeholder="어디로 떠나고 싶으세요?"
                value={searchValue.query}
                onClickSearch={handleOnClickSearchQuery}
              />
            </div>
            <div css={cssAlignHorizontalStyle({ gap: 8 })}>
              <SelectByModal
                value={
                  areaCodeList.filter(
                    (item) => item.code === searchValue?.areaCode
                  )?.[0]?.label
                }
                placeholder="지역 선택"
                options={areaCodeList}
                width={106}
                onSelect={handleOnSelectArea}
                optionListStyle={cssAreaCodeListStyle}
              />
              <SelectByModal
                value={
                  sortList.filter(
                    (item) => item.code === searchValue?.sort
                  )?.[0]?.label
                }
                placeholder="인기순"
                options={sortList}
                width={100}
                onSelect={handleOnSelectSort}
              />
            </div>
          </div>
        ) : (
          <div css={cssHomeHeaderLinkBoxStyle}>
            <Link css={cssHomeHeaderLinkStyle} to={pageRoutes.SEARCH} />
            <SearchInput
              placeholder="어디로 여행을 떠날까요?"
              placeholderColor={COLORS.PINK1}
              borderColor={COLORS.PINK3}
              disabled
            />
          </div>
        )}
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
