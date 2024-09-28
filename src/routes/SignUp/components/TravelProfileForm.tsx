import { css } from "@emotion/react";

import { ISignUpTravelProfileForm } from "@/api/interfaces/kakaoSignUpInterface";
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
import { cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import { cssAgreetoTermsStyle } from "../styles/SignUpInnerContents.styles";

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
    <div
      css={css`
        ${cssAlignVerticalStyle({
          justifyContent: "space-between",
          alignItems: "space-between",
        })}
        ${cssAgreetoTermsStyle}
      `}
    >
      <Form formValue={form}>
        <FormItem
          label="1년에 여행은 몇 번정도 가시나요?"
          labelStyle={css`
            font-size: 16px;
            font-weight: 400;
            line-height: 20.39px;
          `}
          name="travelFrequency"
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
              detailStyle={css`
                font-size: 16px;
                font-weight: 400;
                line-height: 20.39px;
                width: 100%;
                height: 48px;
                background-color: ${form.travelFrequency?.value !==
                SIGN_UP_TRAVEL_FREQUENCY_TYPE.NEVER
                  ? COLORS.GRAY2
                  : ""};
              `}
            >
              안 가요!
            </RadioButtonGroup.RadioButton>
            <RadioButtonGroup.RadioButton
              value={SIGN_UP_TRAVEL_FREQUENCY_TYPE.ONE_TO_THREE_TIMES}
              detailStyle={css`
                font-size: 16px;
                font-weight: 400;
                line-height: 20.39px;
                width: 100%;
                height: 48px;
                background-color: ${form.travelFrequency?.value !==
                SIGN_UP_TRAVEL_FREQUENCY_TYPE.ONE_TO_THREE_TIMES
                  ? COLORS.GRAY2
                  : ""};
              `}
            >
              1-3
            </RadioButtonGroup.RadioButton>
            <RadioButtonGroup.RadioButton
              value={SIGN_UP_TRAVEL_FREQUENCY_TYPE.FOUR_TO_SIX_TIMES}
              detailStyle={css`
                font-size: 16px;
                font-weight: 400;
                line-height: 20.39px;
                width: 100%;
                height: 48px;
                background-color: ${form.travelFrequency?.value !==
                SIGN_UP_TRAVEL_FREQUENCY_TYPE.FOUR_TO_SIX_TIMES
                  ? COLORS.GRAY2
                  : ""};
              `}
            >
              4-6
            </RadioButtonGroup.RadioButton>
            <RadioButtonGroup.RadioButton
              value={SIGN_UP_TRAVEL_FREQUENCY_TYPE.MORE_SEVEN_TIMES}
              detailStyle={css`
                font-size: 16px;
                font-weight: 400;
                line-height: 20.39px;
                width: 100%;
                height: 48px;
                background-color: ${form.travelFrequency?.value !==
                SIGN_UP_TRAVEL_FREQUENCY_TYPE.MORE_SEVEN_TIMES
                  ? COLORS.GRAY2
                  : ""};
              `}
            >
              7번 이상
            </RadioButtonGroup.RadioButton>
          </RadioButtonGroup>
        </FormItem>
        <FormItem
          label="여행 취향은 어떻게 되세요?"
          labelStyle={css`
            font-size: 16px;
            font-weight: 400;
            line-height: 20.39px;
          `}
          name="travelFrequency"
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
              detailStyle={css`
                font-size: 16px;
                font-weight: 400;
                line-height: 20.39px;
                width: 100%;
                height: 48px;
                background-color: ${form.scheduleType?.value ===
                SIGN_UP_SCHEDULE_TYPE.RELAX
                  ? COLORS.GRAY2
                  : ""};
              `}
            >
              빠듯하게
            </RadioButtonGroup.RadioButton>
            <RadioButtonGroup.RadioButton
              value={SIGN_UP_SCHEDULE_TYPE.RELAX}
              detailStyle={css`
                font-size: 16px;
                font-weight: 400;
                line-height: 20.39px;
                width: 100%;
                height: 48px;
                background-color: ${form.scheduleType?.value ===
                SIGN_UP_SCHEDULE_TYPE.TIGHT
                  ? COLORS.GRAY2
                  : ""};
              `}
            >
              여유롭게
            </RadioButtonGroup.RadioButton>
          </RadioButtonGroup>
        </FormItem>
        <FormItem
          label=""
          labelStyle={css`
            font-size: 16px;
            font-weight: 400;
            line-height: 20.39px;
          `}
          name="planningType"
        >
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
              detailStyle={css`
                font-size: 16px;
                font-weight: 400;
                line-height: 20.39px;
                width: 100%;
                height: 48px;
                background-color: ${form.planningType?.value ==
                SIGN_UP_PLANNING_TYPE.IMPROMPTU
                  ? COLORS.GRAY2
                  : ""};
              `}
            >
              계획적으로
            </RadioButtonGroup.RadioButton>
            <RadioButtonGroup.RadioButton
              value={SIGN_UP_PLANNING_TYPE.IMPROMPTU}
              detailStyle={css`
                font-size: 16px;
                font-weight: 400;
                line-height: 20.39px;
                width: 100%;
                height: 48px;
                background-color: ${form.planningType?.value ==
                SIGN_UP_PLANNING_TYPE.PLANNED
                  ? COLORS.GRAY2
                  : ""};
              `}
            >
              즉흥적으로
            </RadioButtonGroup.RadioButton>
          </RadioButtonGroup>
        </FormItem>
        <FormItem label="취미" name="hobby">
          <Input
            {...registerField("hobby")}
            type="text"
            placeholder="취미를 적어주세요."
            detailStyle={css`
              width: 100%;
            `}
          />
        </FormItem>
        <FormItem label="MBTI" name="mbti">
          <Input
            {...registerField("mbti")}
            type="text"
            placeholder="MBTI는 어떻게 되시나요?"
            detailStyle={css`
              width: 100%;
            `}
          />
        </FormItem>
        <FormItem label="한 줄 자기 소개" name="intro">
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
    </div>
  );
};
