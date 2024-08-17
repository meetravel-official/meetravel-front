import { Dayjs } from "dayjs";
import { Fragment } from "react";
import { convertDayIntoKoreanDay } from "utils/date-utils";

import { COLORS } from "@/styles/color";

import { Typography } from "../Typography/Typography";
import { DatePickItem } from "./DatePickItem";

interface DatePickerProps {
  currentMonth: string;
  dateList: Dayjs[];
  selectDate: [Dayjs, Dayjs];
  availableDayRange: [number, number];
  onSelectDate: (date: [Dayjs, Dayjs]) => void;
}

export const DatePicker = ({
  currentMonth,
  dateList,
  selectDate,
  availableDayRange,
  onSelectDate,
}: DatePickerProps) => {
  const isAvailableDay = (day: Dayjs) => {
    return (
      convertDayIntoKoreanDay(day.day()) >= availableDayRange[0] &&
      convertDayIntoKoreanDay(day.day()) <= availableDayRange[1] &&
      day.format("YYYY-MM") === currentMonth
    );
  };

  return (
    <Fragment>
      {dateList.map((date) =>
        isAvailableDay(date) ? (
          <DatePickItem
            key={date.format("MM-DD")}
            date={date}
            selected={selectDate[0].isSame(date)}
            onSelectDate={onSelectDate}
          />
        ) : (
          <Typography
            key={date.format("MM-DD")}
            size="14"
            color={
              date.format("YYYY-MM") === currentMonth
                ? COLORS.GRAY4
                : COLORS.GRAY2
            }
            weight="medium"
          >
            {date.date()}
          </Typography>
        )
      )}
    </Fragment>
  );
};
