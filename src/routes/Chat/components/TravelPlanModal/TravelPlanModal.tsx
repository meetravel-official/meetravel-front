import { css } from "@emotion/react";
import { useEffect } from "react";

import { ITravelPlan } from "@/api/interfaces/travelPlan";
import { Button, Typography } from "@/components";
import BorderModal from "@/components/BorderModal/BorderModal";
import CheckButtonGroup from "@/components/CheckButton/CheckButtonGroup";
import Form from "@/components/Form/Form";
import { FormItem } from "@/components/Form/FormItem";
import useForm from "@/components/Form/useForm";
import TagKeyword, { tagKeywordList } from "@/components/TagKeyword/TagKeyword";
import { cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import { TravelPlanDateForm } from "./TravelPlanDateForm";

interface TravelPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  matchingInfo: {
    travelStartDate: string;
    travelEndDate: string;
    keyword?: string[];
  };
}

export const TravelPlanModal = ({
  isOpen,
  onClose,
  matchingInfo,
}: TravelPlanModalProps) => {
  const { form, registerField, invalidFields, setFields } =
    useForm<ITravelPlan>({
      initialValues: {
        keyword: matchingInfo.keyword || [],
        travelPlan: [],
      },
    });

  useEffect(() => {
    setFields(matchingInfo);
  }, [matchingInfo, setFields]);

  return (
    <BorderModal
      modalType="full"
      isOpen={isOpen}
      onClose={onClose}
      title={
        <Typography size="20" color={COLORS.GRAY3} weight={700}>
          여행 계획서
        </Typography>
      }
    >
      <div css={cssAlignVerticalStyle({ gap: 48 })}>
        <Form
          formValue={form}
          onSubmit={() => {
            invalidFields(({ errors, value }) => {
              if (errors) {
                console.log("error in if", errors);
              } else {
                console.log("error in else", value);
              }
            });
          }}
          formStyle={css`
            display: flex;
            flex-direction: column;
            gap: 32px;
          `}
        >
          <FormItem name="keyword" label="이번 여행의 테마는">
            <CheckButtonGroup
              {...registerField<"keyword">("keyword")}
              gridDetailStyle={css`
                all: unset;
                display: flex;
                flex-wrap: wrap;
                gap: 8px 4px;
              `}
              maxSelect={3}
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
          <TravelPlanDateForm matchingInfo={matchingInfo} />
        </Form>
        <div css={cssAlignVerticalStyle({ gap: 16 })}>
          <Typography size="12" color={COLORS.GRAY3}>
            *장소 확정은 최대 한 항목당 2개까지만 가능해요.
          </Typography>
          <Button bgColor={COLORS.PINK3} color={COLORS.WHITE} height="large">
            <Typography color={COLORS.WHITE} weight={700} size="16">
              저장
            </Typography>
          </Button>
        </div>
      </div>
    </BorderModal>
  );
};
