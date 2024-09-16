import { dummyTravelInfo } from "dummies/travel";
import { useCallback, useMemo, useState } from "react";
import {
  cssInputFullWidthStyle,
  cssTravelPlanContentTypeBtnBoxStyle,
  cssTravelPlanContentTypeBtnStyle,
  cssTravelPlanDateFormItemStyle,
} from "routes/Chat/styles/TravelPlanModal.styles";

import { IAreaBasedList } from "@/api/interfaces/visitKorea";
import { Typography } from "@/components";
import { ArrowButton } from "@/components/ArrowButton/ArrowButton";
import Input from "@/components/Input/Input";
import RadioButtonGroup from "@/components/RadioButton/RadioButtonGroup";
import { TravelPlaceSelectItem } from "@/components/TravelPlaceSelectItem/TravelPlaceSelectItem";
import { cssAlignHorizontalStyle, cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

interface TravelPlanDateFormItemProps {
  date: string;
  isView: boolean;
}
export const TravelPlanDateFormItem = ({
  isView,
}: TravelPlanDateFormItemProps) => {
  const [selectedContentType, setSelectedContentType] =
    useState<string>("travel");
  const [pageNum, setPageNum] = useState<number>(1);
  const [selectedContentIdList, setSelectedContentIdList] = useState<string[]>(
    []
  );

  const handleOnChangeContentType = useCallback((value: string) => {
    setSelectedContentType(value);
    setPageNum(1);
  }, []);

  const maxPage = useMemo(() => {
    switch (selectedContentType) {
      case "travel":
        return 3;
      case "eat":
        return 2;
      case "sleep":
        return 1;
      default:
        return 3;
    }
  }, [selectedContentType]);

  const handleOnClickPrevPage = useCallback(() => {
    if (pageNum > 1) setPageNum(pageNum - 1);
  }, [pageNum]);

  const handleOnClickNextPage = useCallback(() => {
    if (pageNum < maxPage) setPageNum(pageNum + 1);
  }, [maxPage, pageNum]);

  const handleOnSelectPlace = useCallback(
    (info: IAreaBasedList) => {
      if (info.contentid) {
        if (selectedContentIdList.includes(info.contentid)) {
          const filteredContentIdList = selectedContentIdList.filter(
            (contentId) => contentId !== info.contentid
          );
          setSelectedContentIdList([...filteredContentIdList]);
        } else {
          setSelectedContentIdList([...selectedContentIdList, info.contentid]);
        }
      }
    },
    [selectedContentIdList]
  );

  return (
    <div css={cssTravelPlanDateFormItemStyle(isView)}>
      <div css={cssAlignVerticalStyle({ gap: 8, alignItems: "flex-start" })}>
        <Typography color={COLORS.GRAY3} weight={700} size="16">
          집합 장소는 어디인가요?
        </Typography>
        <Input
          placeholder="집합 장소를 적어주세요"
          detailStyle={cssInputFullWidthStyle}
        />
      </div>
      <div css={cssAlignVerticalStyle({ gap: 8, alignItems: "flex-start" })}>
        <Typography color={COLORS.GRAY3} weight={700} size="16">
          집합 시간은 언제인가요?
        </Typography>
        <Input
          placeholder="집합 시간을 적어주세요"
          detailStyle={cssInputFullWidthStyle}
        />
      </div>
      <div css={cssAlignVerticalStyle({ gap: 12, alignItems: "flex-start" })}>
        <Typography color={COLORS.GRAY3} weight={700} size="16">
          앞으로 함께 할 장소를 결정해요!
        </Typography>
        <div css={cssAlignVerticalStyle({ gap: 16 })}>
          <RadioButtonGroup
            gridDetailStyle={cssTravelPlanContentTypeBtnBoxStyle}
            defaultValue={selectedContentType}
            onChange={handleOnChangeContentType}
          >
            <RadioButtonGroup.RadioButton
              detailStyle={cssTravelPlanContentTypeBtnStyle}
              value="travel"
            >
              관광
            </RadioButtonGroup.RadioButton>
            <RadioButtonGroup.RadioButton
              detailStyle={cssTravelPlanContentTypeBtnStyle}
              value="eat"
            >
              식사
            </RadioButtonGroup.RadioButton>
            <RadioButtonGroup.RadioButton
              detailStyle={cssTravelPlanContentTypeBtnStyle}
              value="sleep"
            >
              숙박
            </RadioButtonGroup.RadioButton>
          </RadioButtonGroup>
          <div css={cssAlignVerticalStyle({ gap: 16 })}>
            <div css={cssAlignVerticalStyle({ gap: 8 })}>
              <TravelPlaceSelectItem
                travelInfo={dummyTravelInfo}
                selected={selectedContentIdList.includes(
                  dummyTravelInfo.contentid
                )}
                onSelect={handleOnSelectPlace}
              />
            </div>
            <div css={cssAlignHorizontalStyle({ gap: 39 })}>
              <ArrowButton
                direction="left"
                onClick={handleOnClickPrevPage}
                disabled={pageNum === 1}
              />
              <div>
                <Typography color={COLORS.GRAY4} weight={700} size="20">
                  {pageNum}{" "}
                </Typography>
                <Typography color={COLORS.GRAY3} weight={700} size="20">
                  / {maxPage}
                </Typography>
              </div>
              <ArrowButton
                direction="right"
                onClick={handleOnClickNextPage}
                disabled={pageNum === maxPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
