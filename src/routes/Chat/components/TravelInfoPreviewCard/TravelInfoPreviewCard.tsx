import { IAreaBasedList } from "@/api/interfaces/visitKorea";
import { Image, Typography } from "@/components";
import { COLORS } from "@/styles/color";

import {
  cssTravelInfoPreviewCardBodyStyle,
  cssTravelInfoPreviewCardImageStyle,
  cssTravelInfoPreviewCardStyle,
} from "./TravelInfoPreviewCard.styles";

interface TravelInfoPreviewCardProps {
  travelInfo: IAreaBasedList;
}
export const TravelInfoPreviewCard = ({
  travelInfo,
}: TravelInfoPreviewCardProps) => {
  const handleOnRedirectDetail = () => {
    // Redirect
  };

  return (
    <button
      css={cssTravelInfoPreviewCardStyle}
      onClick={handleOnRedirectDetail}
    >
      <div css={cssTravelInfoPreviewCardImageStyle}>
        <Image
          src={travelInfo.firstimage || ""}
          alt="travel-info"
          width="100%"
          height="100%"
          objectFit="cover"
        />
      </div>
      <div css={cssTravelInfoPreviewCardBodyStyle}>
        <Typography color={COLORS.GRAY5} weight={700} size="16">
          {travelInfo.title}
        </Typography>
        <Typography color={COLORS.GRAY4} weight={400} size="12">
          {travelInfo.addr1} {travelInfo.addr2}
        </Typography>
      </div>
    </button>
  );
};
