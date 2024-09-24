import { css } from "@emotion/react";

import { ReactComponent as IntroduceIcon } from "@/assets/icons/introduce-me.svg";
import { Typography, UserAvatar } from "@/components";
import { cssAlignHorizontalStyle, cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";
export const ProfileContainer = () => {
  return (
    <div
      css={css`
        ${cssAlignVerticalStyle({ gap: 50, alignItems: "flex-start" })}
        margin-top: 50%;
      `}
    >
      <div css={cssAlignVerticalStyle({ gap: 12 })}>
        <UserAvatar profileUrl="" size={80} />
        <div css={cssAlignVerticalStyle({ gap: 4 })}>
          <Typography color={COLORS.GRAY5} size="16" weight={700}>
            닉네임
          </Typography>
          <div css={cssAlignHorizontalStyle({ gap: 4 })}>
            <Typography color={COLORS.GRAY3} weight={700} size="16">
              女
            </Typography>
            <Typography color={COLORS.GRAY4} weight={400} size="16">
              1997년생
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
          <Typography color={COLORS.PINK3} size={16} weight={700}>
            1~3번
          </Typography>
          정도 가요!
        </Typography>
        <Typography color={COLORS.GRAY4} size={16} weight={700}>
          여행 취향은{" "}
          <Typography color={COLORS.PINK3} size={16} weight={700}>
            '빠듯하게 즉흥적으로'
          </Typography>
          ,
        </Typography>
        <Typography color={COLORS.GRAY4} size={16} weight={700}>
          MBTI는{" "}
          <Typography color={COLORS.PINK3} size={16} weight={700}>
            ISTP
          </Typography>
          입니다.
        </Typography>
        <Typography color={COLORS.GRAY4} size={16} weight={700}>
          한줄로 소개해보자면...
        </Typography>
        <Typography color={COLORS.PINK3} size={16} weight={700}>
          "한줄 소개"
        </Typography>
        <Typography color={COLORS.GRAY4} size={16} weight={700}>
          라고 말하고 싶습니다.
        </Typography>
      </div>
    </div>
  );
};
