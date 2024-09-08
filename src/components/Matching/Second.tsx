import { css } from "@emotion/react";
import { useMemo } from "react";

import { COLORS } from "@/styles/color";

import RadioButtonGroup from "../RadioButton/RadioButtonGroup";
import { Typography } from "../Typography/Typography";

const Second = () => {
  const renderRadioButtonGroups = useMemo(() => {
    const radioButtonGroups = [];

    for (let i = 0; i < 20; i++) {
      radioButtonGroups.push(
        <RadioButtonGroup.RadioButton value={`option${i}`}>
          옵션값 {i}
        </RadioButtonGroup.RadioButton>
      );
    }

    return radioButtonGroups;
  }, []);
  return (
    <div>
      <div
        css={css`
          display: flex;
          flex-direction: row;
        `}
      >
        {/* 대분류 들어가야함 */}
        <RadioButtonGroup
          gridType="row"
          buttonDetailStyle={css`
            width: 104px;
            height: 40px;
            font-weight: 400;
            font-size: 14px;
          `}
        >
          <RadioButtonGroup.RadioButton value="all">
            대분류 전체
          </RadioButtonGroup.RadioButton>
          {renderRadioButtonGroups}
        </RadioButtonGroup>
        <div
          css={css`
            height: auto;
            border: 1px solid ${COLORS.GRAY1};
            margin: 0px 16px;
          `}
        />
        <div
          css={css`
            width: 100%;
          `}
        >
          {/* 소분류 들어가야함 */}
          <Typography
            size={12}
            color={COLORS.GRAY3}
            detailStyle={css`
              display: block;
              margin-bottom: 16px;
            `}
          >
            *상세 지역은 꼭 고르지 않아도 괜찮아요!
          </Typography>
          <RadioButtonGroup
            gridType="row"
            buttonDetailStyle={css`
              width: 100%;
              height: 40px;
              font-weight: 400;
              font-size: 14px;
            `}
            gridDetailStyle={css`
              width: 100%;
            `}
          >
            <RadioButtonGroup.RadioButton value="all">
              소분류 전체
            </RadioButtonGroup.RadioButton>
            {renderRadioButtonGroups}
          </RadioButtonGroup>
        </div>
      </div>
    </div>
  );
};
export default Second;
