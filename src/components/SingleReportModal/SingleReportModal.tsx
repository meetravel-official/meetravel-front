import { css } from "@emotion/react";
import { useChatProfile, useSingleReportModal } from "states/useChat";

import { Button, Typography } from "@/components";
import Modal from "@/components/Modal/Modal";
import { cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import CheckButtonGroup from "../CheckButton/CheckButtonGroup";

const SingleReportModal = () => {
  const { isOpenSingleReportModal, handleOnCloseSingleReportModal } =
    useSingleReportModal();
  const { profileData: data } = useChatProfile();

  return (
    <Modal
      zIndex={102}
      modalType="simple"
      isOpen={isOpenSingleReportModal}
      onClose={handleOnCloseSingleReportModal}
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
            {data.nickname}님을{" "}
            <span
              css={css`
                color: ${COLORS.SITUATION1};
              `}
            >
              신고
            </span>
            하시겠어요?
          </Typography>
        </div>
      }
      modalDetailStyle={css`
        width: 250px;
        padding: 20px;
      `}
    >
      <div
        css={css`
          padding: 1px;
        `}
      >
        <div css={cssAlignVerticalStyle({ gap: 12, alignItems: "flex-start" })}>
          <Typography color={COLORS.GRAY3} size="12" weight={400}>
            *과반수에 의해 강제 퇴장 시,
            <br />
            자동으로 다시 매칭을 시작합니다.
          </Typography>
        </div>
        <CheckButtonGroup
          gridDetailStyle={css`
            display: flex;
            flex-direction: column;
            width: 100%;
            margin-top: 18px;
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
            margin-top: 18px;
          `}
          onClick={() => {
            console.log("신고하기 완료 누름");
            handleOnCloseSingleReportModal();
            //TODO: 신고하기 API 호출
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
export default SingleReportModal;
