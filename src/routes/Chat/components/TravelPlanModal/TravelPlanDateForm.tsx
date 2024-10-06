import dayjs from "dayjs";
import { useCallback, useMemo } from "react";
import {
  cssDateSelectBoxStyle,
  cssNextDateStyle,
  cssPreviousDateStyle,
  cssSelectedDateStyle,
} from "routes/Chat/styles/TravelPlanModal.styles";
import { useTravelPlan } from "states/useTravelPlan";

import { Typography } from "@/components";
import { ArrowButton } from "@/components/ArrowButton/ArrowButton";
import { cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import { TravelPlanDateFormItem } from "./TravelPlanDateFormItem";

export const TravelPlanDateForm = () => {
  const { dailyPlans, selectedDateIndex, setSelectedDateIndex } =
    useTravelPlan();

  const travelDateList = useMemo(() => {
    return dailyPlans.map((dailyPlan) => dailyPlan.planDate);
  }, [dailyPlans]);

  const convertDateString = (date: string) => {
    return dayjs(date, "YYYY-MM-DD").format("MM월 DD일");
  };

  const handleOnSelectPrevDate = useCallback(() => {
    if (selectedDateIndex > 0) setSelectedDateIndex(selectedDateIndex - 1);
  }, [selectedDateIndex, setSelectedDateIndex]);

  const handleOnSelectNextDate = useCallback(() => {
    if (selectedDateIndex < travelDateList.length - 1)
      setSelectedDateIndex(selectedDateIndex + 1);
  }, [selectedDateIndex, travelDateList.length, setSelectedDateIndex]);

  return (
    <div css={cssAlignVerticalStyle({ gap: 20, alignItems: "flex-start" })}>
      <div css={cssDateSelectBoxStyle}>
        <ArrowButton
          direction="left"
          onClick={handleOnSelectPrevDate}
          disabled={selectedDateIndex === 0}
        />
        {selectedDateIndex > 0 && (
          <Typography
            color={COLORS.GRAY2}
            weight={700}
            size={"16"}
            detailStyle={cssPreviousDateStyle}
          >
            {convertDateString(travelDateList[selectedDateIndex - 1])}
          </Typography>
        )}
        <Typography
          color={COLORS.GRAY4}
          weight={700}
          size={"24"}
          detailStyle={cssSelectedDateStyle}
        >
          {convertDateString(travelDateList[selectedDateIndex])}
        </Typography>
        {selectedDateIndex < travelDateList.length - 1 && (
          <Typography
            color={COLORS.GRAY2}
            weight={700}
            size={"16"}
            detailStyle={cssNextDateStyle}
          >
            {convertDateString(travelDateList[selectedDateIndex + 1])}
          </Typography>
        )}
        <ArrowButton
          direction="right"
          onClick={handleOnSelectNextDate}
          disabled={selectedDateIndex === travelDateList.length - 1}
        />
      </div>
      {travelDateList.map((date, index) => (
        <TravelPlanDateFormItem
          key={index}
          date={date}
          isView={index === selectedDateIndex}
        />
      ))}
    </div>
  );
};
