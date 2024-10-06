import { css } from "@emotion/react";
import { useEffect } from "react";
import { useTravelPlan } from "states/useTravelPlan";

import { useGetTravelPlan } from "@/api/hooks/travel";
import { Button, Typography } from "@/components";
import BorderModal from "@/components/BorderModal/BorderModal";
import CheckButtonGroup from "@/components/CheckButton/CheckButtonGroup";
import { FormItem } from "@/components/Form/FormItem";
import TagKeyword, { tagKeywordList } from "@/components/TagKeyword/TagKeyword";
import { cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import { TravelPlanDateForm } from "./TravelPlanDateForm";

interface TravelPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  chatRoomId?: string | null;
}

export const TravelPlanModal = ({
  isOpen,
  onClose,
  chatRoomId,
}: TravelPlanModalProps) => {
  const chatRoomIdNum = chatRoomId ? parseInt(chatRoomId) : undefined;

  const { data, refetch } = useGetTravelPlan(chatRoomIdNum);

  const { travelKeyword, setTravelKeyword, setDailyPlans } = useTravelPlan();

  useEffect(() => {
    if (data) {
      setTravelKeyword(data.travelKeywords);
      setDailyPlans(data.dailyPlans);
    }
  }, [data, setDailyPlans, setTravelKeyword]);

  useEffect(() => {
    if (chatRoomIdNum && isOpen) refetch();
  }, [chatRoomIdNum, isOpen, refetch]);

  const handleOnSubmit = () => {
    console.log(travelKeyword);
  };

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
        <div css={cssAlignVerticalStyle({ gap: 32 })}>
          <FormItem name="keyword" label="이번 여행의 테마는">
            <CheckButtonGroup
              gridDetailStyle={css`
                all: unset;
                display: flex;
                flex-wrap: wrap;
                gap: 8px 4px;
              `}
              maxSelect={3}
              value={travelKeyword}
              onChange={setTravelKeyword}
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
          <TravelPlanDateForm />
        </div>
        <div css={cssAlignVerticalStyle({ gap: 16 })}>
          <Typography size="12" color={COLORS.GRAY3}>
            *장소 확정은 최대 한 항목당 2개까지만 가능해요.
          </Typography>
          <Button
            bgColor={COLORS.PINK3}
            color={COLORS.WHITE}
            height="large"
            onClick={handleOnSubmit}
          >
            <Typography color={COLORS.WHITE} weight={700} size="16">
              저장
            </Typography>
          </Button>
        </div>
      </div>
    </BorderModal>
  );
};
