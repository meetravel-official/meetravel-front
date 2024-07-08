import { Bar } from "@/components/Bar/Bar";
import { Typography } from "@/components/Typography/Typography";
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
