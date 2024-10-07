import { css } from "@emotion/react";
import dayjs from "dayjs";
import { Fragment, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TravelReviewModal } from "routes/Chat/components/TravelReviewModal/TravelReviewModal";

import { ChatStatus, IChatData } from "@/api/interfaces/chat";
import { ReactComponent as LogoIcon } from "@/assets/icons/logo.svg";
import { cssAlignHorizontalStyle, cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import { Button } from "../Button/Button";
import Modal from "../Modal/Modal";
import TagKeyword from "../TagKeyword/TagKeyword";
import { Typography } from "../Typography/Typography";

interface EnterChatRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  chatData?: IChatData;
  title?: string;
  footer?: ReactNode;
  closableIcon?: boolean;
}
export const EnterChatRoomModal = ({
  isOpen,
  onClose,
  chatData,
  closableIcon,
}: EnterChatRoomModalProps) => {
  const navigate = useNavigate();

  const isInprogress = chatData?.status === ChatStatus.INPROGRESS;

  const [isOpenTravelReviewModal, setIsOpenTravelReviewModal] = useState(false);

  const convertDate = (date?: string) => {
    if (date) return dayjs(date, "YYYY-MM-DD").format("YYYY년 MM월 DD일");
    return "-";
  };

  const handleOnEnterChatRoom = () => {
    if (chatData?.link) {
      navigate(chatData?.link);
      onClose();
    }
  };

  const handleOnOpenTravelReviewModal = () => {
    onClose();
    setIsOpenTravelReviewModal(true);
  };

  const handleOnCloseTravelReviewModal = () => {
    setIsOpenTravelReviewModal(false);
  };

  return (
    <Fragment>
      <Modal
        modalType="normal"
        isOpen={isOpen}
        onClose={onClose}
        closableIcon={closableIcon}
        footer={
          isInprogress ? (
            <Fragment>
              <Button bgColor={COLORS.PINK3} onClick={handleOnEnterChatRoom}>
                <Typography size="16" color={COLORS.WHITE} weight={700}>
                  참여할래요!
                </Typography>
              </Button>
              <Button onClick={onClose}>
                <Typography size="16" color={COLORS.GRAY3} weight={700}>
                  괜찮아요.
                </Typography>
              </Button>
            </Fragment>
          ) : (
            <Fragment>
              <Button bgColor={COLORS.PINK3} onClick={handleOnEnterChatRoom}>
                <Typography size="16" color={COLORS.WHITE} weight={700}>
                  채팅방 이동
                </Typography>
              </Button>
              <Button onClick={handleOnOpenTravelReviewModal}>
                <Typography size="16" color={COLORS.GRAY3} weight={700}>
                  후기 보기
                </Typography>
              </Button>
            </Fragment>
          )
        }
      >
        <div css={cssAlignVerticalStyle({ gap: 20 })}>
          <div css={cssAlignVerticalStyle({ gap: 12 })}>
            <LogoIcon width={50} height={50} fill={COLORS.PINK3} />
            <Typography size="16" color={COLORS.PINK3} weight={700}>
              {isInprogress
                ? `${chatData?.title || "해당"} 여행에 참여하시겠어요?`
                : `${chatData?.title || ""} 여행 돌아보기`}
            </Typography>
          </div>
          <div css={cssAlignVerticalStyle({ gap: 12 })}>
            <div css={cssAlignHorizontalStyle({ gap: 8 })}>
              <div css={cssAlignHorizontalStyle({ gap: 4 })}>
                <Typography color={COLORS.GRAY3} weight={700} size="16">
                  女
                </Typography>
                <Typography color={COLORS.GRAY4} weight={700} size="16">
                  {chatData?.person.femaleCount || 0} 명
                </Typography>
              </div>
              <div css={cssAlignHorizontalStyle({ gap: 4 })}>
                <Typography color={COLORS.GRAY3} weight={700} size="16">
                  男
                </Typography>
                <Typography color={COLORS.GRAY4} weight={700} size="16">
                  {chatData?.person.maleCount || 0} 명
                </Typography>
              </div>
              <Typography color={COLORS.GRAY3} size="16" weight={700}>
                /
              </Typography>
              <Typography color={COLORS.GRAY3} size="16" weight={700}>
                {chatData?.person.totalCount || 0} 명
              </Typography>
            </div>
          </div>
          <div css={cssAlignHorizontalStyle({ gap: 4 })}>
            <Typography size={14} weight={400} color={COLORS.GRAY4}>
              {convertDate(chatData?.startDate)}
            </Typography>
            <Typography size={14} weight={400} color={COLORS.GRAY4}>
              ~
            </Typography>
            <Typography size={14} weight={400} color={COLORS.GRAY4}>
              {convertDate(chatData?.endDate)}
            </Typography>
          </div>
          <div
            css={css`
              ${cssAlignHorizontalStyle({
                gap: 4,
                wrap: "wrap",
                justifyContent: "center",
              })}
              padding: 1px;
            `}
          >
            {chatData?.tags.map((tag) => (
              <TagKeyword key={tag} keyword={tag} />
            ))}
          </div>
        </div>
      </Modal>
      <TravelReviewModal
        isOpen={isOpenTravelReviewModal}
        onClose={handleOnCloseTravelReviewModal}
        chatData={chatData}
      />
    </Fragment>
  );
};
