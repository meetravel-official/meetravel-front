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
import Input from "@/components/Input/Input";
import { Pagination } from "@/components/Pagination/Pagination";
import RadioButtonGroup from "@/components/RadioButton/RadioButtonGroup";
import { TravelPlaceSelectItem } from "@/components/TravelPlaceSelectItem/TravelPlaceSelectItem";
import { cssAlignVerticalStyle } from "@/styles/align";
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
  const [pageNum, setPageNum] = useState<number>(0);
  const [selectedContentIdList, setSelectedContentIdList] = useState<string[]>(
    []
  );

  const handleOnChangeContentType = useCallback((value: string) => {
    setSelectedContentType(value);
    setPageNum(0);
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
          placeholder="처음 모일 땐 개방적인 곳을 추천해요."
          detailStyle={cssInputFullWidthStyle}
        />
      </div>
      <div css={cssAlignVerticalStyle({ gap: 8, alignItems: "flex-start" })}>
        <Typography color={COLORS.GRAY3} weight={700} size="16">
          집합 시간은 언제인가요?
        </Typography>
        <Input
          placeholder="사람들과 충분한 대화 후 결정해요."
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
            <Pagination page={pageNum} maxPage={maxPage} setPage={setPageNum} />
          </div>
        </div>
      </div>
    </div>
  );
};
