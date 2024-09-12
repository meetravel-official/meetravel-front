import dayjs, { Dayjs } from "dayjs";
import { useCallback, useMemo, useState } from "react";
import {
  getDayListOfMonth,
  getFirstDayOfMonth,
  getLastDayOfMonth,
} from "utils/date-utils";

import { ReactComponent as ArrowLeft } from "@/assets/icons/arrow-left.svg";
import { ReactComponent as ArrowRight } from "@/assets/icons/arrow-right.svg";
import { COLORS } from "@/styles/color";

import { Typography } from "../Typography/Typography";
import {
  cssCalendarContainerStyle,
  cssCalendarControlBtnStyle,
  cssCalendarControlStyle,
  cssCalendarInputStyle,
  cssCalendarStyle,
} from "./Calendar.styles";
import { DatePicker } from "./DatePicker";
import { RangePicker } from "./RangePicker";

interface CalendarProps {
  defaultDate?: string;
  tripDayNum: 1 | 2 | 3;
  formItemName?: [string, string];
  registerField?: any;
}

/**
 * 캘린더 - 여행할 기간을 선택할 수 있는 컴포넌트
 * @param defaultDate - 기본 연월(YYYY-MM)
 * @param tripDayNum - 여행 일수(당일치기 - 1, 1박 2일 - 2, 2박 3일 - 3)
 * @param formItemName - input name(기본값: ["beginDate", "endDate"])
 */
export const Calendar = ({
  defaultDate,
  tripDayNum,
  formItemName = ["beginDate", "endDate"],
  registerField,
}: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(
    defaultDate || dayjs().format("YYYY-MM")
  );
  const { onChange: onChangeStart } = registerField("startDate");
  const { onChange: onChangeEnd } = registerField("endDate");

  const [selectDate, setSelectDate] = useState<[Dayjs, Dayjs]>();

  const availableDayRange: [number, number] =
    tripDayNum === 1 || tripDayNum === 2 ? [5, 6] : [4, 6];

  /** 기준 월을 이용해서 "YYYY-MM" 형식의 새로운 월을 계산*/
  const getMonthByDist = (month: string, dist: number) => {
    return dayjs(month, "YYYY-MM").add(dist, "month").format("YYYY-MM");
  };

  const dayListOfCurrent = getDayListOfMonth(currentMonth);

  const dayListOfPrevious = getDayListOfMonth(getMonthByDist(currentMonth, -1));

  const dayListOfNext = getDayListOfMonth(getMonthByDist(currentMonth, 1));

  const allDayList = useMemo(() => {
    let dayList: Dayjs[] = [];
    if (getFirstDayOfMonth(currentMonth) > 0) {
      dayList = [
        ...dayListOfPrevious.slice(
          dayListOfPrevious.length - getFirstDayOfMonth(currentMonth)
        ),
      ];
    }
    dayList = [...dayList, ...dayListOfCurrent];
    if (getLastDayOfMonth(currentMonth) < 6) {
      dayList = [
        ...dayList,
        ...dayListOfNext.slice(0, 6 - getLastDayOfMonth(currentMonth)),
      ];
    }
    return dayList;
  }, [currentMonth, dayListOfCurrent, dayListOfNext, dayListOfPrevious]);

  const handleOnChangeMonth = useCallback((month: string, dist: number) => {
    setCurrentMonth(getMonthByDist(month, dist));
  }, []);

  const handleOnSelectDate = useCallback(
    (date: [Dayjs, Dayjs]) => {
      setSelectDate(date);
      if (registerField) {
      document
        .getElementsByName(formItemName[0])[0]
        .setAttribute("value", date[0].format("YYYY-MM-DD"));
      document
        .getElementsByName(formItemName[1])[0]
        .setAttribute("value", date[1].format("YYYY-MM-DD"));

        onChangeStart(date[0].format("YYYY-MM-DD"));
        onChangeEnd(date[1].format("YYYY-MM-DD"));
      }
    },
    [formItemName, onChangeEnd, onChangeStart, registerField]
  );

  return (
    <div css={cssCalendarContainerStyle}>
      <div css={cssCalendarInputStyle}>
        {registerField && (
          <Fragment>
            <input
              type="date"
              name={formItemName[0]}
              {...registerField(`${formItemName[0]}`)}
            />
            <input
              type="date"
              name={formItemName[1]}
              {...registerField(`${formItemName[1]}`)}
            />
          </Fragment>
        )}
      </div>
      <div css={cssCalendarControlStyle}>
        <button
          css={cssCalendarControlBtnStyle}
          onClick={(e) => {
            e.preventDefault();
            handleOnChangeMonth(currentMonth, -1);
          }}
        >
          <ArrowLeft stroke={COLORS.GRAY4} strokeWidth={2} />
        </button>
        <Typography color={COLORS.GRAY5} size="24" weight="medium">
          {dayjs(currentMonth).format("YYYY년 MM월")}
        </Typography>
        <button
          css={cssCalendarControlBtnStyle}
          onClick={(e) => {
            e.preventDefault();
            handleOnChangeMonth(currentMonth, 1);
          }}
        >
          <ArrowRight />
        </button>
      </div>
      <div css={cssCalendarStyle}>
        {["월", "화", "수", "목", "금", "토", "일"].map((day, index) => (
          <Typography
            key={day}
            size="14"
            color={
              index >= availableDayRange[0] && index <= availableDayRange[1]
                ? COLORS.GRAY4
                : COLORS.GRAY2
            }
            weight="medium"
          >
            {day}
          </Typography>
        ))}

        {tripDayNum === 1 ? (
          <DatePicker
            currentMonth={currentMonth}
            dateList={allDayList}
            selectDate={selectDate}
            onSelectDate={handleOnSelectDate}
            availableDayRange={availableDayRange}
          />
        ) : (
          <RangePicker
            currentMonth={currentMonth}
            dateList={allDayList}
            selectDate={selectDate}
            onSelectDate={handleOnSelectDate}
            availableDayRange={availableDayRange}
          />
        )}
      </div>
    </div>
  );
};
