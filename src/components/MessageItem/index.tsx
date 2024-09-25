import { css } from "@emotion/react";
import { useChatState } from "states/useChat";

import { IChatMessageData } from "@/api/interfaces/chat";

import AddMessage from "./AddMessage";
import AdminMessageItem from "./AdminMessageItem";
import MyMessage from "./MyMessage";
import UserMessageItem from "./UserMessageItem";

export interface MessageItemDataProps {
  profileImg?: string;
  name?: string;
  content?: string;
  regDate?: string;
}
export interface MessageItemProps {
  type?: "admin" | "system" | "user" | "me";
  data: IChatMessageData;
}

const MessageItem = ({ type, data }: MessageItemProps) => {
  const { userId } = useChatState();
  if (type === "admin") {
    return (
      <div
        css={css`
          margin-top: 8px;
        `}
      >
        <AdminMessageItem data={data} />
      </div>
    );
  } else if (type === "me") {
    return <MyMessage data={data} />;
  } else if (data.userId === "익명") {
    // TODO: data.name이 바로 이전 메세지의 이름과 같을 경우 이름,프로필을 표시하지 않음
    // 이전 메세지 판별 여부 추가예정
    return <AddMessage data={data} />;
  }
  return (
    <div
      css={css`
        margin-top: 8px;
      `}
    >
      <UserMessageItem data={data} />
    </div>
  );
};

export default MessageItem;
