import { dummyChatData } from "dummies/chat";
import { useCallback, useMemo, useState } from "react";
import { checkUser } from "utils/check-user";

import { ReactComponent as Bell } from "@/assets/icons/bell.svg";
import { Button, Typography } from "@/components";
import { ArrowButton } from "@/components/ArrowButton/ArrowButton";
import ChatItem, { ChatStatus, IChatData } from "@/components/Chat/ChatItem";
import { EnterChatRoomModal } from "@/components/EnterChatRoomModal/EnterChatRoomModal";
import { cssAlignHorizontalStyle, cssAlignVerticalStyle } from "@/styles/align";
import { cssDefaultBtnStyle } from "@/styles/button";
import { COLORS } from "@/styles/color";

import { BannerCarousel } from "./components/BannerCarousel";
import { cssHomeContainerStyle } from "./HomeContainer.styles";
export const HomeContainer = checkUser(() => {
  const pageSize = 3;
  const [page, setPage] = useState<number>(0);

  const [selectedChatData, setSelectedChatData] = useState<IChatData>();
  const [isOpenEnterChatModal, setIsOpenEnterChatModal] = useState(false);

  const chatDataList = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 9; i++) {
      arr.push({
        ...dummyChatData,
        isActive: false,
        status: ChatStatus.INPROGRESS,
        title: "채팅방 " + i.toString(),
        link: "/chat/" + i.toString(),
      });
    }
    return arr;
  }, []);

  const chatDataListByPage = useMemo(() => {
    return chatDataList.slice(page * 3, page * 3 + 3);
  }, [chatDataList, page]);

  const maxPage = useMemo(() => {
    return Math.ceil(chatDataList.length / pageSize);
  }, [chatDataList]);

  const handleOnPrevPage = useCallback(() => {
    if (page > 0) setPage(page - 1);
  }, [page]);

  const handleOnNextPage = useCallback(() => {
    if (page < maxPage - 1) setPage(page + 1);
  }, [page, maxPage]);

  const handleOnClickChat = (chatData: IChatData) => {
    setSelectedChatData(chatData);
    setIsOpenEnterChatModal(true);
  };

  const handleOnCloseEnterChatModal = () => {
    setIsOpenEnterChatModal(false);
  };

  return (
    <div css={cssHomeContainerStyle}>
      <div css={cssAlignVerticalStyle({ gap: 28 })}>
        <div css={cssAlignVerticalStyle({ gap: 20 })}>
          <BannerCarousel />
          <Button
            icon={<Bell />}
            height="large"
            align="start"
            link
            linkColor={COLORS.GRAY2}
          >
            <Typography color={COLORS.GRAY4} weight="bold" size={16}>
              알림 내역
            </Typography>
          </Button>

          <div
            css={cssAlignVerticalStyle({ gap: 8, alignItems: "flex-start" })}
          >
            <Typography color={COLORS.GRAY3} weight="bold" size={16}>
              실시간 여행 매칭
            </Typography>
            <div css={cssAlignVerticalStyle({ gap: 16 })}>
              <div
                css={cssAlignVerticalStyle({
                  gap: 8,
                  alignItems: "flex-start",
                })}
              >
                {chatDataListByPage.map((chatData) => (
                  <button
                    key={chatData.link}
                    css={cssDefaultBtnStyle({ width: "100%" })}
                    onClick={() => handleOnClickChat(chatData)}
                  >
                    <ChatItem chatData={chatData} />
                  </button>
                ))}
              </div>
              <div css={cssAlignHorizontalStyle({ gap: 38 })}>
                <ArrowButton
                  direction="left"
                  disabled={page === 0}
                  onClick={handleOnPrevPage}
                />
                <div>
                  <Typography color={COLORS.GRAY4} size={20} weight={700}>
                    {page + 1}
                  </Typography>{" "}
                  <Typography color={COLORS.GRAY3} size={20} weight={700}>
                    / {maxPage}
                  </Typography>
                </div>
                <ArrowButton
                  direction="right"
                  disabled={page === maxPage - 1}
                  onClick={handleOnNextPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <EnterChatRoomModal
        isOpen={isOpenEnterChatModal}
        onClose={handleOnCloseEnterChatModal}
        chatData={selectedChatData}
      />
    </div>
  );
});
