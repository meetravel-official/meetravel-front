import { Fragment, useState } from "react";

import { TravelPlace } from "@/api/interfaces/travel";
import { ReactComponent as HearIcon } from "@/assets/icons/heart.svg";
import { Image, Typography } from "@/components";
import { cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import { TravelInfoDetailModal } from "../TravelInfoDetailModal/TravelInfoDetailModal";
import {
  cssHeartBtnStyle,
  cssTravelPlaceSelectDescriptionStyle,
  cssTravelPlaceSelectImageStyle,
  cssTravelPlaceSelectItemStyle,
} from "./TravelPlaceSelectItem.styles";

interface TravelPlaceSelectItemProps {
  travelPlace: TravelPlace;
  selected?: boolean;
  onSelect: (travelPlace: TravelPlace) => void;
  disabled?: boolean;
}

export const TravelPlaceSelectItem = ({
  travelPlace,
  selected,
  disabled,
  onSelect,
}: TravelPlaceSelectItemProps) => {
  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);

  const handleOnOpenDetail = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    setIsOpenDetailModal(true);
  };

  const handleOnClickHeart = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    onSelect(travelPlace);
  };

  return (
    <Fragment>
      <div css={cssTravelPlaceSelectItemStyle}>
        <button
          css={cssTravelPlaceSelectImageStyle}
          onClick={handleOnOpenDetail}
        >
          <Image
            src={travelPlace.placeImageUrl || ""}
            alt="travel-info"
            width="100px"
            height="61px"
            objectFit="cover"
          />
        </button>
        <button
          css={cssTravelPlaceSelectDescriptionStyle}
          onClick={handleOnOpenDetail}
        >
          <div
            css={cssAlignVerticalStyle({ gap: 4, alignItems: "flex-start" })}
          >
            <Typography color={COLORS.GRAY5} weight={700} size="16">
              {travelPlace.placeTitle}
            </Typography>
            <Typography color={COLORS.GRAY4} weight={400} size="12">
              {travelPlace.placeAddress1} {travelPlace.placeAddress2}
            </Typography>
          </div>
        </button>
        <button
          css={cssHeartBtnStyle(selected)}
          onClick={handleOnClickHeart}
          disabled={disabled}
        >
          <HearIcon />
        </button>
      </div>
      <TravelInfoDetailModal
        isOpen={isOpenDetailModal}
        onClose={() => {
          setIsOpenDetailModal(false);
        }}
        travelId={travelPlace.placeId}
      />
    </Fragment>
  );
};
