// import { css } from "@emotion/react";
import { Dayjs } from "dayjs";
import { Fragment, useCallback, useMemo } from "react";
import { convertDayIntoKoreanDay } from "utils/date-utils";

import { COLORS } from "@/styles/color";

import { Typography } from "../Typography/Typography";
import { DatePickItem } from "./DatePickItem";

interface RangePickerProps {
  currentMonth: string;
  dateList: Dayjs[];
  availableDayRange: [number, number];
  selectDate: [Dayjs, Dayjs];
  onSelectDate: (date: [Dayjs, Dayjs]) => void;
}

export const RangePicker = ({
  currentMonth,
  dateList,
  selectDate,
  availableDayRange,
  onSelectDate,
}: RangePickerProps) => {
  const isAvailableDay = useCallback(
    (day: Dayjs) => {
      return (
        convertDayIntoKoreanDay(day.day()) >= availableDayRange[0] &&
        convertDayIntoKoreanDay(day.day()) <= availableDayRange[1]
      );
    },
    [availableDayRange]
  );

  const convertDateList = useCallback(
    (originList: (Dayjs | Dayjs[])[], availableDateList: Dayjs[]) => {
      if (availableDateList.length > 0) {
        if (
          availableDateList.some(
            (date) => date.format("YYYY-MM") === currentMonth
          )
        ) {
          return [...originList, availableDateList];
        } else {
          return [...originList, ...availableDateList];
        }
      }
      return originList;
    },
    [currentMonth]
  );

  const wrapAvailableDateList = useMemo(() => {
    let newDateList: (Dayjs | Dayjs[])[] = [];
    let availableDateList: Dayjs[] = [];

    for (let i = 0; i < dateList.length; i++) {
      if (isAvailableDay(dateList[i])) {
        availableDateList.push(dateList[i]);
      } else {
        newDateList = convertDateList(newDateList, availableDateList);
        availableDateList = [];
        newDateList.push(dateList[i]);
      }
    }
    newDateList = convertDateList(newDateList, availableDateList);
    return newDateList;
  }, [convertDateList, dateList, isAvailableDay]);

  return (
    <Fragment>
      {wrapAvailableDateList.map((date: Dayjs | Dayjs[]) =>
        Array.isArray(date) ? (
          <DatePickItem
            key={date[0].format("MM-DD")}
            date={date}
            selected={selectDate[0].isSame(date[0])}
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
