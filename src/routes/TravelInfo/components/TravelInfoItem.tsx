import { useState } from "react";
import { toast } from "react-toastify";

import { usePostSharePlace } from "@/api/hooks/place";
import { IAreaBasedList } from "@/api/interfaces/visitKorea";
import { ReactComponent as HearIcon } from "@/assets/icons/heart.svg";
import { ReactComponent as PinIcon } from "@/assets/icons/pin.svg";
import { ReactComponent as ShareIcon } from "@/assets/icons/share.svg";
import { Button, Image, Typography } from "@/components";
import Modal from "@/components/Modal/Modal";
import { cssAlignHorizontalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import {
  cssShareModalContentStyle,
  cssTransparentButtonStyle,
  cssTravelInfoItemBtnBoxStyle,
  cssTravelInfoItemDescStyle,
  cssTravelInfoItemHeartStyle,
  cssTravelInfoItemImageStyle,
  cssTravelInfoItemsStyle,
} from "../styles/TravelInfoItem.styles";

interface TravelInfoItemProps {
  travelInfo: IAreaBasedList;
  onClickItem: (travelInfo: IAreaBasedList) => void;
}

export const TravelInfoItem = ({
  travelInfo,
  onClickItem,
}: TravelInfoItemProps) => {
  const { mutate, isPending } = usePostSharePlace();

  const [isLike, setIsLike] = useState(
    travelInfo.contentid ? !!localStorage.getItem(travelInfo.contentid) : false
  );
  const [isOpenShareModal, setIsOpenShareModal] = useState(false);

  const handleOnClickTravelInfoItem = () => {
    onClickItem(travelInfo);
  };

  const handleOnLike = () => {
    if (travelInfo.contentid) {
      const likePlaceList: string[] =
        typeof localStorage.getItem("likePlaceList") === "string"
          ? JSON.parse(localStorage.getItem("likePlaceList") as string)
          : [];
      if (isLike) {
        const filteredLikePlaceList = likePlaceList.filter(
          (item: string) => item !== travelInfo.contentid
        );
        setIsLike(false);
        localStorage.removeItem(travelInfo.contentid);
        localStorage.setItem(
          "likePlaceList",
          JSON.stringify(filteredLikePlaceList)
        );
      } else {
        localStorage.setItem(travelInfo.contentid, JSON.stringify(travelInfo));
        setIsLike(true);
        localStorage.setItem(
          "likePlaceList",
          JSON.stringify([...likePlaceList, travelInfo.contentid])
        );
      }
    }
  };

  const handleOnOpenKakaoMap = () => {
    if (travelInfo.mapx && travelInfo.mapy && travelInfo.title)
      window.open(
        `https://map.kakao.com/link/map/${travelInfo?.title},${travelInfo?.mapy},${travelInfo?.mapx}`,
        "_blank",
        "noopener noreferrer"
      );
  };

  const handleOnOpenShareModal = () => {
    setIsOpenShareModal(true);
  };

  const handleOnCloseShareModal = () => {
    setIsOpenShareModal(false);
  };

  const handleOnShare = () => {
    if (travelInfo.contentid)
      mutate(travelInfo.contentid, {
        onSuccess: () => {
          toast.success("채팅방에 공유되었습니다.");
        },
        onError: () => {
          toast.error("잠시 후 다시 시도해주세요.");
        },
        onSettled: () => {
          handleOnCloseShareModal();
        },
      });
  };

  return (
    <div css={cssTravelInfoItemsStyle}>
      <div css={cssTravelInfoItemImageStyle}>
        <div css={cssTravelInfoItemBtnBoxStyle}>
          <button
            css={cssTransparentButtonStyle("1px")}
            onClick={handleOnOpenKakaoMap}
          >
            <PinIcon />
          </button>
          <button
            css={cssTransparentButtonStyle("1px")}
            onClick={handleOnOpenShareModal}
          >
            <ShareIcon />
          </button>
        </div>
        <button
          css={cssTransparentButtonStyle()}
          onClick={handleOnClickTravelInfoItem}
        >
          <Image
            src={travelInfo.firstimage || ""}
            alt="travel-info"
            width="100%"
            height="100%"
            objectFit="cover"
          />
        </button>

        <div css={cssTravelInfoItemHeartStyle}>
          <button css={cssTransparentButtonStyle()} onClick={handleOnLike}>
            <HearIcon
              fill={isLike ? "white" : "none"}
              stroke={COLORS.WHITE}
              width={13}
              height={12}
            />
            {/* <Typography size="12" color={COLORS.WHITE} weight="regular">
              {like}
            </Typography> */}
          </button>
        </div>
      </div>
      <button
        css={cssTransparentButtonStyle()}
        onClick={handleOnClickTravelInfoItem}
      >
        <div css={cssTravelInfoItemDescStyle}>
          <Typography color={COLORS.GRAY5} size="16" weight={700}>
            {travelInfo.title}
          </Typography>
          <Typography color={COLORS.GRAY4} size="12" weight="regular">
            {travelInfo.addr1} {travelInfo.addr2}
          </Typography>
        </div>
      </button>
      <Modal
        isOpen={isOpenShareModal}
        onClose={handleOnCloseShareModal}
        modalType="simple"
        title="장소 공유하기"
        footer={
          <div css={cssAlignHorizontalStyle({ gap: 4, width: "100%" })}>
            <Button
              bgColor={COLORS.PINK3}
              color={COLORS.WHITE}
              onClick={handleOnShare}
              loading={isPending}
            >
              공유하기
            </Button>
            <Button
              bgColor={COLORS.GRAY1}
              color={COLORS.GRAY3}
              onClick={handleOnCloseShareModal}
            >
              취소
            </Button>
          </div>
        }
      >
        <div css={cssShareModalContentStyle}>
          <Typography color={COLORS.GRAY4} size="16">
            여행 진행 중인 채팅방에 이 장소를 공유할까요?
          </Typography>
        </div>
      </Modal>
    </div>
  );
};
