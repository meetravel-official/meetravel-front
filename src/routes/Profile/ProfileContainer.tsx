import { ReactComponent as TightScheduleIcon } from "@/assets/icons/tightSchedule.svg";
import { Button, Typography } from "@/components";
import { cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

export const ProfileContainer = () => {
  return (
    <div css={cssAlignVerticalStyle({ gap: 16, alignItems: "flex-start" })}>
      <Typography>프로필</Typography>
      <Button size="large">버튼1</Button>
      <Button bgColor={COLORS.PINK3} color={COLORS.WHITE}>
        버튼2
      </Button>
      <Button
        icon={<TightScheduleIcon fill={COLORS.PINK3} />}
        bgColor={COLORS.GRAY1}
      >
        빠듯하게
      </Button>
      <Button disabled>비활성 버튼</Button>
    </div>
  );
};
