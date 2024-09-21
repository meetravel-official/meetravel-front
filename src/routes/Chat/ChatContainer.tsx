import { css } from "@emotion/react";
import { Fragment, ReactNode, useState } from "react";
import { Link } from "react-router-dom";

import { Button, Header, Typography } from "@/components";
import ChatItem, { ChatStatus, IChatData } from "@/components/Chat/ChatItem";
import Modal from "@/components/Modal/Modal";
import { cssAlignVerticalStyle } from "@/styles/align";
import { cssDefaultBtnStyle } from "@/styles/button";
import { COLORS } from "@/styles/color";

import {
  cssChatHrStyle,
  cssChatSummarizeBoxStyle,
  cssLinkStyle,
} from "./ChatContainer.styles";
import NotFoundChat from "./components/NotFoundChat";
import { TravelReviewModal } from "./components/TravelReviewModal/TravelReviewModal";

export const ChatContainer = () => {
  const chatData1 = {
    isActive: true,
    status: ChatStatus.INPROGRESS,
    person: { woman: 1, man: 2, total: 3 },
    startDate: "2024/12/26",
    endDate: "2024/12/27",
    title: "서귀포",
    tags: ["산", "야경", "힐링"],
    link: "/chat/1",
  };
  const chatData2 = {
    isActive: false,
    status: ChatStatus.REVIEW,
    person: { woman: 2, man: 1, total: 3 },
    startDate: "2024/12/26",
    endDate: "2024/12/27",
    title: "서귀포",
    tags: ["산", "야경", "힐링"],
    link: "/chat/2",
  };

  const chatData3 = {
    isActive: false,
    status: ChatStatus.DONE,
    person: { woman: 2, man: 1, total: 3 },
    startDate: "2024/12/26",
    endDate: "2024/12/27",
    title: "서귀포",
    tags: ["산", "야경", "힐링"],
    link: "/chat/3",
  };

  const [isOpenTravelReviewModal, setIsOpenTravelReviewModal] = useState(false);
  const [isOpenTravelDoneModal, setIsOpenTravelDoneModal] = useState(false);

  const [selectedChatData, setSelectedChatData] = useState<IChatData>();

  const ChatWrapper = ({
    link,
    children,
    ...props
  }: {
    link?: string;
    children: ReactNode;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>) =>
    link ? (
      <Link to={link}>{children}</Link>
    ) : (
      <button css={cssDefaultBtnStyle} {...props}>
        {children}
      </button>
    );

  const handleOnOpenTravelReviewModal = () => {
    handleOnCloseTravelDoneModal();
    setIsOpenTravelReviewModal(true);
  };

  const handleOnCloseTravelReviewModal = () => {
    setIsOpenTravelReviewModal(false);
  };

  const handleOnOpenTravelDoneModal = () => {
    setIsOpenTravelDoneModal(true);
  };

  const handleOnCloseTravelDoneModal = () => {
    setIsOpenTravelDoneModal(false);
  };

  const handleOnClickChat = (chatData: IChatData) => {
    setSelectedChatData(chatData);

    if (chatData.status === ChatStatus.REVIEW) {
      handleOnOpenTravelReviewModal();
    } else if (chatData.status === ChatStatus.DONE) {
      handleOnOpenTravelDoneModal();
    }
  };

  return (
    <Fragment>
      <Header
        titleContent={
          <Typography size="20" weight="bold" color={COLORS.GRAY3}>
            채팅창
          </Typography>
        }
        detailStyle={css`
          padding: 16px 0;
        `}
      />
      <hr css={cssChatHrStyle} />

      {/* 데이터 없을때 보여줄 notFound component */}
      <NotFoundChat />

      {/* 채팅방 리스트 */}
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 8px;
        `}
      >
        <ChatWrapper link={chatData1.link}>
          <ChatItem chatData={chatData1} statusVisible />
        </ChatWrapper>
        <ChatWrapper
          onClick={() => {
            handleOnClickChat(chatData2);
          }}
        >
          <ChatItem chatData={chatData2} statusVisible />
        </ChatWrapper>
        <ChatWrapper
          onClick={() => {
            handleOnClickChat(chatData3);
          }}
        >
          <ChatItem chatData={chatData3} />
        </ChatWrapper>
      </div>
      <Modal
        modalType="normal"
        title="여행 돌아보기"
        isOpen={isOpenTravelDoneModal}
        onClose={handleOnCloseTravelDoneModal}
      >
        <div css={cssAlignVerticalStyle}>
          <div css={cssChatSummarizeBoxStyle}>
            <Typography color={COLORS.PINK3} size="16" weight={700}>
              {selectedChatData?.title}
            </Typography>
            <Typography color={COLORS.GRAY3} size="14">
              {selectedChatData?.startDate} ~ {selectedChatData?.endDate}
            </Typography>
          </div>
          <Link to={selectedChatData?.link || ""} css={cssLinkStyle}>
            <Button bgColor={COLORS.PINK3}>
              <Typography color={COLORS.WHITE} weight={700}>
                채팅방으로 이동하기
              </Typography>
            </Button>
          </Link>
          <Button
            bgColor={COLORS.GRAY1}
            onClick={handleOnOpenTravelReviewModal}
          >
            <Typography color={COLORS.GRAY3} weight={700}>
              작성한 여행 평가 보기
            </Typography>
          </Button>
        </div>
      </Modal>
      <TravelReviewModal
        isOpen={isOpenTravelReviewModal}
        onClose={handleOnCloseTravelReviewModal}
        chatData={selectedChatData}
      />
    </Fragment>
  );
};
