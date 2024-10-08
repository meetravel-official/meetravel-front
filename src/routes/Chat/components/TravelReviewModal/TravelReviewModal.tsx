import { dummyTravelPlace } from "dummies/travel";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ChatStatus, IChatData } from "@/api/interfaces/chat";
import { TravelPlace } from "@/api/interfaces/travel";
import { ReactComponent as CheckIcon } from "@/assets/icons/check-circle.svg";
import { ReactComponent as ExclamationIcon } from "@/assets/icons/exclamation-circle.svg";
import { Button, Typography } from "@/components";
import BorderModal from "@/components/BorderModal/BorderModal";
import ChatItem from "@/components/Chat/ChatItem";
import Modal from "@/components/Modal/Modal";
import { TravelPlaceSelectItem } from "@/components/TravelPlaceSelectItem/TravelPlaceSelectItem";
import { cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import {
  cssModalFooterStyle,
  cssTravelReviewModalDetailStyle,
} from "../../styles/TravelReviewModal.styles";

interface TravelReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  chatData?: IChatData;
}
export const TravelReviewModal = ({
  isOpen,
  onClose,
  chatData,
}: //TODO: 여행 장소들, 여행 평가 데이터 추가 필요
TravelReviewModalProps) => {
  const navigate = useNavigate();

  const travelPlaceList: TravelPlace[] = [dummyTravelPlace];

  const [selectedContentIdList, setSelectedContentIdList] = useState<string[]>(
    []
  ); //TODO: 여행 평가 API 연결
  const [isOpenCancelModal, setIsOpenCancelModal] = useState(false);
  const [isOpenFinishModal, setIsOpenFinishModal] = useState(false);

  const isEnableReview = chatData?.status === ChatStatus.REVIEW;

  const contentTypeList = [
    {
      label: "관광",
      contenttypeid: "12",
    },
    {
      label: "식당",
      contenttypeid: "39",
    },
    {
      label: "숙박",
      contenttypeid: "32",
    },
  ];

  const handleOnHeartTravelPlace = useCallback(
    (travelPlace: TravelPlace) => {
      if (travelPlace.placeId)
        if (selectedContentIdList.includes(travelPlace.placeId)) {
          const filteredList = selectedContentIdList.filter(
            (id) => id !== travelPlace.placeId
          );
          setSelectedContentIdList([...filteredList]);
        } else {
          setSelectedContentIdList([
            ...selectedContentIdList,
            travelPlace.placeId,
          ]);
        }
    },
    [selectedContentIdList]
  );

  const handleOnCloseReviewModal = useCallback(() => {
    setSelectedContentIdList([]);
    setIsOpenCancelModal(false);
    setIsOpenFinishModal(false);
    onClose();
  }, [onClose]);

  const handleOnClickCloseReviewModal = useCallback(() => {
    navigate(-1);
    handleOnCloseReviewModal();
  }, [handleOnCloseReviewModal, navigate]);

  const handleOnCloseCancelModal = useCallback(() => {
    setIsOpenCancelModal(false);
  }, []);

  const handleOnCloseFinishModal = useCallback(() => {
    setIsOpenFinishModal(false);
  }, []);

  const handleOnConfirmCloseReviewModal = useCallback(() => {
    if (isEnableReview) setIsOpenCancelModal(true);
    else {
      handleOnClickCloseReviewModal();
    }
  }, [handleOnClickCloseReviewModal, isEnableReview]);

  const handleOnFinishReview = useCallback(() => {
    setIsOpenFinishModal(true);
  }, []);

  const handleOnLinkChatRoom = useCallback(() => {
    if (chatData?.link) {
      handleOnClickCloseReviewModal();
      navigate(chatData?.link);
    }
  }, [chatData?.link, handleOnClickCloseReviewModal, navigate]);

  useEffect(() => {
    if (isOpen) {
      navigate("", {
        state: { isModal: true },
      });
    }
  }, [isOpen, navigate]);

  useEffect(() => {
    window.addEventListener("popstate", () => {
      handleOnCloseReviewModal();
    });
    return () => {
      window.removeEventListener("popstate", () => {
        handleOnCloseReviewModal();
      });
    };
  }, [handleOnCloseReviewModal]);

  return (
    <Fragment>
      <BorderModal
        title={
          <Typography size="24" color={COLORS.GRAY3} weight={700}>
            여행 후기
          </Typography>
        }
        modalType="full"
        isOpen={isOpen}
        onClose={handleOnConfirmCloseReviewModal}
        footer={
          isEnableReview && (
            <div css={cssModalFooterStyle}>
              <Button
                bgColor={COLORS.PINK3}
                height="large"
                onClick={handleOnFinishReview}
              >
                <Typography color={COLORS.WHITE} size="16" weight={700}>
                  완료
                </Typography>
              </Button>
            </div>
          )
        }
        modalDetailStyle={cssTravelReviewModalDetailStyle}
      >
        <div
          css={cssAlignVerticalStyle({
            gap: 28,
          })}
        >
          <div css={cssAlignVerticalStyle({ gap: 24 })}>
            {chatData && <ChatItem chatData={chatData} />}
            <Typography color={COLORS.GRAY4} weight={700} size="16">
              {isEnableReview
                ? "해당 여행에서 즐겼던 장소들은 어떠셨나요?"
                : "해당 여행에서 즐겼던 장소들이에요."}
            </Typography>
          </div>
          <div css={cssAlignVerticalStyle({ gap: 16 })}>
            {contentTypeList.map((item) => (
              <div
                key={item.label}
                css={cssAlignVerticalStyle({
                  gap: 8,
                  alignItems: "flex-start",
                })}
              >
                <Typography color={COLORS.GRAY3} weight={700} size="16">
                  {item.label}
                </Typography>
                <div css={cssAlignVerticalStyle({ gap: 8 })}>
                  {travelPlaceList
                    .filter(
                      (travelPlace) =>
                        travelPlace.placeType === item.contenttypeid
                    )
                    .map((travelPlace) => (
                      <TravelPlaceSelectItem
                        key={travelPlace.placeId}
                        travelPlace={travelPlace}
                        selected={travelPlace.isPicked}
                        onSelect={handleOnHeartTravelPlace}
                        disabled={!isEnableReview}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </BorderModal>
      <Modal
        zIndex={100}
        modalType="simple"
        isOpen={isOpenCancelModal}
        onClose={handleOnCloseCancelModal}
        closableIcon={false}
        footer={
          <Fragment>
            <Modal.Button
              bgColor={COLORS.PINK3}
              color={COLORS.WHITE}
              onClick={handleOnCloseCancelModal}
            >
              <Typography color={COLORS.WHITE} size="16" weight={700}>
                안 나갈래요!
              </Typography>
            </Modal.Button>
            <Modal.Button
              bgColor={COLORS.GRAY1}
              color={COLORS.GRAY3}
              onClick={handleOnClickCloseReviewModal}
            >
              <Typography color={COLORS.GRAY3} size="16" weight={700}>
                나갈래요.
              </Typography>
            </Modal.Button>
          </Fragment>
        }
      >
        <div css={cssAlignVerticalStyle({ gap: 12 })}>
          <ExclamationIcon width={50} height={50} />
          <Typography color={COLORS.GRAY4} weight={700} size="16">
            여행 후기 작성을 종료하시겠어요?
          </Typography>
          <Typography color={COLORS.GRAY3} weight={400} size="12">
            *현재까지 작성된 내용은 저장되지 않으며,
            <br />
            추후 [채팅방 목록]에서 다시 작성할 수 있어요.
          </Typography>
        </div>
      </Modal>
      <Modal
        zIndex={100}
        modalType="normal"
        isOpen={isOpenFinishModal}
        onClose={handleOnCloseFinishModal}
        closableIcon={false}
        footer={
          <Fragment>
            <Modal.Button bgColor={COLORS.PINK3} onClick={handleOnLinkChatRoom}>
              <Typography color={COLORS.WHITE} size="16" weight={700}>
                보고 싶어요!
              </Typography>
            </Modal.Button>
            <Modal.Button
              bgColor={COLORS.GRAY1}
              color={COLORS.GRAY3}
              onClick={handleOnClickCloseReviewModal}
            >
              <Typography color={COLORS.GRAY3} size="16" weight={700}>
                괜찮아요.
              </Typography>
            </Modal.Button>
          </Fragment>
        }
      >
        <div css={cssAlignVerticalStyle({ gap: 12 })}>
          <CheckIcon width={50} height={50} />
          <Typography
            color={COLORS.GRAY4}
            weight={700}
            size="16"
            align="center"
          >
            여행 후기 작성이 완료됐어요!
            <br />
            해당 여행의 채팅방으로 이동할까요?
          </Typography>
          <Typography color={COLORS.GRAY3} weight={400} size="12">
            *해당 채팅방의 과거 채팅방으로 이동해요.
            <br />
            채팅은 불가하지만 기록을 확인할 수 있어요.
          </Typography>
        </div>
      </Modal>
    </Fragment>
  );
};
