import { css } from "@emotion/react";

import { ISignUpTravelProfileForm } from "@/api/interfaces/kakaoSignUpInterface";
import { ReactComponent as PlanImpromptuIcon } from "@/assets/icons/plan-impromptu.svg";
import { ReactComponent as PlanPlannedIcon } from "@/assets/icons/plan-planned.svg";
import { ReactComponent as ScheduleRelaxIcon } from "@/assets/icons/schedule-relax.svg";
import { ReactComponent as ScheduleTightIcon } from "@/assets/icons/schedule-tight.svg";
import CheckButtonGroup from "@/components/CheckButton/CheckButtonGroup";
import Form from "@/components/Form/Form";
import { FormItem } from "@/components/Form/FormItem";
import { FormValues } from "@/components/Form/useForm";
import Input from "@/components/Input/Input";
import {
  SIGN_UP_PLANNING_TYPE,
  SIGN_UP_SCHEDULE_TYPE,
  SIGN_UP_TRAVEL_FREQUENCY_TYPE,
} from "@/constants/signUp";
import { cssAlignHorizontalStyle } from "@/styles/align";

import {
  cssFormItemStyle,
  cssRadioButtonStyle,
} from "../styles/SignUpInnerContents.styles";

interface TravelProfileFormProps {
  form: FormValues<ISignUpTravelProfileForm>;
  registerField: (key: keyof ISignUpTravelProfileForm) => {
    value?: string;
    onChange: (e: any) => void;
    error: string | undefined;
  };
}

export const TravelProfileForm = ({
  form,
  registerField,
}: TravelProfileFormProps) => {
  const handleOnCheckChange = (
    e: string[],
    type: "travelFrequency" | "scheduleType" | "planningType"
  ) => {
    const lastSelect = e?.[e.length - 1];
    if (lastSelect === form?.[type]?.value) {
      registerField(type).onChange("");
      return;
    }
    registerField(type).onChange(lastSelect || "");
  };

  return (
    <Form formValue={form}>
      <FormItem
        label="1년에 여행은 몇 번정도 가시나요?"
        name="travelFrequency"
        formItemStyle={cssFormItemStyle}
      >
        <CheckButtonGroup
          {...registerField("travelFrequency")}
          onChange={(e) => handleOnCheckChange(e, "travelFrequency")}
          gridDetailStyle={css`
            width: 100%;
          `}
        >
          <CheckButtonGroup.CheckboxButton
            value={SIGN_UP_TRAVEL_FREQUENCY_TYPE.NEVER}
            detailStyle={cssRadioButtonStyle(
              form.travelFrequency?.value ===
                SIGN_UP_TRAVEL_FREQUENCY_TYPE.NEVER
            )}
          >
            안 가요!
          </CheckButtonGroup.CheckboxButton>
          <CheckButtonGroup.CheckboxButton
            value={SIGN_UP_TRAVEL_FREQUENCY_TYPE.ONE_TO_THREE_TIMES}
            detailStyle={cssRadioButtonStyle(
              form.travelFrequency?.value ===
                SIGN_UP_TRAVEL_FREQUENCY_TYPE.ONE_TO_THREE_TIMES
            )}
          >
            1-3
          </CheckButtonGroup.CheckboxButton>
          <CheckButtonGroup.CheckboxButton
            value={SIGN_UP_TRAVEL_FREQUENCY_TYPE.FOUR_TO_SIX_TIMES}
            detailStyle={cssRadioButtonStyle(
              form.travelFrequency?.value ===
                SIGN_UP_TRAVEL_FREQUENCY_TYPE.FOUR_TO_SIX_TIMES
            )}
          >
            4-6
          </CheckButtonGroup.CheckboxButton>
          <CheckButtonGroup.CheckboxButton
            value={SIGN_UP_TRAVEL_FREQUENCY_TYPE.MORE_SEVEN_TIMES}
            detailStyle={cssRadioButtonStyle(
              form.travelFrequency?.value ===
                SIGN_UP_TRAVEL_FREQUENCY_TYPE.MORE_SEVEN_TIMES
            )}
          >
            7번 이상
          </CheckButtonGroup.CheckboxButton>
        </CheckButtonGroup>
      </FormItem>
      <FormItem
        label="여행 취향은 어떻게 되세요?"
        name="scheduleType"
        formItemStyle={css`
          ${cssFormItemStyle};
          margin-bottom: 16px;
        `}
      >
        <CheckButtonGroup
          {...registerField("scheduleType")}
          onChange={(e) => handleOnCheckChange(e, "scheduleType")}
          gridDetailStyle={css`
            width: 100%;
          `}
        >
          <CheckButtonGroup.CheckboxButton
            value={SIGN_UP_SCHEDULE_TYPE.TIGHT}
            detailStyle={cssRadioButtonStyle(
              form.scheduleType?.value === SIGN_UP_SCHEDULE_TYPE.TIGHT
            )}
          >
            <div css={cssAlignHorizontalStyle({ gap: 8 })}>
              <ScheduleTightIcon />
              <span>빠듯하게</span>
            </div>
          </CheckButtonGroup.CheckboxButton>
          <CheckButtonGroup.CheckboxButton
            value={SIGN_UP_SCHEDULE_TYPE.RELAX}
            detailStyle={cssRadioButtonStyle(
              form.scheduleType?.value === SIGN_UP_SCHEDULE_TYPE.RELAX
            )}
          >
            <div css={cssAlignHorizontalStyle({ gap: 8 })}>
              <ScheduleRelaxIcon />
              <span>여유롭게</span>
            </div>
          </CheckButtonGroup.CheckboxButton>
        </CheckButtonGroup>
      </FormItem>
      <FormItem label="" name="planningType" formItemStyle={cssFormItemStyle}>
        <CheckButtonGroup
          {...registerField("planningType")}
          onChange={(e) => handleOnCheckChange(e, "planningType")}
          gridDetailStyle={css`
            width: 100%;
          `}
        >
          <CheckButtonGroup.CheckboxButton
            value={SIGN_UP_PLANNING_TYPE.PLANNED}
            detailStyle={cssRadioButtonStyle(
              form.planningType?.value === SIGN_UP_PLANNING_TYPE.PLANNED
            )}
          >
            <div css={cssAlignHorizontalStyle({ gap: 8 })}>
              <PlanPlannedIcon />
              <span>계획적으로</span>
            </div>
          </CheckButtonGroup.CheckboxButton>
          <CheckButtonGroup.CheckboxButton
            value={SIGN_UP_PLANNING_TYPE.IMPROMPTU}
            detailStyle={cssRadioButtonStyle(
              form.planningType?.value === SIGN_UP_PLANNING_TYPE.IMPROMPTU
            )}
          >
            <div css={cssAlignHorizontalStyle({ gap: 8 })}>
              <PlanImpromptuIcon />
              <span>즉흥적으로</span>
            </div>
          </CheckButtonGroup.CheckboxButton>
        </CheckButtonGroup>
      </FormItem>
      <FormItem label="취미" name="hobby" formItemStyle={cssFormItemStyle}>
        <Input
          {...registerField("hobby")}
          type="text"
          placeholder="취미를 적어주세요."
          detailStyle={css`
            width: 100%;
          `}
        />
      </FormItem>
      <FormItem
        label="MBTI"
        name="mbti"
        formItemStyle={cssFormItemStyle}
        errorStyle={{ display: "block" }}
      >
        <Input
          {...registerField("mbti")}
          type="text"
          placeholder="MBTI는 어떻게 되시나요?"
          detailStyle={css`
            width: 100%;
          `}
        />
      </FormItem>
      <FormItem
        label="한 줄 자기 소개"
        name="intro"
        formItemStyle={cssFormItemStyle}
      >
        <Input
          {...registerField("intro")}
          type="text"
          placeholder="본인을 한 줄로 표현한다면?"
          detailStyle={css`
            width: 100%;
          `}
        />
      </FormItem>
    </Form>
  );
};
