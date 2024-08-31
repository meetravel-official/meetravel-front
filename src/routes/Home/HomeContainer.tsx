import { css } from "@emotion/react";
import { useState } from "react";

import { ReactComponent as Bell } from "@/assets/icons/bell.svg";
import { ReactComponent as Pen } from "@/assets/icons/pen.svg";
import { ReactComponent as Search } from "@/assets/icons/search.svg";
import { Button, Typography } from "@/components";
import Input from "@/components/Input/Input";
import { cssAlignHorizontalStyle, cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import { BannerCarousel } from "./components/BannerCarousel";
import { cssHomeContainerStyle } from "./HomeContainer.styles";
export const HomeContainer = () => {
  const [value, setValue] = useState<string>("");

  return (
    <div css={cssHomeContainerStyle}>
      <div css={cssAlignVerticalStyle({ gap: 28 })}>
        <Input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          placeholder="어디로 여행을 떠날까요?"
          suffix={<Search />}
          detailStyle={css`
            background: #fff;
            outline: 1px solid ${COLORS.PINK3};
            width: 100%;
          `}
        />
        <div css={cssAlignVerticalStyle({ gap: 20 })}>
          <BannerCarousel />
          <div css={cssAlignVerticalStyle({ gap: 8 })}>
            <Button
              icon={<Bell />}
              height="large"
              align="start"
              link
              linkColor={COLORS.GRAY2}
            >
              <Typography color={COLORS.GRAY4} weight="bold" size={16}>
                알림 내역
              </Typography>
            </Button>
            <Button
              icon={<Pen />}
              height="large"
              align="start"
              link
              linkColor={COLORS.GRAY2}
            >
              <div css={cssAlignHorizontalStyle({ gap: 4 })}>
                <Typography color={COLORS.GRAY4} weight="bold" size={16}>
                  작성할 수 있는 후기
                </Typography>
                <Typography color={COLORS.PINK3} weight="bold" size={16}>
                  +12
                </Typography>
              </div>
            </Button>
          </div>
        </div>
      </div>

      <div css={cssAlignVerticalStyle({ gap: 16 })}>
        <Typography color={COLORS.GRAY3} weight="bold" size="16">
          다양한 사람들과 여행을 떠나볼까요?
        </Typography>
        <Button bgColor={COLORS.PINK3}>
          <div>
            <Typography color={COLORS.WHITE} weight="bold">
              매칭 시작!
            </Typography>{" "}
            <Typography color={COLORS.PINK1} weight="bold">
              (매칭 기회 2번)
            </Typography>
          </div>
        </Button>
      </div>
    </div>
  );
};
