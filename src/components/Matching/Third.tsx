import { css } from "@emotion/react";

import { FormItem } from "../Form/FormItem";
import RadioButtonGroup from "../RadioButton/RadioButtonGroup";

const Third = () => {
  return (
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
        // defaultValue={radioValue}
        onChange={(e) => {
          console.log(e);
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
        <RadioButtonGroup.RadioButton value="a">
          이성끼리
        </RadioButtonGroup.RadioButton>
        <RadioButtonGroup.RadioButton value="b">
          동성끼리
        </RadioButtonGroup.RadioButton>
      </RadioButtonGroup>
    </FormItem>
  );
};
export default Third;
