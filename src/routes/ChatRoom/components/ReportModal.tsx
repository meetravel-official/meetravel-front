import { css } from "@emotion/react";
import Cookies from "js-cookie";
import { useReportModal } from "states/useChat";

import { IUserData } from "@/api/interfaces/chat";
import { Typography } from "@/components";
import Modal from "@/components/Modal/Modal";
import UserItem from "@/components/UserItem/UserItem";
import { cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

const ReportModal = ({ data }: { data?: IUserData[] }) => {
  const { isOpenReportModal, handleOnCloseReportModal } = useReportModal();
  const myUserId =
    JSON.parse(Cookies.get("userInfo") as string)?.userId ?? "invalidCookies";

  return (
    <Modal
      zIndex={102}
      modalType="simple"
      isOpen={isOpenReportModal}
      onClose={handleOnCloseReportModal}
      closableIcon={true}
      title={
        <div
          css={css`
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          <Typography
            color={COLORS.GRAY4}
            size="16"
            weight={700}
            align={"center"}
            detailStyle={css`
              justify-content: center;
            `}
          >
            <span
              css={css`
                color: ${COLORS.SITUATION1};
              `}
            >
              신고대상
            </span>
            을 골라주세요.
          </Typography>
        </div>
      }
      modalDetailStyle={css`
        width: 250px;
        padding: 20px;
      `}
    >
      <div css={cssAlignVerticalStyle({ gap: 12, alignItems: "flex-start" })}>
        <Typography color={COLORS.GRAY3} size="12" weight={400}>
          *과반수에 의해 강제 퇴장 시,
          <br />
          자동으로 다시 매칭을 시작합니다.
        </Typography>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 18px;
        `}
      >
        {data?.map((item, index) => {
          if (item.userId === myUserId) return null;
          return <UserItem key={index} data={item} />;
        })}
      </div>
    </Modal>
  );
};
export default ReportModal;
