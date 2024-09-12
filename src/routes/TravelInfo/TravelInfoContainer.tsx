import { Bar, Typography } from "@/components";
import { cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import { TravelInfoList } from "./components/TravelInfoList";
import { TravelInfoSearch } from "./components/TravelInfoSearch";

export const TravelInfoContainer = () => {
  return (
    <div css={cssAlignVerticalStyle({ gap: 16 })}>
      <div css={cssAlignVerticalStyle({ gap: 16, alignItems: "flex-start" })}>
        <Typography size="20" weight="regular" color={COLORS.GRAY3}>
          여행 정보
        </Typography>
        <Bar />
      </div>
      <div css={cssAlignVerticalStyle({ gap: 16, alignItems: "flex-start" })}>
        <TravelInfoSearch />
        <TravelInfoList />
      </div>
    </div>
  );
};
