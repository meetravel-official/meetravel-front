import { css } from "@emotion/react";
import { chatData1 } from "dummies/chat";
import { Fragment, ReactNode, useState } from "react";
import { Link } from "react-router-dom";

import { useGetChatRooms } from "@/api/hooks/chat";
import { ChatStatus, IChatData } from "@/api/interfaces/chat";
import { Header, Typography } from "@/components";
import ChatItem from "@/components/Chat/ChatItem";
import { EnterChatRoomModal } from "@/components/EnterChatRoomModal/EnterChatRoomModal";
import { cssDefaultBtnStyle } from "@/styles/button";
import { COLORS } from "@/styles/color";

import { cssChatHrStyle } from "./ChatContainer.styles";
import NotFoundChat from "./components/NotFoundChat";
import { TravelReviewModal } from "./components/TravelReviewModal/TravelReviewModal";

export const ChatContainer = () => {
  const [isOpenTravelReviewModal, setIsOpenTravelReviewModal] = useState(false);
  const [isOpenTravelDoneModal, setIsOpenTravelDoneModal] = useState(false);

  const [selectedChatData, setSelectedChatData] = useState<IChatData>();
  const { data, isLoading } = useGetChatRooms();

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
      {!data && !isLoading && <NotFoundChat />}

      {/* 채팅방 리스트 */}
      {data && !isLoading && (
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 8px;
          `}
        >
          {data?.chatRooms.map((chatData, index) => {
            console.log(chatData.chatRoomId);
            return (
              <ChatWrapper
                key={index}
                link={`/chat/${chatData.chatRoomId}`}
                onClick={() => {
                  handleOnClickChat(chatData1); //TODO: api에 status 생기면 수정
                }}
              >
                {/* TODO: api에 status 생기면 수정 */}
                <ChatItem chatData={chatData1} />
              </ChatWrapper>
            );
          })}
        </div>
      )}

      <EnterChatRoomModal
        isOpen={isOpenTravelDoneModal}
        onClose={handleOnCloseTravelDoneModal}
        chatData={selectedChatData}
      />
      <TravelReviewModal
        isOpen={isOpenTravelReviewModal}
        onClose={handleOnCloseTravelReviewModal}
        chatData={selectedChatData}
      />
    </Fragment>
  );
};
