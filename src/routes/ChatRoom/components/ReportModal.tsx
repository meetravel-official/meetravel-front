import { css } from "@emotion/react";
import { Fragment } from "react";
import { useReportModal } from "states/useChat";

import { ReactComponent as ExclamationCircleIcon } from "@/assets/icons/exclamation-circle.svg";
import { Button, Typography } from "@/components";
import Modal from "@/components/Modal/Modal";
import { cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

const ReportModal = () => {
  const { isOpenReportModal, handleOnCloseReportModal } = useReportModal();

  return (
    <Modal
      zIndex={102}
      modalType="simple"
      isOpen={isOpenReportModal}
      onClose={handleOnCloseReportModal}
      closableIcon={false}
      footer={
        <Fragment>
          <Button bgColor={COLORS.PINK3} onClick={handleOnCloseReportModal}>
            <Typography color={COLORS.WHITE} size="16" weight={700}>
              신고하고 나가기
            </Typography>
          </Button>
          <Button onClick={handleOnCloseReportModal}>
            <Typography color={COLORS.GRAY3} size="16" weight={700}>
              닫기
            </Typography>
          </Button>
        </Fragment>
      }
    >
      <div css={cssAlignVerticalStyle({ gap: 12, alignItems: "center" })}>
        <ExclamationCircleIcon width={50} height={50} />
        <Typography color={COLORS.GRAY4} size="16" weight={700} align="center">
          해당 방의 모든 유저를{" "}
          <span
            css={css`
              color: ${COLORS.SITUATION1};
            `}
          >
            신고
          </span>
          하고
          <br /> 방을 나가시겠어요?
        </Typography>
        <Typography color={COLORS.GRAY3} size="12" weight={400} align="center">
          *매칭 기회가 한 횟수 차감되며,
          <br />
          이는 방 이동 시에도 동일하게 적용돼요.
        </Typography>
      </div>
    </Modal>
  );
};
export default ReportModal;
