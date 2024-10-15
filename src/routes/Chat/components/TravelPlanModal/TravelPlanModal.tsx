import { css } from "@emotion/react";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTravelPlan } from "states/useTravelPlan";

import {
  useGetTravelPlan,
  usePutTravelPlanDaily,
  usePutTravelPlanKeywords,
} from "@/api/hooks/travel";
import { Button, Typography } from "@/components";
import BorderModal from "@/components/BorderModal/BorderModal";
import CheckButtonGroup from "@/components/CheckButton/CheckButtonGroup";
import { FormItem } from "@/components/Form/FormItem";
import NotFound from "@/components/NotFound/NotFound";
import { Spin } from "@/components/Spin/Spin";
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
  const navigate = useNavigate();

  const chatRoomIdNum = chatRoomId ? parseInt(chatRoomId) : undefined;

  const { data, refetch, isLoading, isRefetching, error } =
    useGetTravelPlan(chatRoomIdNum);
  const { mutateAsync: mutateAsyncKeywords, isPending: isPendingKeyword } =
    usePutTravelPlanKeywords(chatRoomIdNum);
  const { mutateAsync: mutateAsyncDaily, isPending: isPendingDaily } =
    usePutTravelPlanDaily(chatRoomIdNum);

  const {
    travelKeyword,
    dailyPlans,
    setSelectedDateIndex,
    setTravelKeyword,
    setDailyPlans,
  } = useTravelPlan();

  const handleOnClose = useCallback(() => {
    setSelectedDateIndex(0);
    onClose();
  }, [onClose, setSelectedDateIndex]);

  const handleOnClickClose = useCallback(() => {
    handleOnClose();
    navigate(-1);
  }, [handleOnClose, navigate]);

  const handleOnSubmit = useCallback(async () => {
    try {
      await mutateAsyncKeywords(travelKeyword);
      await mutateAsyncDaily(
        dailyPlans.map((plan) => ({
          ...plan,
          pickedTravelPlaceIds: plan.travelPlaces
            .filter((place) => place.isPicked)
            .map((place) => place.placeId),
        }))
      );
      toast.success("저장되었습니다.");
      handleOnClickClose();
    } catch (error) {
      toast.error(
        (error as any).response.data?.message || "잠시 후 시도해주세요"
      );
    }
  }, [
    dailyPlans,
    mutateAsyncDaily,
    mutateAsyncKeywords,
    handleOnClickClose,
    travelKeyword,
  ]);

  useEffect(() => {
    if (data) {
      setTravelKeyword(data.travelKeywords);
      setDailyPlans(data.dailyPlans);
    } else {
      setTravelKeyword([]);
      setDailyPlans([]);
    }
  }, [data, setDailyPlans, setTravelKeyword]);

  useEffect(() => {
    if (chatRoomIdNum && isOpen) refetch();
  }, [chatRoomIdNum, isOpen, refetch]);

  useEffect(() => {
    if (isOpen)
      navigate("", {
        state: { isModal: true },
      });
  }, [navigate, isOpen]);

  useEffect(() => {
    window.addEventListener("popstate", () => {
      handleOnClose();
    });
    return () => {
      window.removeEventListener("popstate", () => {
        handleOnClose();
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BorderModal
      modalType="full"
      isOpen={isOpen}
      onClose={handleOnClickClose}
      title={
        <Typography size="20" color={COLORS.GRAY3} weight={700}>
          여행 계획서
        </Typography>
      }
    >
      {isLoading || isRefetching ? (
        <div
          css={cssAlignVerticalStyle({
            alignItems: "center",
            justifyContent: "center",
          })}
        >
          <Spin size={36} />
        </div>
      ) : error ? (
        <NotFound
          mainText="잘못된 요청"
          subText={
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (error.response?.data as any)?.message || "잠시 후 시도해주세요."
          }
          detailStyle={css`
            margin-top: 100px;
          `}
        />
      ) : (
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
              loading={isPendingKeyword || isPendingDaily}
            >
              <Typography color={COLORS.WHITE} weight={700} size="16">
                저장
              </Typography>
            </Button>
          </div>
        </div>
      )}
    </BorderModal>
  );
};
