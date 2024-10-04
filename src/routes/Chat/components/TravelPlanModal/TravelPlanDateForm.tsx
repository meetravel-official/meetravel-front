import dayjs from "dayjs";
import { useCallback, useMemo, useState } from "react";
import {
  cssDateSelectBoxStyle,
  cssNextDateStyle,
  cssPreviousDateStyle,
  cssSelectedDateStyle,
} from "routes/Chat/styles/TravelPlanModal.styles";

import { Typography } from "@/components";
import { ArrowButton } from "@/components/ArrowButton/ArrowButton";
import { cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import { TravelPlanDateFormItem } from "./TravelPlanDateFormItem";

interface TravelPlanDateFormProps {
  matchingInfo: {
    travelStartDate: string;
    travelEndDate: string;
    keyword?: string[];
  };
}
export const TravelPlanDateForm = ({
  matchingInfo,
}: TravelPlanDateFormProps) => {
  const [selectedDateIndex, setSelectedDateIndex] = useState<number>(0);

  const travelDateList = useMemo(() => {
    const startDate = dayjs(matchingInfo.travelStartDate, "YYYY-MM-DD");
    const endDate = dayjs(matchingInfo.travelEndDate, "YYYY-MM-DD");
    const dateList = [];
    for (let i = 0; i <= endDate.diff(startDate, "day"); i++) {
      dateList.push(startDate.add(i, "days"));
    }
    return dateList;
  }, [matchingInfo]);

  const handleOnSelectPrevDate = useCallback(() => {
    if (selectedDateIndex > 0) setSelectedDateIndex(selectedDateIndex - 1);
  }, [selectedDateIndex]);

  const handleOnSelectNextDate = useCallback(() => {
    if (selectedDateIndex < travelDateList.length - 1)
      setSelectedDateIndex(selectedDateIndex + 1);
  }, [travelDateList, selectedDateIndex]);

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
            {travelDateList[selectedDateIndex - 1].format("MM월 DD일")}
          </Typography>
        )}
        <Typography
          color={COLORS.GRAY4}
          weight={700}
          size={"24"}
          detailStyle={cssSelectedDateStyle}
        >
          {travelDateList[selectedDateIndex].format("MM월 DD일")}
        </Typography>
        {selectedDateIndex < travelDateList.length - 1 && (
          <Typography
            color={COLORS.GRAY2}
            weight={700}
            size={"16"}
            detailStyle={cssNextDateStyle}
          >
            {travelDateList[selectedDateIndex + 1].format("MM월 DD일")}
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
          date={date.format("YYYY-MM-DD")}
          isView={index === selectedDateIndex}
        />
      ))}
    </div>
  );
};
