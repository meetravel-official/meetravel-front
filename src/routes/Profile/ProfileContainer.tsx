import { Typography } from "@/components";
import { cssAlignVerticalStyle } from "@/styles/align";
export const ProfileContainer = () => {
  return (
    <div css={cssAlignVerticalStyle({ gap: 16, alignItems: "flex-start" })}>
      <Typography>프로필</Typography>
    </div>
  );
};
