import { css } from "@emotion/react";
import { useEffect } from "react";
import { useHeaderState } from "states/useHeader";
import { checkUser } from "utils/check-user";

import NotFound from "@/components/NotFound/NotFound";
import {
  Notification,
  NotificationProps,
} from "@/components/Notification/Notification";
import { cssAlignVerticalStyle } from "@/styles/align";

// import { pageRoutes } from "..";

export const NotificationContainer = checkUser(() => {
  const { setTitle } = useHeaderState();

  // const dummyNotificationData = [
  //   {
  //     notificationId: 1,
  //     type: "service" as const,
  //     title: "문의에 답변이 등록됐어요!",
  //     subTitle: "문의하셨던 내용에 답변이 도착했어요.",
  //     date: "2024-09-23",
  //     read: true,
  //   },
  //   {
  //     notificationId: 4,
  //     type: "service" as const,
  //     title: "미트래블에 오신 것을 환영해요!",
  //     subTitle:
  //       "새로운 만남과 여행!\n출발부터 도착까지, 저희가 옆에서 도와드릴게요.",
  //     date: "2024-09-23",
  //     active: true,
  //   },
  //   {
  //     notificationId: 2,
  //     type: "travel" as const,
  //     title: "문의에 답변이 등록됐어요!",
  //     subTitle: "문의하셨던 내용에 답변이 도착했어요.",
  //     date: "2024-09-23",
  //     read: true,
  //   },
  //   {
  //     notificationId: 2,
  //     type: "travel" as const,
  //     title: "매칭에 성공했어요!",
  //     subTitle:
  //       "채팅방에 새롭게 이야기를 나눌 수 있게 됐어요!\n서로 여행에 관한 대화를 진행해봐요.",
  //     date: "2024-09-23",
  //     link: pageRoutes.CHAT,
  //   },
  // ];

  const notificationData: NotificationProps[] = [];

  useEffect(() => {
    setTitle("알림 내역");
  }, [setTitle]);

  return (
    <div>
      {notificationData && notificationData.length > 0 ? (
        <div css={cssAlignVerticalStyle({ gap: 8 })}>
          {notificationData.map((item) => (
            <Notification key={item.notificationId} {...item} />
          ))}
        </div>
      ) : (
        <NotFound
          mainText="아직 알림이 없어요!"
          detailStyle={css`
            margin-top: 100px;
          `}
        />
      )}
    </div>
  );
});
