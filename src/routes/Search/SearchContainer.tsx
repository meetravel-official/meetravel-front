import { dummyChatData } from "dummies/chat";
import { useMemo } from "react";
import { checkUser } from "utils/check-user";

import ChatItem, { ChatStatus } from "@/components/Chat/ChatItem";
import { cssAlignVerticalStyle } from "@/styles/align";

export const SearchContainer = checkUser(() => {
  const chatDataList = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push({
        ...dummyChatData,
        isActive: false,
        status: ChatStatus.REVIEW,
        title: "채팅방" + i.toString(),
        link: "/chat/" + i.toString(),
      });
    }
    return arr;
  }, []);

  return (
    <div css={cssAlignVerticalStyle({ gap: 8 })}>
      {chatDataList.map((chatData) => (
        <ChatItem key={chatData.link} chatData={chatData} />
      ))}{" "}
    </div>
  );
});
