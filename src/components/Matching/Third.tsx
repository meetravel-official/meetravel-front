import { css } from "@emotion/react";
import { Fragment } from "react";

import { COLORS } from "@/styles/color";

import { FormItem } from "../Form/FormItem";
import RadioButtonGroup from "../RadioButton/RadioButtonGroup";
import { Typography } from "../Typography/Typography";

const Third = ({ registerField }: { registerField: any }) => {
  const { onChange } = registerField("genderRatio");
  return (
    <Fragment>
      <FormItem
        label="성별 비율은 어떻게 진행할까요?"
        labelStyle={css`
          font-size: 16px;
          font-weight: 400;
          line-height: 20.39px;
        `}
        name="genderRatio"
      >
        <RadioButtonGroup
          {...registerField("genderRatio")}
          // defaultValue={radioValue}
          onChange={(e) => {
            console.log(e);
            onChange(e);
          }}
          buttonDetailStyle={css`
            font-size: 16px;
            font-weight: 400;
            line-height: 20.39px;
            width: 100%;
            height: 48px;
          `}
          gridDetailStyle={css`
            width: 100%;
          `}
        >
          <RadioButtonGroup.RadioButton value="diff">
            이성끼리
          </RadioButtonGroup.RadioButton>
          <RadioButtonGroup.RadioButton value="same">
            동성끼리
          </RadioButtonGroup.RadioButton>
        </RadioButtonGroup>
      </FormItem>
      <div
        css={css`
          width: 100%;
          position: absolute;
          bottom: 86px;
          text-align: center;
          transform: translate(-16px, 0px);
        `}
      >
        <Typography size={12} align="center" color={COLORS.GRAY3}>
          *여행은 4인 이상이 모인 후 시작되며,
          <br /> 매칭 취소는 신청 후 하루 뒤부터 가능해요.
        </Typography>
      </div>
    </Fragment>
  );
};
export default Third;
