import { css } from "@emotion/react";

import { ISignUpTravelProfileForm } from "@/api/interfaces/kakaoSignUpInterface";
import { ReactComponent as PlanImpromptuIcon } from "@/assets/icons/plan-impromptu.svg";
import { ReactComponent as PlanPlannedIcon } from "@/assets/icons/plan-planned.svg";
import { ReactComponent as ScheduleRelaxIcon } from "@/assets/icons/schedule-relax.svg";
import { ReactComponent as ScheduleTightIcon } from "@/assets/icons/schedule-tight.svg";
import Form from "@/components/Form/Form";
import { FormItem } from "@/components/Form/FormItem";
import { FormValues } from "@/components/Form/useForm";
import Input from "@/components/Input/Input";
import { checkNotEmpty } from "@/components/Matching/Matching";
import RadioButtonGroup from "@/components/RadioButton/RadioButtonGroup";
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
  const { onChange: onChangeTravelFrequency } =
    registerField("travelFrequency");
  const { onChange: onChangeScheduleType } = registerField("scheduleType");
  const { onChange: onChangePlanningType } = registerField("planningType");

  return (
    <Form formValue={form}>
      <FormItem
        label="1년에 여행은 몇 번정도 가시나요?"
        name="travelFrequency"
        formItemStyle={cssFormItemStyle}
      >
        <RadioButtonGroup
          {...registerField("travelFrequency")}
          defaultValue={
            checkNotEmpty([form.travelFrequency])
              ? form.travelFrequency?.value
              : undefined
          }
          onChange={(e) => {
            onChangeTravelFrequency(e);
          }}
          gridDetailStyle={css`
            width: 100%;
          `}
        >
          <RadioButtonGroup.RadioButton
            value={SIGN_UP_TRAVEL_FREQUENCY_TYPE.NEVER}
            detailStyle={cssRadioButtonStyle(
              form.travelFrequency?.value ===
                SIGN_UP_TRAVEL_FREQUENCY_TYPE.NEVER
            )}
          >
            안 가요!
          </RadioButtonGroup.RadioButton>
          <RadioButtonGroup.RadioButton
            value={SIGN_UP_TRAVEL_FREQUENCY_TYPE.ONE_TO_THREE_TIMES}
            detailStyle={cssRadioButtonStyle(
              form.travelFrequency?.value ===
                SIGN_UP_TRAVEL_FREQUENCY_TYPE.ONE_TO_THREE_TIMES
            )}
          >
            1-3
          </RadioButtonGroup.RadioButton>
          <RadioButtonGroup.RadioButton
            value={SIGN_UP_TRAVEL_FREQUENCY_TYPE.FOUR_TO_SIX_TIMES}
            detailStyle={cssRadioButtonStyle(
              form.travelFrequency?.value ===
                SIGN_UP_TRAVEL_FREQUENCY_TYPE.FOUR_TO_SIX_TIMES
            )}
          >
            4-6
          </RadioButtonGroup.RadioButton>
          <RadioButtonGroup.RadioButton
            value={SIGN_UP_TRAVEL_FREQUENCY_TYPE.MORE_SEVEN_TIMES}
            detailStyle={cssRadioButtonStyle(
              form.travelFrequency?.value ===
                SIGN_UP_TRAVEL_FREQUENCY_TYPE.MORE_SEVEN_TIMES
            )}
          >
            7번 이상
          </RadioButtonGroup.RadioButton>
        </RadioButtonGroup>
      </FormItem>
      <FormItem
        label="여행 취향은 어떻게 되세요?"
        name="travelFrequency"
        formItemStyle={css`
          ${cssFormItemStyle};
          margin-bottom: 16px;
        `}
      >
        <RadioButtonGroup
          {...registerField("travelFrequency")}
          defaultValue={
            checkNotEmpty([form.travelFrequency])
              ? form.travelFrequency?.value
              : undefined
          }
          onChange={(e) => {
            onChangeScheduleType(e);
          }}
          gridDetailStyle={css`
            width: 100%;
          `}
        >
          <RadioButtonGroup.RadioButton
            value={SIGN_UP_SCHEDULE_TYPE.TIGHT}
            detailStyle={cssRadioButtonStyle(
              form.scheduleType?.value === SIGN_UP_SCHEDULE_TYPE.TIGHT
            )}
          >
            <div css={cssAlignHorizontalStyle({ gap: 8 })}>
              <ScheduleTightIcon />
              <span>빠듯하게</span>
            </div>
          </RadioButtonGroup.RadioButton>
          <RadioButtonGroup.RadioButton
            value={SIGN_UP_SCHEDULE_TYPE.RELAX}
            detailStyle={cssRadioButtonStyle(
              form.scheduleType?.value === SIGN_UP_SCHEDULE_TYPE.RELAX
            )}
          >
            <div css={cssAlignHorizontalStyle({ gap: 8 })}>
              <ScheduleRelaxIcon />
              <span>여유롭게</span>
            </div>
          </RadioButtonGroup.RadioButton>
        </RadioButtonGroup>
      </FormItem>
      <FormItem label="" name="planningType" formItemStyle={cssFormItemStyle}>
        <RadioButtonGroup
          {...registerField("planningType")}
          defaultValue={
            checkNotEmpty([form.planningType])
              ? form.planningType?.value
              : undefined
          }
          onChange={(e) => {
            onChangePlanningType(e);
          }}
          gridDetailStyle={css`
            width: 100%;
          `}
        >
          <RadioButtonGroup.RadioButton
            value={SIGN_UP_PLANNING_TYPE.PLANNED}
            detailStyle={cssRadioButtonStyle(
              form.planningType?.value === SIGN_UP_PLANNING_TYPE.PLANNED
            )}
          >
            <div css={cssAlignHorizontalStyle({ gap: 8 })}>
              <PlanPlannedIcon />
              <span>계획적으로</span>
            </div>
          </RadioButtonGroup.RadioButton>
          <RadioButtonGroup.RadioButton
            value={SIGN_UP_PLANNING_TYPE.IMPROMPTU}
            detailStyle={cssRadioButtonStyle(
              form.planningType?.value === SIGN_UP_PLANNING_TYPE.IMPROMPTU
            )}
          >
            <div css={cssAlignHorizontalStyle({ gap: 8 })}>
              <PlanImpromptuIcon />
              <span>즉흥적으로</span>
            </div>
          </RadioButtonGroup.RadioButton>
        </RadioButtonGroup>
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
