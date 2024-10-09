import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkUser } from "utils/check-user";

import { useGetLiveChatRoom } from "@/api/hooks/chat";
import { ChatStatus, IMatchingData } from "@/api/interfaces/chat";
import { ReactComponent as Bell } from "@/assets/icons/bell.svg";
import { ReactComponent as Heart } from "@/assets/icons/heart.svg";
import { Button, Typography } from "@/components";
import ChatItem from "@/components/Chat/ChatItem";
import { EnterChatRoomModal } from "@/components/EnterChatRoomModal/EnterChatRoomModal";
import { Pagination } from "@/components/Pagination/Pagination";
import { cssAlignVerticalStyle } from "@/styles/align";
import { cssDefaultBtnStyle } from "@/styles/button";
import { COLORS } from "@/styles/color";

import { pageRoutes } from "..";
import { BannerCarousel } from "./components/BannerCarousel";
import { cssHomeContainerStyle } from "./HomeContainer.styles";
export const HomeContainer = checkUser(() => {
  const navigate = useNavigate();

  const { data } = useGetLiveChatRoom();

  const pageSize = 3;
  const [page, setPage] = useState<number>(0);

  const [selectedChatData, setSelectedChatData] = useState<IMatchingData>();
  const [isOpenEnterChatModal, setIsOpenEnterChatModal] = useState(false);

  const chatDataList = useMemo(() => {
    return data?.chatRooms || [];
  }, [data?.chatRooms]);

  const chatDataListByPage = useMemo(() => {
    return chatDataList.slice(page * 3, page * 3 + 3);
  }, [chatDataList, page]);

  const maxPage = useMemo(() => {
    return Math.ceil(chatDataList.length / pageSize);
  }, [chatDataList]);

  const handleOnClickChat = (chatData: IMatchingData) => {
    setSelectedChatData(chatData);
    setIsOpenEnterChatModal(true);
  };

  const handleOnCloseEnterChatModal = () => {
    setIsOpenEnterChatModal(false);
  };

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
        subTitle: chatData.detailArea.areaName,
      };
  };

  return (
    <div css={cssHomeContainerStyle}>
      <div css={cssAlignVerticalStyle({ gap: 28 })}>
        <div css={cssAlignVerticalStyle({ gap: 20 })}>
          <BannerCarousel />
          <div css={cssAlignVerticalStyle({ gap: 8 })}>
            <Button
              icon={<Bell stroke={COLORS.PINK2} />}
              height="large"
              align="start"
              link
              linkColor={COLORS.GRAY2}
              onClick={() => {
                navigate(pageRoutes.NOTIFICATION);
              }}
            >
              <Typography color={COLORS.GRAY4} weight="bold" size={16}>
                알림 내역
              </Typography>
            </Button>
            <Button
              icon={<Heart width={20} height={20} stroke={COLORS.PINK2} />}
              height="large"
              align="start"
              link
              linkColor={COLORS.GRAY2}
              onClick={() => {
                navigate(pageRoutes.LIKE_PLACE);
              }}
            >
              <Typography color={COLORS.GRAY4} weight="bold" size={16}>
                좋아요한 여행 정보
              </Typography>
            </Button>
          </div>

          {chatDataList.length > 0 && (
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
                      key={chatData.chatRoomId}
                      css={cssDefaultBtnStyle({ width: "100%" })}
                      onClick={() => handleOnClickChat(chatData)}
                    >
                      <ChatItem chatData={convertChatData(chatData)!} />
                    </button>
                  ))}
                </div>
                <Pagination page={page} maxPage={maxPage} setPage={setPage} />
              </div>
            </div>
          )}
        </div>
      </div>
      <EnterChatRoomModal
        isOpen={isOpenEnterChatModal}
        onClose={handleOnCloseEnterChatModal}
        chatData={convertChatData(selectedChatData)}
      />
    </div>
  );
});
