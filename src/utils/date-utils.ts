import dayjs, { Dayjs } from "dayjs";

/** 월요일은 0, 일요일은 6으로 변환하여 반환 */
export const convertDayIntoKoreanDay = (day: number) => {
  if (day - 1 < 0) return 6;
  return day - 1;
};

/** 해당 월의 전체 일수 반환 */
export const getDayNumOfMonth = (month: string) => {
  return dayjs(month, "YYYY-MM").daysInMonth();
};

/** 해당 월의 첫날의 요일 반환(한국 기준) */
export const getFirstDayOfMonth = (month: string) => {
  return convertDayIntoKoreanDay(
    dayjs(month, "YYYY-MM").startOf("month").day()
  );
};

/** 해당 월의 끝날의 요일 반환(한국 기준) */
export const getLastDayOfMonth = (month: string) => {
  return convertDayIntoKoreanDay(dayjs(month, "YYYY-MM").endOf("month").day());
};

/** 해당 월의 모든 날짜 리스트 반환*/
export const getDayListOfMonth = (month: string) => {
  const dayList: Dayjs[] = [];
  const daysNum = getDayNumOfMonth(month);

  for (let i = 0; i < daysNum; i++) {
    dayList.push(dayjs(month, "YYYY-MM").add(i, "days"));
  }

  return dayList;
};
