import { dummyChatData } from "dummies/chat";
import { useMemo, useState } from "react";
import { checkUser } from "utils/check-user";

import ChatItem, { ChatStatus, IChatData } from "@/components/Chat/ChatItem";
import { EnterChatRoomModal } from "@/components/EnterChatRoomModal/EnterChatRoomModal";
import { cssAlignVerticalStyle } from "@/styles/align";
import { cssDefaultBtnStyle } from "@/styles/button";

export const SearchContainer = checkUser(() => {
  const [selectedChatData, setSelectedChatData] = useState<IChatData>();
  const [isOpenEnterChatModal, setIsOpenEnterChatModal] = useState(false);

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

  const handleOnClickChat = (chatData: IChatData) => {
    setSelectedChatData(chatData);
    setIsOpenEnterChatModal(true);
  };

  const handleOnCloseEnterChatModal = () => {
    setIsOpenEnterChatModal(false);
  };

  return (
    <div css={cssAlignVerticalStyle({ gap: 8 })}>
      {chatDataList.map((chatData) => (
        <button
          key={chatData.link}
          css={cssDefaultBtnStyle({ width: "100%" })}
          onClick={() => handleOnClickChat(chatData)}
        >
          <ChatItem chatData={chatData} />
        </button>
      ))}
      <EnterChatRoomModal
        isOpen={isOpenEnterChatModal}
        onClose={handleOnCloseEnterChatModal}
        chatData={selectedChatData}
      />
    </div>
  );
});
