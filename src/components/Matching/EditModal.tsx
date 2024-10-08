import { css } from "@emotion/react";
import { Fragment } from "react";
import { useEditModal, useMatchingProcessModal } from "states/useMatching";

import { useGetChatRooms, usePostLeaveChatRoom } from "@/api/hooks/chat";
import { usePostMatchingForm } from "@/api/hooks/matching";
import { ReactComponent as ExclamationCircleIcon } from "@/assets/icons/exclamation-circle.svg";
import { cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import { Button } from "../Button/Button";
import Modal from "../Modal/Modal";
import { Typography } from "../Typography/Typography";

const EditModal = ({ form }: { form?: any }) => {
  const { isOpenEditModal, handleOnCloseEditModal } = useEditModal();
  const { handleOnOpenMatchingProcessModal } = useMatchingProcessModal();
  const { refetch: refetchMyChatRoom } = useGetChatRooms();
  const mutationPostLeaveChatRoom = usePostLeaveChatRoom();
  const mutationPostMatchingForm = usePostMatchingForm();

  const handleOnEditMatchingForm = () => {
    try {
      refetchMyChatRoom().then((res) => {
        if (res.data?.chatRooms[0]?.chatRoomId) {
          console.log("채팅방이 있습니다.");
          mutationPostLeaveChatRoom.mutate(res.data?.chatRooms[0]?.chatRoomId, {
            onSuccess: () => {
              console.log("채팅방 나가기 성공");
              mutationPostMatchingForm.mutate(form, {
                onSuccess: () => {
                  handleOnOpenMatchingProcessModal();
                  handleOnCloseEditModal();
                },
              });
            },
          });
        } else {
          console.log("채팅방이 없습니다.");
          mutationPostMatchingForm.mutate(form, {
            onSuccess: () => {
              handleOnOpenMatchingProcessModal();
              handleOnCloseEditModal();
            },
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      zIndex={106}
      modalType="simple"
      isOpen={isOpenEditModal}
      onClose={handleOnCloseEditModal}
      closableIcon={false}
      footer={
        <Fragment>
          <Button
            bgColor={COLORS.PINK3}
            onClick={() => {
              console.log("수정할래요");
              handleOnEditMatchingForm();
            }}
            loading={
              mutationPostLeaveChatRoom.isPending ||
              mutationPostMatchingForm.isPending
            }
          >
            <Typography color={COLORS.WHITE} size="16" weight={700}>
              수정할래요!
            </Typography>
          </Button>
          <Button onClick={handleOnCloseEditModal}>
            <Typography color={COLORS.GRAY3} size="16" weight={700}>
              안할래요.
            </Typography>
          </Button>
        </Fragment>
      }
    >
      <div css={cssAlignVerticalStyle({ gap: 12, alignItems: "center" })}>
        <ExclamationCircleIcon width={50} height={50} />
        <Typography color={COLORS.GRAY4} size="16" weight={700}>
          수정을 하면 기존 매칭이{" "}
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
export default EditModal;
