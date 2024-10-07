import "dayjs/locale/ko";

import { css } from "@emotion/react";
import { CompatClient, Stomp } from "@stomp/stompjs";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useInView } from "react-intersection-observer";
import { useLocation } from "react-router-dom";
import { TravelPlanModal } from "routes/Chat/components/TravelPlanModal/TravelPlanModal";
import SockJS from "sockjs-client";
import {
  useChatProfile,
  useChatUsers,
  useProfileFullModal,
  useProfileModal,
} from "states/useChat";
import { checkUser } from "utils/check-user";

import {
  IGetChatRoomMessagesParams,
  useGetChatRoomMessages,
  useGetChatUsers,
} from "@/api/hooks/chat";
import { IChatMessageData } from "@/api/interfaces/chat";
import { ReactComponent as PlanIcon } from "@/assets/icons/plan.svg";
import { Button, Typography } from "@/components";
import { BackHeader } from "@/components/BackLayout/BackHeader";
import Input from "@/components/Input/Input";
import MessageItem from "@/components/MessageItem";
import ProfileDrawer from "@/components/ProfileDrawer/ProfileDrawer";
import ReportReasonModal from "@/components/ReportReasonModal/ReportReasonModal";
import SingleReportModal from "@/components/SingleReportModal/SingleReportModal";
import TagKeyword from "@/components/TagKeyword/TagKeyword";
import { cssDefaultBtnStyle } from "@/styles/button";
import { COLORS } from "@/styles/color";

import {
  cssBackHeaderPrefixStyle,
  cssChatRoomInputStyle,
  cssChatRoomInputWrapperStyle,
  cssChatRoomKeywordStyle,
  cssMessageListStyle,
} from "./ChatRoomContainer.styles";
import LeaveModal from "./components/LeaveModal";
import { ProfileFullModal } from "./components/ProfileFullModal";
import ReportModal from "./components/ReportModal";
import TitleHeader from "./components/TitleHeader";
dayjs.locale("ko");

const ChatRoomContainer = checkUser(() => {
  const client = useRef<CompatClient>();
  const [inputText, setInputText] = useState<string>();
  const { isOpenProfileModal, handleOnCloseProfileModal } = useProfileModal();
  const { isOpenProfileFullModal, handleOnCloseProfileFullModal } =
    useProfileFullModal();
  const [isConnect, setIsConnect] = useState(false);

  const [isOpenTravelPlanModal, setIsOpenTravelPlanModal] = useState(false);

  const location = useLocation();
  const match = location.pathname.match(/\/chat\/(.*)/);
  const chatRoomId = match ? match[1] : null;

  const { data: chatUsersData } = useGetChatUsers(chatRoomId ?? "1");
  const { setChatUsersData } = useChatUsers();
  const { profileData } = useChatProfile();
  const [chatMessageGroups, setChatMessageGroups] = useState<
    IChatMessageData[]
  >([]);
  const queryClient = useQueryClient();
  const [isMounted, setIsMounted] = useState(false);

  const [chatMessagesHistoryParams, setChatMessagesHistoryParams] =
    useState<IGetChatRoomMessagesParams>({
      chatRoomId: Number(chatRoomId) ?? 1,
      page: 0,
      pageSize: 10,
    });

  const {
    data: chatMessagesHistoryData,
    fetchNextPage,
    isFetching,
  } = useGetChatRoomMessages(chatMessagesHistoryParams);
  const { ref: infiniteRef, inView } = useInView({
    threshold: 0,
  });
  const [prevHeight, setPrevHeight] = useState(0);

  const travelInfoItemList = useMemo(() => {
    if (
      chatMessagesHistoryData?.pages &&
      chatMessagesHistoryData?.pages.length > 0
    ) {
      return chatMessagesHistoryData.pages.flatMap((page) => page.content);
    }
    return [];
  }, [chatMessagesHistoryData?.pages]);

  const prevUserId = useRef<string>();
  const preSendAt = useRef("1999-01-01");

  const token = Cookies.get("accessToken");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const enterPressed = useRef(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const scrollToBottomFLD = () => {
    if (messagesEndRef.current) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView();
      }, 100);
    }
  };

  const scrollToBottomFWS = () => {
    if (messagesEndRef.current) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  useEffect(() => {
    if (!isFetching && !isMounted) {
      setTimeout(() => {
        if (chatRef.current) scrollToBottomFLD();
      }, 0);
      setIsMounted(true);
    }
  }, [isFetching, isMounted]);

  useEffect(() => {
    if (inView && isMounted) {
      setPrevHeight(chatRef?.current?.scrollHeight || 0);
      fetchNextPage();
    }
  }, [fetchNextPage, inView, isMounted]);

  useEffect(() => {
    if (prevHeight > 0 && chatRef.current && !isFetching) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight - prevHeight;
    }
  }, [prevHeight, isFetching]);

  /////소켓 관련////

  const connectHandler = () => {
    setTimeout(() => {
      client.current = Stomp.over(() => {
        const sock = new SockJS(
          `${process.env.REACT_APP_HOST_API_URL}/ws/chat`
        );
        return sock;
      });
      client.current.onStompError = (frame) => {
        console.log(
          "Socket is closed. Reconnect will be attempted in 1 second.",
          frame
        );
        if (isConnect)
          setTimeout(function () {
            connectHandler();
          }, 1000);
      };

      client.current.debug = function (message) {
        if (!message.includes("PONG") && !message.includes("PING")) {
          console.log(message);
        }
      };

      client.current.connect(
        {
          Authorization: `Bearer ${token}`,
        },
        () => {
          client.current?.subscribe(
            `/exchange/chat.exchange/chat.rooms.${chatRoomId}`,
            (message) => {
              // 메세지 수신시 리스트 추가
              // 내가 보낸 메세지도 서버에서 받아와야함 ( 전송여부 확인 목적 )
              setChatMessageGroups((prevGroups) => [
                ...prevGroups,
                JSON.parse(message.body),
              ]);
              scrollToBottomFWS();
              if (
                JSON.parse(message.body)?.type === "JOIN" ||
                JSON.parse(message.body)?.type === "LEAVE"
              ) {
                queryClient.invalidateQueries({
                  queryKey: ["useGetChatUsers"],
                });
              }
            },
            {
              Authorization: `Bearer ${token}`,
            }
          );
        }
      );
    });
  };

  useEffect(() => {
    try {
      setIsConnect(true);
      connectHandler();
    } catch (e) {
      console.log("연결 오류");
    }
    return () => {
      console.log("////////");
      console.log("unsubscribe");
      try {
        setIsConnect(false);
        client.current?.unsubscribe(
          `/exchange/chat.exchange/chat.rooms.${chatRoomId}`
        );
      } catch (e) {
        console.log("연결 오류");
      }
      queryClient.removeQueries({ queryKey: ["useGetChatRoomMessages"] });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (chatUsersData) {
      setChatUsersData(chatUsersData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatUsersData]);

  const addMessage = useCallback(() => {
    if (inputText !== "") {
      scrollToBottomFWS();
      setInputText("");
      client?.current?.send(
        "/pub/chat.send",
        { Authorization: `Bearer ${token}` },
        JSON.stringify({
          chatRoomId: chatRoomId,
          message:
            inputText && inputText.length > 500
              ? inputText.slice(0, 500)
              : inputText,
        })
      );
    }
  }, [chatRoomId, inputText, token]);

  useEffect(() => {
    console.log("chatMessageGroups", chatMessageGroups);
  }, [chatMessageGroups]);

  //////////////////////////

  const handleOnOpenTravelPlanModal = () => {
    setIsOpenTravelPlanModal(true);
  };

  const RenderMessageList = useCallback((messageList: IChatMessageData[]) => {
    return messageList.map((item, index) => {
      const isSameUser = prevUserId.current === item.userId;
      const isSameSendAt =
        dayjs(preSendAt.current).format("YYYY-MM-DD") ===
        dayjs(item.sendAt).format("YYYY-MM-DD");

      prevUserId.current = item.userId;
      preSendAt.current = item.sendAt ?? "1999-01-01";
      const dateView = (
        <div
          css={css`
            display: flex;
            justify-content: center;
            margin-top: 20px;
          `}
        >
          <Typography size={14} color={COLORS.GRAY4}>
            {dayjs(item.sendAt).format("YY-MM-DD ddd")}요일
          </Typography>
        </div>
      );
      let messageView;
      if (item.type === "CHAT")
        messageView = (
          <MessageItem
            key={item.chatMessageId}
            type="me"
            data={item}
            isSameUser={isSameUser}
          />
        );
      else if (item.type === "BOT")
        messageView = (
          <MessageItem
            key={item.chatMessageId}
            type="admin"
            data={item}
            isSameUser={isSameUser}
          />
        );
      else if (item.type === "JOIN" || item.type === "LEAVE")
        messageView = (
          <div
            css={css`
              display: flex;
              justify-content: center;
              margin-top: 20px;
            `}
          >
            <Typography size={14} color={COLORS.GRAY2}>
              -{item.message}-
            </Typography>
          </div>
        );
      return (
        <Fragment key={item.chatMessageId}>
          {!isSameSendAt && dateView}
          {messageView}
        </Fragment>
      );
    });
  }, []);

  return (
    <Fragment>
      <div className="chat-room">
        <BackHeader
          titleContent={<TitleHeader data={chatUsersData} />}
          prefixStyle={cssBackHeaderPrefixStyle}
        />
        <div ref={chatRef} css={cssMessageListStyle}>
          <div
            css={css`
              position: fixed;
              display: flex;
              gap: 8px;
              z-index: 1;
            `}
          >
            {chatUsersData?.travelKeywords?.map((item, index) => {
              return (
                <TagKeyword
                  key={index}
                  keyword={item}
                  detailStyle={cssChatRoomKeywordStyle}
                  typographyStyle={css`
                    color: ${COLORS.GRAY4};
                  `}
                  svgColor={COLORS.GRAY3}
                />
              );
            })}
          </div>
          <br />
          <div ref={infiniteRef} />
          {RenderMessageList(travelInfoItemList)}
          {RenderMessageList(chatMessageGroups)}
          {/**여기까지 채팅입니다 */}
          <div ref={messagesEndRef}></div>
        </div>

        <div className="chat-room-input" css={cssChatRoomInputWrapperStyle}>
          <button
            css={cssDefaultBtnStyle}
            onClick={() => {
              console.log("계획 버튼 누름");
              handleOnOpenTravelPlanModal();
            }}
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
          </button>
          <Input
            placeholder="메세지를 입력해주세요."
            detailStyle={cssChatRoomInputStyle}
            inputDetailStyle={css`
              ::placeholder {
                color: ${COLORS.GRAY2};
              }
            `}
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !enterPressed.current) {
                enterPressed.current = true;
                addMessage();

                setTimeout(function () {
                  enterPressed.current = false;
                  setInputText("");
                }, 0);
              }
            }}
          />
          <Button
            detailStyle={css`
              background-color: ${COLORS.PINK3};
              width: 72px;
              height: 46px;
              margin: 8px 8px 8px 0;
            `}
            onClick={() => addMessage()}
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

      <TravelPlanModal
        isOpen={isOpenTravelPlanModal}
        onClose={() => {
          setIsOpenTravelPlanModal(false);
        }}
        chatRoomId={chatRoomId}
      />

      <ReportModal data={chatUsersData?.joinedUsers} />
      <LeaveModal chatRoomId={chatRoomId ?? undefined} />
      <ProfileDrawer
        isOpen={isOpenProfileModal}
        onClose={handleOnCloseProfileModal}
      />
      <ReportReasonModal />
      <SingleReportModal />
      <ProfileFullModal
        isOpen={isOpenProfileFullModal}
        onClose={handleOnCloseProfileFullModal}
        userId={profileData?.userId}
      />
    </Fragment>
  );
});
export default ChatRoomContainer;
