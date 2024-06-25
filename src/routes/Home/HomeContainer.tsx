import { Bar } from "@/components/Bar/Bar";
import { cssAlignVerticalStyle } from "@/styles/align";

export const HomeContainer = () => {
  return (
    <div css={cssAlignVerticalStyle({ gap: 16, alignItems: "flex-start" })}>
      <div>홈</div>
      <Bar />
    </div>
  );
};
