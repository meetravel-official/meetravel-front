import { css } from "@emotion/react";
import { Fragment } from "react";

import { Header, Typography } from "@/components";
import ChatItem, { ChatStatus } from "@/components/Chat/ChatItem";
import { COLORS } from "@/styles/color";

import { cssChatHrStyle } from "./ChatContainer.styles";
import NotFoundChat from "./components/NotFoundChat";

export const ChatContainer = () => {
  const chatData1 = {
    isActive: true,
    status: ChatStatus.INPROGRESS,
    person: { woman: 1, man: 2, total: 3 },
    startDate: "2024/12/26",
    endDate: "2024/12/27",
    title: "서귀포",
    tags: ["산", "야경", "힐링"],
  };
  const chatData2 = {
    isActive: false,
    status: ChatStatus.REVIEW,
    person: { woman: 2, man: 1, total: 3 },
    startDate: "2024/12/26",
    endDate: "2024/12/27",
    title: "서귀포",
    tags: ["산", "야경", "힐링"],
  };

  const chatData3 = {
    isActive: false,
    status: ChatStatus.DONE,
    person: { woman: 2, man: 1, total: 3 },
    startDate: "2024/12/26",
    endDate: "2024/12/27",
    title: "서귀포",
    tags: ["산", "야경", "힐링"],
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
        <ChatItem chatData={chatData1} />
        <ChatItem chatData={chatData2} />
        <ChatItem chatData={chatData3} />
      </div>
    </Fragment>
  );
};
