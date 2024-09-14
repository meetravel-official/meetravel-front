import { css } from "@emotion/react";
import { Fragment } from "react";

import { COLORS } from "@/styles/color";

import CheckButtonGroup from "../CheckButton/CheckButtonGroup";
import { FormItem } from "../Form/FormItem";
import RadioButtonGroup from "../RadioButton/RadioButtonGroup";
import TagKeyword, { tagKeywordList } from "../TagKeyword/TagKeyword";
import { Typography } from "../Typography/Typography";
import { checkNotEmpty } from "./Matching";

const Third = ({ form, registerField }: { form: any; registerField: any }) => {
  const { onChange: onChangeGenderRatio } = registerField("genderRatio");
  const { onChange: onChangeTagKeyword } = registerField("keyword");

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
          defaultValue={
            checkNotEmpty([form.genderRatio])
              ? form.genderRatio.value
              : undefined
          }
          onChange={(e) => {
            console.log(e);
            onChangeGenderRatio(e);
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
      <FormItem
        label="원하는 여행 스타일을 골라주세요. (3개 선택)"
        labelStyle={css`
          font-size: 16px;
          font-weight: 400;
          line-height: 20.39px;
        `}
        name="keyword"
      >
        <CheckButtonGroup
          {...registerField("keyword")}
          buttonDetailStyle={css``}
          gridDetailStyle={css`
            all: unset;
            display: flex;
            flex-wrap: wrap;
            gap: 8px 4px;
          `}
          maxSelect={3}
          onChange={(e) => {
            onChangeTagKeyword(e);
          }}
        >
          {tagKeywordList.map((tag) => (
            <CheckButtonGroup.CheckTag
              value={tag}
              key={tag}
              icon={<TagKeyword keyword={tag} returnType="icon" />}
            >
              {tag}
            </CheckButtonGroup.CheckTag>
          ))}
        </CheckButtonGroup>
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
