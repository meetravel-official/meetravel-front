import { css } from "@emotion/react";
import Cookies from "js-cookie";

import { IChatMessageData } from "@/api/interfaces/chat";

import AddMessage from "./AddMessage";
import AdminAddMessage from "./AdminAddMessage";
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
  isSameUser?: boolean;
  data: IChatMessageData;
}

const MessageItem = ({ type, isSameUser, data }: MessageItemProps) => {
  const myUserId =
    JSON.parse(Cookies.get("userInfo") as string)?.userId ?? "invalidCookies";

  if (type === "admin") {
    if (isSameUser) {
      return <AdminAddMessage data={data} />;
    }
    return (
      <div
        css={css`
          margin-top: 8px;
        `}
      >
        <AdminMessageItem data={data} />
      </div>
    );
  } else if (myUserId === data.userId) {
    return <MyMessage data={data} />;
  } else if (isSameUser) {
    // data.userId 바로 이전 메세지의 이름과 같을 경우 이름,프로필을 표시하지 않음
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
