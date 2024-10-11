import { css } from "@emotion/react";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useSearch } from "states/useSearch";
import { checkUser } from "utils/check-user";

import { useGetSearchChatRoom } from "@/api/hooks/chat";
import { ChatStatus, IMatchingData } from "@/api/interfaces/chat";
import ChatItem from "@/components/Chat/ChatItem";
import { EnterChatRoomModal } from "@/components/EnterChatRoomModal/EnterChatRoomModal";
import NotFound from "@/components/NotFound/NotFound";
import { Spin } from "@/components/Spin/Spin";
import { cssAlignVerticalStyle } from "@/styles/align";
import { cssDefaultBtnStyle } from "@/styles/button";

export const SearchContainer = checkUser(() => {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const [selectedChatData, setSelectedChatData] = useState<IMatchingData>();
  const [isOpenEnterChatModal, setIsOpenEnterChatModal] = useState(false);

  const { searchValue } = useSearch();

  const {
    data: chatRoomListData,
    hasNextPage,
    fetchNextPage,
    isLoading,
  } = useGetSearchChatRoom(searchValue);

  const chatDataList: IMatchingData[] = useMemo(() => {
    return (
      chatRoomListData?.pages.map((item) => item.chatRooms.content).flat() || []
    );
  }, [chatRoomListData]);

  const handleOnClickChat = (chatData: IMatchingData) => {
    setSelectedChatData(chatData);
    setIsOpenEnterChatModal(true);
  };

  const handleOnCloseEnterChatModal = () => {
    setIsOpenEnterChatModal(false);
  };

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  const convertChatData = (chatData?: IMatchingData) => {
    if (chatData)
      return {
        ...chatData,
        status: ChatStatus.INPROGRESS,
        isActive: false,
        tags: chatData.travelKeywords,
        link: `/chat/${chatData.chatRoomId}`,
        title: chatData.area.areaName,
        startDate: chatData.travelPlanDate.startDate,
        endDate: chatData.travelPlanDate.endDate,
        person: chatData.persons,
      };
  };

  return (
    <div css={cssAlignVerticalStyle({ gap: 8 })}>
      {isLoading ? (
        <Spin size={36} />
      ) : chatDataList && chatDataList.length > 0 ? (
        <Fragment>
          {chatDataList.map((chatData) => (
            <button
              key={chatData.chatRoomId}
              css={cssDefaultBtnStyle({ width: "100%" })}
              onClick={() => handleOnClickChat(chatData)}
            >
              <ChatItem chatData={convertChatData(chatData)!} />
            </button>
          ))}
          <div ref={ref} />
        </Fragment>
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
        chatData={convertChatData(selectedChatData)}
      />
    </div>
  );
});
