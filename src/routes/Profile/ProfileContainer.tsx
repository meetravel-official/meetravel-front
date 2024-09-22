import { usePostKaKaoSignOut } from "@/api/hooks/auth";
import { Button, Typography } from "@/components";
import { cssAlignVerticalStyle } from "@/styles/align";
export const ProfileContainer = () => {
  const mutationLogOut = usePostKaKaoSignOut();

  const handleLogOut = () => {
    mutationLogOut.mutate();
  };
  // TODO: 테스트를 위한 임시 로그아웃 기능 추가
  return (
    <div css={cssAlignVerticalStyle({ gap: 16, alignItems: "flex-start" })}>
      <Typography>프로필</Typography>
      <Button onClick={handleLogOut}>로그아웃</Button>
    </div>
  );
};
