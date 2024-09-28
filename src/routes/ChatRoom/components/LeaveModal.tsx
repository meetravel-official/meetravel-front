import { css } from "@emotion/react";
import { Fragment } from "react";
import { useLeaveModal } from "states/useChat";

import { ReactComponent as ExclamationCircleIcon } from "@/assets/icons/exclamation-circle.svg";
import { Button, Typography } from "@/components";
import Modal from "@/components/Modal/Modal";
import { cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

const LeaveModal = () => {
  const { isOpenLeaveModal, handleOnCloseLeaveModal } = useLeaveModal();

  return (
    <Modal
      zIndex={102}
      modalType="simple"
      isOpen={isOpenLeaveModal}
      onClose={handleOnCloseLeaveModal}
      closableIcon={false}
      footer={
        <Fragment>
          <Button bgColor={COLORS.PINK3} onClick={handleOnCloseLeaveModal}>
            <Typography color={COLORS.WHITE} size="16" weight={700}>
              안 나갈래요!
            </Typography>
          </Button>
          <Button onClick={handleOnCloseLeaveModal}>
            <Typography color={COLORS.GRAY3} size="16" weight={700}>
              나갈래요!
            </Typography>
          </Button>
        </Fragment>
      }
    >
      <div css={cssAlignVerticalStyle({ gap: 12, alignItems: "center" })}>
        <ExclamationCircleIcon width={50} height={50} />
        <Typography color={COLORS.GRAY4} size="16" weight={700}>
          지금 방을 나가면 매칭이{" "}
          <span
            css={css`
              color: ${COLORS.SITUATION1};
            `}
          >
            취소
          </span>
          돼요!
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

export default LeaveModal;
