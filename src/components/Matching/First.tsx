import { css } from "@emotion/react";
import { useEffect, useState } from "react";

import { COLORS } from "@/styles/color";

import { Calendar } from "../Calendar/Calendar";
import RadioButtonGroup from "../RadioButton/RadioButtonGroup";
import { Typography } from "../Typography/Typography";
import { checkNotEmpty } from "./Matching";
const First = ({ form, registerField }: { form: any; registerField: any }) => {
  const { onChange } = registerField("duration");
  const [radioValue, setRadioValue] = useState<1 | 2 | 3>(1);

  return (
    <div>
      <div>
        <Typography
          color={COLORS.GRAY3}
          weight="bold"
          size="16"
          detailStyle={css`
            display: block;
            margin-bottom: 8px;
          `}
        >
          기간
        </Typography>
        <RadioButtonGroup
          {...registerField("duration")}
          defaultValue={
            checkNotEmpty([form.duration]) ? form.duration.value : undefined
          }
          gridType="column"
          onChange={(e) => {
            console.log("e", e);
            setRadioValue(Number(e) as 1 | 2 | 3); //radioValue onChange
            onChange(e); //formValue onChange
          }}
        >
          <RadioButtonGroup.RadioButton value="1">
            당일 치기
            <br />
            <span
              css={css`
                font-size: 14px;
                font-weight: 400;
              `}
            >
              (토/일)
            </span>
          </RadioButtonGroup.RadioButton>
          <RadioButtonGroup.RadioButton value="2">
            1박 2일
            <br />
            <span
              css={css`
                font-size: 14px;
                font-weight: 400;
              `}
            >
              (토~일)
            </span>
          </RadioButtonGroup.RadioButton>
          <RadioButtonGroup.RadioButton value="3">
            2박 3일
            <br />
            <span
              css={css`
                font-size: 14px;
                font-weight: 400;
              `}
            >
              (금~일)
            </span>
          </RadioButtonGroup.RadioButton>
        </RadioButtonGroup>
        <Typography
          color={COLORS.GRAY3}
          weight="bold"
          size="16"
          detailStyle={css`
            display: block;
            margin-top: 28px;
            margin-bottom: 4px;
          `}
        >
          여행주차 선택
        </Typography>
        <Typography
          color={COLORS.GRAY3}
          size="14"
          detailStyle={css`
            display: block;
            margin-bottom: 25px;
          `}
        >
          여행을 떠날 주차를 선택해봐요.
        </Typography>
        <input {...registerField("startDate")} type="hidden" />
        <input {...registerField("endDate")} type="hidden" />
        <Calendar
          initialDate={[
            checkNotEmpty([form.startDate]) ? form.startDate.value : undefined,
            checkNotEmpty([form.endDate]) ? form.endDate.value : undefined,
          ]}
          tripDayNum={radioValue}
          formItemName={["startDate", "endDate"]}
          registerField={registerField}
        />
      </div>
    </div>
  );
};
export default First;
