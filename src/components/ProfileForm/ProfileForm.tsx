import dayjs from "dayjs";

import { useGetMyPage } from "@/api/hooks/user";
import { ReactComponent as IntroduceIcon } from "@/assets/icons/introduce-me.svg";
import { Typography, UserAvatar } from "@/components";
import { cssAlignHorizontalStyle, cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import { Spin } from "../Spin/Spin";

interface ProfileFormProps {
  userId?: string;
  isMy?: boolean;
}

export const ProfileForm = ({ userId, isMy }: ProfileFormProps) => {
  const { data: myProfileData, isLoading } = useGetMyPage();

  const profileData = isMy ? myProfileData : undefined;

  return isLoading ? (
    <div
      css={cssAlignVerticalStyle({
        alignItems: "center",
        justifyContent: "center",
      })}
    >
      <Spin size={36} />
    </div>
  ) : (
    <div
      css={cssAlignVerticalStyle({
        gap: 50,
        alignItems: "flex-start",
        width: "100%",
      })}
    >
      <div css={cssAlignVerticalStyle({ gap: 12 })}>
        <UserAvatar profileUrl={profileData?.profileImageUrl || ""} size={80} />
        <div css={cssAlignVerticalStyle({ gap: 4 })}>
          <Typography color={COLORS.GRAY5} size="16" weight={700}>
            {profileData?.nickname || "-"}
          </Typography>
          <div css={cssAlignHorizontalStyle({ gap: 4 })}>
            <Typography color={COLORS.GRAY3} weight={700} size="16">
              {profileData?.gender === "남성" ? "男" : "女"}
            </Typography>
            <Typography color={COLORS.GRAY4} weight={400} size="16">
              {profileData?.birthDate
                ? dayjs(profileData?.birthDate, "YYYY-MM-DD").format("YYYY년생")
                : "-"}
            </Typography>
          </div>
        </div>
      </div>
      <div css={cssAlignVerticalStyle({ gap: 8, alignItems: "flex-start" })}>
        <div css={cssAlignHorizontalStyle({ gap: 9 })}>
          <IntroduceIcon />
          <Typography color={COLORS.GRAY3} size={16} weight={700}>
            사실 저는 어떤 사람이냐면요...
          </Typography>
        </div>
        <Typography color={COLORS.GRAY4} size={16} weight={700}>
          저는 1년에 여행을{" "}
          {profileData?.travelFrequency === "안가요!" ? (
            "잘 가지 않아요."
          ) : (
            <span>
              <Typography color={COLORS.PINK3} size={16} weight={700}>
                {profileData?.travelFrequency || "- "}
                {profileData?.travelFrequency !== "7번 이상"
                  ? "번 정도"
                  : ""}{" "}
              </Typography>
              가요!
            </span>
          )}
        </Typography>
        <Typography color={COLORS.GRAY4} size={16} weight={700}>
          여행 취향은{" "}
          <Typography color={COLORS.PINK3} size={16} weight={700}>
            '{profileData?.scheduleType} {profileData?.planningType}'
          </Typography>
          ,
        </Typography>
        <Typography color={COLORS.GRAY4} size={16} weight={700}>
          취미는{" "}
          <Typography color={COLORS.PINK3} size={16} weight={700}>
            {profileData?.hobby || "-"}{" "}
          </Typography>
          예요.
        </Typography>
        <Typography color={COLORS.GRAY4} size={16} weight={700}>
          MBTI는{" "}
          <Typography color={COLORS.PINK3} size={16} weight={700}>
            {profileData?.mbti || "-"}
          </Typography>
          입니다.
        </Typography>
        <Typography color={COLORS.GRAY4} size={16} weight={700}>
          한줄로 소개해보자면...
        </Typography>
        <Typography color={COLORS.PINK3} size={16} weight={700}>
          "{profileData?.intro || "-"}"
        </Typography>
        <Typography color={COLORS.GRAY4} size={16} weight={700}>
          라고 말하고 싶습니다.
        </Typography>
      </div>
    </div>
  );
};
