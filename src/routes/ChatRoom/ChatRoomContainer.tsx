import { css } from "@emotion/react";
import { CompatClient, Stomp } from "@stomp/stompjs";
import { useCallback, useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";

import { ReactComponent as PlanIcon } from "@/assets/icons/plan.svg";
import { Button, Typography } from "@/components";
import { BackHeader } from "@/components/BackLayout/BackHeader";
import { ChatStatus } from "@/components/Chat/ChatItem";
import Input from "@/components/Input/Input";
import MessageItem from "@/components/MessageItem";
import { COLORS } from "@/styles/color";

import TitleHeader from "./components/TitleHeader";

const ChatRoomContainer = () => {
  const client = useRef<CompatClient>();
  const [chatMessage, setChatMessage] = useState();
  const chatRoomId = 1;

  const connectHaner = () => {
    client.current = Stomp.over(() => {
      const sock = new SockJS("http://175.211.58.83:10200/ws/chat");
      return sock;
    });
    client.current.connect(
      {
        Authorization: "Bearer text", //TODO: 토큰값
      },
      () => {
        client.current?.subscribe(
          `/exchange/chat.exchange/chat.rooms.${chatRoomId}`,
          (message) => {
            setChatMessage(JSON.parse(message.body));
          },
          {
            Authorization: "Bearer text", //TODO: 토큰값
          }
        );
      }
    );
  };

  // useEffect(() => {
  //   connectHaner();
  // }, []);

  const joinRoom = useCallback(() => {
    console.log("pushMessage");
    client.current?.send(
      `/pub/chat.join`,
      {
        Authorization:
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBQ0NFU1MiLCJpYXQiOjE3MjY1NTYwNTUsImV4cCI6MTcyNjU1Nzg1NSwiaXNUZW1wb3JhcnkiOmZhbHNlLCJ1c2VySWQiOiIzNzA1MjY0NjUwQGtha2FvIn0.55hfqDAny2l9f35uUKEQ8K6-5gu3tRg-i3-UC6sueP9_zL9Ch5b3T4LP7bvb18xFAJYb-KKBpHSVvHaMEMMtqw",
      },
      JSON.stringify({
        type: "JOIN",
        message: null,
        chatRoomId: chatRoomId,
      })
    );
  }, []);

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

  return (
    <div className="chat-room">
      <BackHeader //TODO: position fixed로 변경 필요
        titleContent={<TitleHeader data={chatData1} />}
        prefixStyle={css`
          all: unset;
          padding: 16px 0;
          align-items: center;
          display: flex;
          gap: 8px;
        `}
      />
      <div
        css={css`
          height: calc(var(--vh, 1vh) * 100 - 187px - 62px);
          overflow: scroll;
          background-color: ${COLORS.GRAY1};
          margin: 0 -16px -16px -16px;
          padding: 16px;
          gap: 8px;
          display: flex;
          flex-direction: column;
        `}
      >
        {/**여기에 채팅내용이 올라갑니다 */}
        <MessageItem
          type={"admin"}
          data={{
            name: "닉네임",
            content:
              "안녕하세요! 여러분들의 여행을 책임질 ‘진행봇’입니다. 저를 함께 여행계획을 세워봐요!",
            regDate: "2024-09-08 12:34",
          }}
        />
        <MessageItem
          data={{
            name: "닉네임",
            content: "우와! 좋아요~ 반가워요 다들!",
            regDate: "2024-09-08 12:34",
          }}
        />
        <MessageItem
          data={{
            content: "우와~ 좋아요",
            regDate: "2024-09-08 12:34",
          }}
        />
        <MessageItem
          data={{
            name: "익명",
            content: "반가워요 다들~",
            regDate: "2024-09-08 12:34",
          }}
        />
        <MessageItem
          data={{
            name: "익명",
            content: "반가워요 다들~",
            regDate: "2024-09-08 12:34",
          }}
        />
        <MessageItem
          data={{
            name: "익명",
            content: "반가워요 다들~",
            regDate: "2024-09-08 12:34",
          }}
        />
        <MessageItem
          type="me"
          data={{
            name: "익명",
            content: "반가워요 다들~",
            regDate: "2024-09-08 12:34",
          }}
        />
        {/**여기까지 채팅입니다 */}
      </div>

      <div
        className="chat-room-input"
        css={css`
          height: 62px;
          display: flex;
          position: fixed;
          gap: 8px;
          width: 100%;
          max-width: 540px;
          margin: 0 -16px;
          background-color: ${COLORS.WHITE};
          border-top: 1px solid ${COLORS.GRAY2};
        `}
      >
        <div
          css={css`
            margin: 22px 9px 22px 17px;
          `}
        >
          <PlanIcon
            css={css`
              svg {
                width: 24px;
                height: 24px;
              }
            `}
          />
        </div>
        <Input
          placeholder="메세지를 입력해주세요."
          detailStyle={css`
            background-color: ${COLORS.WHITE};
            border: 1px solid ${COLORS.GRAY2};
            height: 46px;
            margin: 8px 0;
            width: 100%;
          `}
          inputDetailStyle={css`
            ::placeholder {
              color: ${COLORS.GRAY2};
            }
          `}
        />
        <Button
          detailStyle={css`
            background-color: ${COLORS.PINK3};
            width: 72px;
            height: 46px;
            margin: 8px 8px 8px 0;
          `}
        >
          <Typography
            color={COLORS.WHITE}
            weight={700}
            detailStyle={css`
              flex-shrink: 0;
            `}
          >
            전송
          </Typography>
        </Button>
      </div>
    </div>
  );
};
export default ChatRoomContainer;
