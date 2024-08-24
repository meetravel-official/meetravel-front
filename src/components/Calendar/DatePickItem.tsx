import { Dayjs } from "dayjs";
import { Fragment } from "react";
import { convertDayIntoKoreanDay } from "utils/date-utils";

import { ReactComponent as ArrowRight } from "@/assets/icons/arrow-right-2.svg";
import { COLORS } from "@/styles/color";

import { Typography } from "../Typography/Typography";
import {
  cssDatePickItemContainerStyle,
  cssDatePickItemInnerStyle,
} from "./DatePickItem.styles";
interface DatePickItemProps {
  date: Dayjs | Dayjs[];
  selected?: boolean;
  onSelectDate: (date: [Dayjs, Dayjs]) => void;
}
export const DatePickItem = ({
  date,
  selected,
  onSelectDate,
}: DatePickItemProps) => {
  return (
    <button
      css={cssDatePickItemContainerStyle({
        isSelected: selected || false,
        startDay:
          convertDayIntoKoreanDay(
            Array.isArray(date) ? date[0].day() : date.day()
          ) + 1,
        rangeDay: Array.isArray(date) ? date.length : 1,
      })}
      onClick={(e) => {
        e.preventDefault();
        onSelectDate(
          Array.isArray(date) ? [date[0], date[date.length - 1]] : [date, date]
        );
      }}
    >
      <div css={cssDatePickItemInnerStyle}>
        {Array.isArray(date) ? (
          date.map((d, index) => (
            <Fragment key={d.format("MM-DD")}>
              <Typography
                color={selected ? COLORS.PINK3 : COLORS.GRAY5}
                size="14"
                weight="medium"
              >
                {d.date()}
              </Typography>
              {index < date.length - 1 && <ArrowRight />}
            </Fragment>
          ))
        ) : (
          <Typography
            key={date.format("MM-DD")}
            color={selected ? COLORS.PINK3 : COLORS.GRAY5}
            size="14"
            weight="medium"
          >
            {date.date()}
          </Typography>
        )}
      </div>
    </button>
  );
};
