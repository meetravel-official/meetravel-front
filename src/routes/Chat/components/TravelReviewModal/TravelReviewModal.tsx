import { css } from "@emotion/react";
import { dummyTravelInfo } from "dummies/travel";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { IAreaBasedList } from "@/api/interfaces/visitKorea";
import { ReactComponent as CheckIcon } from "@/assets/icons/check-circle.svg";
import { ReactComponent as ExclamationIcon } from "@/assets/icons/exclamation-circle.svg";
import { Button, Typography } from "@/components";
import BorderModal from "@/components/BorderModal/BorderModal";
import ChatItem, { IChatData } from "@/components/Chat/ChatItem";
import Modal from "@/components/Modal/Modal";
import { TravelPlaceSelectItem } from "@/components/TravelPlaceSelectItem/TravelPlaceSelectItem";
import { cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import { cssModalFooterStyle } from "../../styles/TravelReviewModal.styles";

interface TravelReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  chatData?: IChatData;
}
export const TravelReviewModal = ({
  isOpen,
  onClose,
  chatData,
}: TravelReviewModalProps) => {
  const navigate = useNavigate();

  const travelPlaceList: IAreaBasedList[] = [
    {
      ...dummyTravelInfo,
      contentid: "1",
      contenttypeid: "12",
    },
    {
      ...dummyTravelInfo,
      contentid: "2",
      contenttypeid: "39",
    },
    {
      ...dummyTravelInfo,
      contentid: "3",
      contenttypeid: "39",
    },
    {
      ...dummyTravelInfo,
      contentid: "4",
      contenttypeid: "32",
    },
    {
      ...dummyTravelInfo,
      contentid: "1",
      contenttypeid: "12",
    },
    {
      ...dummyTravelInfo,
      contentid: "2",
      contenttypeid: "39",
    },
    {
      ...dummyTravelInfo,
      contentid: "3",
      contenttypeid: "39",
    },
    {
      ...dummyTravelInfo,
      contentid: "4",
      contenttypeid: "32",
    },
    {
      ...dummyTravelInfo,
      contentid: "1",
      contenttypeid: "12",
    },
    {
      ...dummyTravelInfo,
      contentid: "2",
      contenttypeid: "39",
    },
    {
      ...dummyTravelInfo,
      contentid: "3",
      contenttypeid: "39",
    },
    {
      ...dummyTravelInfo,
      contentid: "4",
      contenttypeid: "32",
    },
  ];

  const [selectedContentIdList, setSelectedContentIdList] = useState<string[]>(
    []
  );
  const [isOpenCancelModal, setIsOpenCancelModal] = useState(false);
  const [isOpenFinishModal, setIsOpenFinishModal] = useState(false);

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
    (travelPlace: IAreaBasedList) => {
      if (travelPlace.contentid)
        if (selectedContentIdList.includes(travelPlace.contentid)) {
          const filteredList = selectedContentIdList.filter(
            (id) => id !== travelPlace.contentid
          );
          setSelectedContentIdList([...filteredList]);
        } else {
          setSelectedContentIdList([
            ...selectedContentIdList,
            travelPlace.contentid,
          ]);
        }
    },
    [selectedContentIdList]
  );

  const handleOnCloseReviewModal = useCallback(() => {
    setIsOpenCancelModal(false);
    setIsOpenFinishModal(false);
    onClose();
  }, [onClose]);

  const handleOnCloseCancelModal = useCallback(() => {
    setIsOpenCancelModal(false);
  }, []);

  const handleOnCloseFinishModal = useCallback(() => {
    setIsOpenFinishModal(false);
  }, []);

  const handleOnConfirmCloseReviewModal = useCallback(() => {
    setIsOpenCancelModal(true);
  }, []);

  const handleOnFinishReview = useCallback(() => {
    setIsOpenFinishModal(true);
  }, []);

  const handleOnLinkChatRoom = useCallback(() => {
    if (chatData?.link) {
      handleOnCloseReviewModal();
      navigate(chatData?.link);
    }
  }, [chatData?.link, handleOnCloseReviewModal, navigate]);

  useEffect(() => {
    navigate("", {
      state: { isModal: true },
    });
  }, [navigate]);

  useEffect(() => {
    window.addEventListener("popstate", () => {
      onClose();
    });
    return () => {
      window.removeEventListener("popstate", () => {
        onClose();
      });
    };
  }, [onClose]);

  return (
    <Fragment>
      <BorderModal
        title={
          <Typography size="24" color={COLORS.GRAY3} weight={700}>
            여행 평가
          </Typography>
        }
        modalType="full"
        isOpen={isOpen}
        onClose={handleOnConfirmCloseReviewModal}
        footer={
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
        }
        modalDetailStyle={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <div
          css={cssAlignVerticalStyle({
            gap: 28,
          })}
        >
          <div css={cssAlignVerticalStyle({ gap: 24 })}>
            {chatData && <ChatItem chatData={chatData} />}
            <Typography color={COLORS.GRAY4} weight={700} size="16">
              해당 여행에서 즐겼던 장소들은 어떠셨나요?
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
                        travelPlace.contenttypeid === item.contenttypeid
                    )
                    .map((travelPlace) => (
                      <TravelPlaceSelectItem
                        key={travelPlace.contentid}
                        travelInfo={travelPlace}
                        selected={
                          travelPlace.contentid
                            ? selectedContentIdList.includes(
                                travelPlace.contentid
                              )
                            : false
                        }
                        onSelect={handleOnHeartTravelPlace}
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
              onClick={handleOnCloseReviewModal}
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
            여행 평가를 종료하시겠어요?
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
              onClick={handleOnCloseReviewModal}
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
            여행 평가가 완료됐어요!
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
