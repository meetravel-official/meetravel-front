import { useCallback, useMemo, useState } from "react";
import {
  cssInputFullWidthStyle,
  cssTravelPlaceItemEmptyStyle,
  cssTravelPlanContentTypeBtnBoxStyle,
  cssTravelPlanContentTypeBtnStyle,
  cssTravelPlanDateFormItemStyle,
} from "routes/Chat/styles/TravelPlanModal.styles";
import { useTravelPlan } from "states/useTravelPlan";

import { TravelPlace } from "@/api/interfaces/travel";
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
  date,
  isView,
}: TravelPlanDateFormItemProps) => {
  const { dailyPlans, setDailyPlan } = useTravelPlan();

  const [selectedPlaceType, setSelectedPlaceType] = useState<string>("관광");

  const pageSize = 3;
  const [pageNum, setPageNum] = useState<number>(0);

  const dailyPlan = useMemo(() => {
    return dailyPlans.filter((dailyPlan) => dailyPlan.planDate === date)[0];
  }, [dailyPlans, date]);

  const dailyTravelPlacesByPlaceType = useMemo(() => {
    return dailyPlan?.travelPlaces.filter(
      (place) => place.placeType === selectedPlaceType
    );
  }, [dailyPlan, selectedPlaceType]);

  const travelPlaceByPage = useMemo(() => {
    return dailyTravelPlacesByPlaceType?.slice(
      pageNum * pageSize,
      pageNum * pageSize + pageSize
    );
  }, [dailyTravelPlacesByPlaceType, pageNum]);

  const maxPage = useMemo(() => {
    return Math.ceil((dailyTravelPlacesByPlaceType?.length || 0) / pageSize);
  }, [dailyTravelPlacesByPlaceType]);

  const handleOnChangePlaceType = useCallback((value: string) => {
    setSelectedPlaceType(value);
    setPageNum(0);
  }, []);

  const handleOnChangeInput = useCallback(
    (key: "meetPlace" | "meetTime", value: string) => {
      if (dailyPlan) {
        const newDailyPlan = dailyPlan;
        newDailyPlan[key] = value;
        setDailyPlan({ ...newDailyPlan });
      }
    },
    [dailyPlan, setDailyPlan]
  );

  const handleOnSelectPlace = useCallback(
    (travelPlace: TravelPlace) => {
      if (dailyPlan) {
        const newDailyPlan = dailyPlan;
        const newTravelPlace = dailyPlan.travelPlaces;
        const changeIndex = newTravelPlace.findIndex(
          (place) => place.placeId === travelPlace.placeId
        );
        if (travelPlace.isPicked) {
          newTravelPlace[changeIndex] = { ...travelPlace, isPicked: false };
        } else {
          newTravelPlace[changeIndex] = { ...travelPlace, isPicked: true };
        }
        newDailyPlan.travelPlaces = newTravelPlace;
        setDailyPlan({ ...newDailyPlan });
      }
    },

    [dailyPlan, setDailyPlan]
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
          value={dailyPlan?.meetPlace}
          onChange={(e) => handleOnChangeInput("meetPlace", e.target.value)}
        />
      </div>
      <div css={cssAlignVerticalStyle({ gap: 8, alignItems: "flex-start" })}>
        <Typography color={COLORS.GRAY3} weight={700} size="16">
          집합 시간은 언제인가요?
        </Typography>
        <Input
          placeholder="사람들과 충분한 대화 후 결정해요."
          detailStyle={cssInputFullWidthStyle}
          value={dailyPlan?.meetTime}
          onChange={(e) => handleOnChangeInput("meetTime", e.target.value)}
        />
      </div>
      <div css={cssAlignVerticalStyle({ gap: 12, alignItems: "flex-start" })}>
        <Typography color={COLORS.GRAY3} weight={700} size="16">
          앞으로 함께 할 장소를 결정해요!
        </Typography>
        <div css={cssAlignVerticalStyle({ gap: 16 })}>
          <RadioButtonGroup
            gridDetailStyle={cssTravelPlanContentTypeBtnBoxStyle}
            defaultValue={selectedPlaceType}
            onChange={handleOnChangePlaceType}
          >
            <RadioButtonGroup.RadioButton
              detailStyle={cssTravelPlanContentTypeBtnStyle}
              value="관광"
            >
              관광
            </RadioButtonGroup.RadioButton>
            <RadioButtonGroup.RadioButton
              detailStyle={cssTravelPlanContentTypeBtnStyle}
              value="식당"
            >
              식당
            </RadioButtonGroup.RadioButton>
            <RadioButtonGroup.RadioButton
              detailStyle={cssTravelPlanContentTypeBtnStyle}
              value="숙박"
            >
              숙박
            </RadioButtonGroup.RadioButton>
          </RadioButtonGroup>
          {dailyTravelPlacesByPlaceType?.length === 0 ? (
            <div css={cssTravelPlaceItemEmptyStyle}>
              <Typography size="16" weight="bold" color={COLORS.GRAY4}>
                아직 공유된 여행 정보가 없어요!
              </Typography>
              <Typography size="12" color={COLORS.GRAY3}>
                여행 정보 탭에서 마음에 드는 장소를 공유해주세요.
              </Typography>
            </div>
          ) : (
            <div css={cssAlignVerticalStyle({ gap: 16 })}>
              <div css={cssAlignVerticalStyle({ gap: 8 })}>
                {travelPlaceByPage?.map((place) => (
                  <TravelPlaceSelectItem
                    key={place.placeId}
                    travelPlace={place}
                    selected={place.isPicked}
                    onSelect={handleOnSelectPlace}
                  />
                ))}
              </div>
              <Pagination
                page={pageNum}
                maxPage={maxPage}
                setPage={setPageNum}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
