import { css } from "@emotion/react";
import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMatchingModal, useMatchingProcessModal } from "states/useMatching";

import { usePostChatRooms, usePostJoinChatRoom } from "@/api/hooks/chat";
import { useGetMatchingResult } from "@/api/hooks/matching";
import { ReactComponent as LogoIcon } from "@/assets/icons/logo.svg";
import { pageRoutes } from "@/routes";
import { cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import Modal from "../Modal/Modal";
import { Typography } from "../Typography/Typography";

const MatchingProcessModal = () => {
  const { isOpenMatchingProcessModal, handleOnCloseMatchingProcessModal } =
    useMatchingProcessModal();
  const { handleOnCloseMatchingModal } = useMatchingModal();
  const navigate = useNavigate();
  const mutationPostChatRooms = usePostChatRooms();
  const mutationPostJoinChatRoom = usePostJoinChatRoom();

  const myMatchingFormId = 5; // TODO: 내 매칭폼 아이디

  const { data, refetch } = useGetMatchingResult(myMatchingFormId);

  useEffect(() => {
    if (isOpenMatchingProcessModal)
      refetch() //매칭 결과 조회
        .then((res) => {
          console.log("res", res);
          if (res.data?.matchingFormId === null) {
            //매칭 결과가 없을때 새 채팅방 생성
            mutationPostChatRooms.mutate({ matchingFormId: myMatchingFormId });
          } else if (res.data?.matchingFormId) {
            //매칭 결과가 있을때 해당 채팅방 입장
            mutationPostJoinChatRoom.mutate(Number(res.data.matchingFormId));
          }
          setTimeout(() => {
            toast.success("매칭이 완료되었습니다.");
            handleOnCloseMatchingProcessModal();
            handleOnCloseMatchingModal();
            navigate(pageRoutes.CHAT);
          }, 4000);
        })
        .catch((err) => {
          console.error(err);
          toast.error("매칭에 실패했습니다. 다시 시도해주세요.");
          handleOnCloseMatchingProcessModal();
        });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenMatchingProcessModal]);

  return (
    <Modal
      zIndex={106}
      modalType="simple"
      isOpen={isOpenMatchingProcessModal}
      onClose={handleOnCloseMatchingProcessModal}
      closableIcon={false}
      footer={<Fragment></Fragment>}
    >
      <div css={cssAlignVerticalStyle({ gap: 12, alignItems: "center" })}>
        <Typography color={COLORS.GRAY4} size="16" weight={700}>
          매칭이 진행 중이에요!
        </Typography>
        <LogoIcon
          width={50}
          height={50}
          css={css`
            width: 100px;
            height: 100px;

            path,
            circle,
            rect,
            polygon {
              animation: colorChange 4s infinite alternate;
            }

            @keyframes colorChange {
              0%,
              100% {
                fill: ${COLORS.PINK3}; // 시작 색상 (파란색)
              }
              50% {
                fill: ${COLORS.PINK1}; // 중간 색상 (빨간색)
              }
            }
          `}
        />
        <Typography color={COLORS.GRAY3} size="12" weight={400} align="center">
          *매칭 기회가 한 횟수 차감되며,
          <br />
          이는 방 이동 시에도 동일하게 적용돼요.
        </Typography>
      </div>
    </Modal>
  );
};
export default MatchingProcessModal;
