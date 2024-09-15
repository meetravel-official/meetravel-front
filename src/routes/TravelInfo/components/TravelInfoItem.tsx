import { useState } from "react";
import { useTravelInfo } from "states/useTravelInfo";

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
}

export const TravelInfoItem = ({ travelInfo }: TravelInfoItemProps) => {
  const { setSelectedContent, setIsOpenTravelInfoDetailModal } =
    useTravelInfo();

  const [isLike, setIsLike] = useState(
    travelInfo.contentid
      ? localStorage.getItem(travelInfo.contentid) === "like"
      : false
  );
  const [isOpenShareModal, setIsOpenShareModal] = useState(false);

  const handleOnClickTravelInfoItem = () => {
    setSelectedContent(travelInfo);
    setIsOpenTravelInfoDetailModal(true);
  };

  const handleOnLike = () => {
    if (travelInfo.contentid) {
      if (isLike) {
        localStorage.removeItem(travelInfo.contentid);
        setIsLike(false);
      } else {
        localStorage.setItem(travelInfo.contentid, "like");
        setIsLike(true);
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
    console.log("share");
    handleOnCloseShareModal();
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
            <HearIcon fill={isLike ? "white" : "none"} />
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
          <Typography color={COLORS.GRAY5} size="16" weight="regular">
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
