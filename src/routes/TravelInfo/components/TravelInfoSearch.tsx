import { useCallback, useMemo, useState } from "react";
import { useTravelInfo } from "states/useTravelInfo";
import { getShortAreaName } from "utils/area-utils";

import { useGetAreaCode } from "@/api/hooks/visitKorea";
import { IAriaCode } from "@/api/interfaces/visitKorea";
import { ReactComponent as SelectArrow } from "@/assets/icons/select-arrow.svg";
import { Button, Typography } from "@/components";
import Modal from "@/components/Modal/Modal";
import { cssAlignHorizontalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import {
  cssAreaCodeSelectListStyle,
  cssContentTypeSelectListStyle,
  cssSelectBtnStyle,
} from "../styles/TravelInfoSearch.styles";

export const TravelInfoSearch = () => {
  const { searchValue, setSearchValue } = useTravelInfo();

  const { data: areaCodeData } = useGetAreaCode();

  const [isOpenAreaSelectModal, setIsOpenAreaSelectModal] = useState(false);
  const [isOpenContentTypeSelectModal, setIsOpenContentTypeSelectModal] =
    useState(false);

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
      setIsOpenAreaSelectModal(false);
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
      setIsOpenContentTypeSelectModal(false);
      setSearchValue({
        ...searchValue,
        contentTypeId: selectedContentType.contentTypeId,
        contentTypeIdLabel: selectedContentType.label,
      });
    },
    [searchValue, setSearchValue]
  );

  const handleOnClickSelectBtn = useCallback((type: "area" | "contentType") => {
    if (type === "area") setIsOpenAreaSelectModal(true);
    else setIsOpenContentTypeSelectModal(true);
  }, []);

  return (
    <div
      css={cssAlignHorizontalStyle({
        gap: 4,
      })}
    >
      <button
        css={cssSelectBtnStyle(110)}
        onClick={() => {
          handleOnClickSelectBtn("area");
        }}
      >
        <Typography color={COLORS.GRAY3} weight="bold" size="16">
          {searchValue.areaCodeLabel || "지역 선택"}
        </Typography>
        <SelectArrow
          width={12}
          height={12}
          stroke={COLORS.GRAY3}
          strokeWidth={2}
        />
      </button>
      <button
        css={cssSelectBtnStyle(138)}
        onClick={() => {
          handleOnClickSelectBtn("contentType");
        }}
      >
        <Typography color={COLORS.GRAY3} weight="bold" size="16">
          {searchValue.contentTypeIdLabel || "여행 타입 선택"}
        </Typography>
        <SelectArrow
          width={12}
          height={12}
          stroke={COLORS.GRAY3}
          strokeWidth={2}
        />
      </button>
      <Modal
        isOpen={isOpenAreaSelectModal}
        onClose={() => {
          setIsOpenAreaSelectModal(false);
        }}
        modalType="simple"
        title="지역 선택"
      >
        <div css={cssAreaCodeSelectListStyle}>
          {areaCodeList.map((item) => (
            <Button
              key={item.code}
              onClick={() => handleOnSelectAreaCode(item)}
            >
              <Typography color={COLORS.GRAY5} weight="bold">
                {item.label}
              </Typography>
            </Button>
          ))}
        </div>
      </Modal>
      <Modal
        isOpen={isOpenContentTypeSelectModal}
        onClose={() => {
          setIsOpenContentTypeSelectModal(false);
        }}
        modalType="simple"
        title="여행 타입 선택"
      >
        <div css={cssContentTypeSelectListStyle}>
          {contentTypeIdList.map((item) => (
            <Button
              key={item.contentTypeId}
              onClick={() => handleOnSelectContentType(item)}
            >
              <Typography color={COLORS.GRAY5} weight="bold">
                {item.label}
              </Typography>
            </Button>
          ))}
        </div>
      </Modal>
    </div>
  );
};
