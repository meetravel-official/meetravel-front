import { css } from "@emotion/react";
import { useReportModal, useReportReasonModal } from "states/useChat";

import { cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import { Button } from "../Button/Button";
import CheckButtonGroup from "../CheckButton/CheckButtonGroup";
import Modal from "../Modal/Modal";
import { Typography } from "../Typography/Typography";

const ReportReasonModal = () => {
  const { handleOnCloseReportModal } = useReportModal();
  const { isOpenReportReasonModal, handleOnCloseReportReasonModal } =
    useReportReasonModal();

  return (
    <Modal
      zIndex={103}
      modalType="simple"
      isOpen={isOpenReportReasonModal}
      onClose={handleOnCloseReportReasonModal}
      closableIcon={true}
      modalDetailStyle={css`
        width: 250px;
        padding: 20px;
      `}
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
              신고/강제 퇴장{" "}
            </span>
            사유
          </Typography>
        </div>
      }
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
          padding: 1px;
        `}
      >
        <CheckButtonGroup
          gridDetailStyle={css`
            display: flex;
            flex-direction: column;
            width: 100%;
          `}
          buttonDetailStyle={css`
            width: 100%;
            box-sizing: border-box;
            height: 52px;
            border-radius: 4px;
            justify-content: flex-start;
            padding: 8px 12px;
          `}
        >
          <CheckButtonGroup.CheckboxButton value="1">
            욕설/성희롱
          </CheckButtonGroup.CheckboxButton>
          <CheckButtonGroup.CheckboxButton value="2">
            광고/개인정보 요구
          </CheckButtonGroup.CheckboxButton>
          <CheckButtonGroup.CheckboxButton value="3">
            미참여
          </CheckButtonGroup.CheckboxButton>
        </CheckButtonGroup>
        <Button
          bgColor={COLORS.SITUATION1}
          detailStyle={css`
            height: 52px;
            border-radius: 4px;
            padding: 8px 12px;
          `}
          onClick={() => {
            console.log("신고하기 완료 누름");
            handleOnCloseReportModal();
            handleOnCloseReportReasonModal();
          }}
        >
          <Typography size={16} weight={700} color={COLORS.WHITE}>
            신고하기
          </Typography>
        </Button>
      </div>
    </Modal>
  );
};
export default ReportReasonModal;
