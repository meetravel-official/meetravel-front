import { Bar, Typography } from "@/components";
import { cssAlignVerticalStyle } from "@/styles/align";

export const HomeContainer = () => {
  return (
    <div css={cssAlignVerticalStyle({ gap: 16, alignItems: "flex-start" })}>
      <Typography weight="black" mode="block" align="center">
        홈
      </Typography>
      <Bar />
    </div>
  );
};
