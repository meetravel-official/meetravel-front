import { css } from "@emotion/react";
import { dummyChatData } from "dummies/chat";
import { useMemo, useState } from "react";
import { checkUser } from "utils/check-user";

import { ChatStatus, IChatData } from "@/api/interfaces/chat";
import ChatItem from "@/components/Chat/ChatItem";
import { EnterChatRoomModal } from "@/components/EnterChatRoomModal/EnterChatRoomModal";
import NotFound from "@/components/NotFound/NotFound";
import { cssAlignVerticalStyle } from "@/styles/align";
import { cssDefaultBtnStyle } from "@/styles/button";

export const SearchContainer = checkUser(() => {
  const [selectedChatData, setSelectedChatData] = useState<IChatData>();
  const [isOpenEnterChatModal, setIsOpenEnterChatModal] = useState(false);

  const chatDataList = useMemo(() => {
    const arr: IChatData[] = [];
    // for (let i = 0; i < 10; i++) {
    //   arr.push({
    //     ...dummyChatData,
    //     isActive: false,
    //     status: ChatStatus.INPROGRESS,
    //     title: "채팅방" + i.toString(),
    //     link: "/chat/" + i.toString(),
    //   });
    // }
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
      {chatDataList && chatDataList.length > 0 ? (
        chatDataList.map((chatData) => (
          <button
            key={chatData.link}
            css={cssDefaultBtnStyle({ width: "100%" })}
            onClick={() => handleOnClickChat(chatData)}
          >
            <ChatItem chatData={chatData} />
          </button>
        ))
      ) : (
        <NotFound
          mainText="검색 결과가 없습니다."
          detailStyle={css`
            margin-top: 100px;
          `}
        />
      )}
      <EnterChatRoomModal
        isOpen={isOpenEnterChatModal}
        onClose={handleOnCloseEnterChatModal}
        chatData={selectedChatData}
      />
    </div>
  );
});
