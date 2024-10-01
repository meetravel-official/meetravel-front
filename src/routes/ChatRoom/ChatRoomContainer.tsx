import { css } from "@emotion/react";
import { CompatClient, Stomp } from "@stomp/stompjs";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { TravelPlanModal } from "routes/Chat/components/TravelPlanModal/TravelPlanModal";
import SockJS from "sockjs-client";
import {
  useChatUsers,
  useProfileFullModal,
  useProfileModal,
} from "states/useChat";

import { useGetChatUsers } from "@/api/hooks/chat";
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

const ChatRoomContainer = () => {
  const client = useRef<CompatClient>();
  const [inputText, setInputText] = useState<string>();
  const [chatMessage, setChatMessage] = useState<IChatMessageData>();
  const { isOpenProfileModal, handleOnCloseProfileModal } = useProfileModal();
  const { isOpenProfileFullModal, handleOnCloseProfileFullModal } =
    useProfileFullModal();

  const [isOpenTravelPlanModal, setIsOpenTravelPlanModal] = useState(false);

  const location = useLocation();
  const match = location.pathname.match(/\/chat\/(.*)/);
  const chatRoomId = match ? match[1] : null;

  const { data: chatUsersData } = useGetChatUsers(chatRoomId ?? "1");
  const { setChatUsersData } = useChatUsers();
  const [chatMessageGroups, setChatMessageGroups] = useState<
    IChatMessageData[]
  >([]);
  let prevUserId: string;

  const token = Cookies.get("accessToken");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const enterPressed = useRef(false);

  // 스크롤을 제일 아래로 내리는 함수
  // 일단은 내가 메세지 전송할때만 아래로 내리도록 함
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      // messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;

      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const connectHandler = () => {
    setTimeout(() => {
      client.current = Stomp.over(() => {
        const sock = new SockJS(
          `${process.env.REACT_APP_HOST_API_URL}/ws/chat`
        );
        return sock;
      });

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
              scrollToBottom();
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
    connectHandler();
    return () => {
      console.log("////////");
      console.log("unsubscribe");
      client.current?.unsubscribe(
        `/exchange/chat.exchange/chat.rooms.${chatRoomId}`
      );
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
      scrollToBottom();
      setInputText("");
      client?.current?.send(
        "/pub/chat.send",
        { Authorization: `Bearer ${token}` },
        JSON.stringify({
          chatRoomId: chatRoomId,
          message: inputText,
        })
      );
    }
  }, [chatRoomId, inputText, token]);

  useEffect(() => {
    console.log("chatMessageGroups", chatMessageGroups);
  }, [chatMessageGroups]);

  //TODO: 매칭로직에 join api 붙여야함
  const joinRoom = useCallback(() => {
    console.log("pushMessage");
    client.current?.send(
      `/pub/chat.join`,
      {
        Authorization: `Bearer ${token}`,
      },
      JSON.stringify({
        type: "JOIN",
        message: null,
        chatRoomId: chatRoomId,
      })
    );
  }, []);

  const handleOnOpenTravelPlanModal = () => {
    setIsOpenTravelPlanModal(true);
  };

  return (
    <Fragment>
      <div className="chat-room">
        <BackHeader
          titleContent={<TitleHeader data={chatUsersData} />}
          prefixStyle={cssBackHeaderPrefixStyle}
        />
        <div css={cssMessageListStyle}>
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
          {/**여기에 채팅내용이 올라갑니다 */}
          {/* TODO: 매칭이 완료되고 여행이 시작할때 어드민 메세지를 추가해주어야합니다 */}
          <div
            css={css`
              height: 39px;
            `}
          />
          <MessageItem
            type={"admin"}
            data={{
              userId: "닉네임",
              message:
                "안녕하세요! 여러분들의 여행을 책임질 ‘진행봇’입니다. 저를 함께 여행계획을 세워봐요!",
              sendAt: "2024-09-08 12:34",
            }}
          />

          {chatMessageGroups.map((item, index) => {
            const isSameUser = prevUserId === item.userId;
            prevUserId = item.userId;
            return (
              item.type === "CHAT" && (
                <MessageItem
                  key={index}
                  type="me"
                  data={item}
                  isSameUser={isSameUser}
                />
              )
            );
          })}
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
        matchingInfo={{
          travelStartDate: dayjs(
            chatUsersData?.travelPlanDate.startDate
          ).format("YYYY-MM-DD"),
          travelEndDate: dayjs(chatUsersData?.travelPlanDate.endDate).format(
            "YYYY-MM-DD"
          ),
          keyword: ["산", "도시", "야경"],
        }}
      />

      <ReportModal data={chatUsersData?.joinedUsers} />
      <LeaveModal />
      <ProfileDrawer
        isOpen={isOpenProfileModal}
        onClose={handleOnCloseProfileModal}
      />
      <ReportReasonModal />
      <SingleReportModal />
      <ProfileFullModal
        isOpen={isOpenProfileFullModal}
        onClose={handleOnCloseProfileFullModal}
      />
    </Fragment>
  );
};
export default ChatRoomContainer;
