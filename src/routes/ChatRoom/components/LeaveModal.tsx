import { css } from "@emotion/react";
import { useQueryClient } from "@tanstack/react-query";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useLeaveModal } from "states/useChat";

import { usePostLeaveChatRoom } from "@/api/hooks/chat";
import { ReactComponent as ExclamationCircleIcon } from "@/assets/icons/exclamation-circle.svg";
import { Button, Typography } from "@/components";
import Modal from "@/components/Modal/Modal";
import { pageRoutes } from "@/routes";
import { cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

const LeaveModal = ({ chatRoomId }: { chatRoomId?: string }) => {
  const { isOpenLeaveModal, handleOnCloseLeaveModal } = useLeaveModal();
  const mutationPostLeaveChatRoom = usePostLeaveChatRoom();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
          <Button
            onClick={() => {
              console.log("나갈래요 버튼을 누름");
              if (chatRoomId)
                mutationPostLeaveChatRoom.mutate(Number(chatRoomId), {
                  onSuccess: () => {
                    console.log("채팅방 나가기 성공");
                    queryClient.invalidateQueries({
                      queryKey: ["useGetChatRooms"],
                    });
                    navigate(pageRoutes.CHAT);
                  },
                });

              handleOnCloseLeaveModal();
            }}
          >
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
