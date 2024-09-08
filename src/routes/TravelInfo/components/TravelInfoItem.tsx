import { ReactComponent as HearIcon } from "@/assets/icons/heart.svg";
import { ReactComponent as PinIcon } from "@/assets/icons/pin.svg";
import { ReactComponent as ShareIcon } from "@/assets/icons/share.svg";
import { Image, Typography } from "@/components";
import { COLORS } from "@/styles/color";

import {
  cssTransparentButtonStyle,
  cssTravelInfoItemBtnBoxStyle,
  cssTravelInfoItemDescStyle,
  cssTravelInfoItemHeartStyle,
  cssTravelInfoItemImageStyle,
  cssTravelInfoItemsStyle,
} from "../styles/TravelInfoItem.styles";

interface TravelInfoItemProps {
  placeName: string;
  address: string;
  imageUrl: string;
  like?: number;
}

export const TravelInfoItem = ({
  placeName,
  address,
  imageUrl,
  like,
}: TravelInfoItemProps) => {
  return (
    <div css={cssTravelInfoItemsStyle}>
      <div css={cssTravelInfoItemImageStyle}>
        <div css={cssTravelInfoItemBtnBoxStyle}>
          <button css={cssTransparentButtonStyle("1px")}>
            <PinIcon />
          </button>
          <button css={cssTransparentButtonStyle("1px")}>
            <ShareIcon />
          </button>
        </div>
        <Image
          src={imageUrl}
          alt="travel-info"
          width="100%"
          height="100%"
          objectFit="cover"
        />
        <div css={cssTravelInfoItemHeartStyle}>
          <button css={cssTransparentButtonStyle()}>
            <HearIcon />{" "}
            <Typography size="12" color={COLORS.WHITE} weight="regular">
              {like}
            </Typography>
          </button>
        </div>
      </div>
      <div css={cssTravelInfoItemDescStyle}>
        <Typography color={COLORS.GRAY5} size="16" weight="regular">
          {placeName}
        </Typography>
        <Typography color={COLORS.GRAY4} size="12" weight="regular">
          {address}
        </Typography>
      </div>
    </div>
  );
};
