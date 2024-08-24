import { css } from "@emotion/react";

import { WIDTH } from "./breakpoint";
import { COLORS } from "./color";

export const cssGlobalStyle = css`
  @import url("https://cdnjs.cloudflare.com/ajax/libs/pretendard/1.3.9/variable/pretendardvariable-dynamic-subset.min.css");

  body {
    overflow-x: hidden; // 좌우로 스크롤 땡기지 못하도록 설정
    background: ${COLORS.GRAY2};
    margin: 0;
    padding: 0;
    font-family: "Pretendard Variable", Pretendard, -apple-system,
      BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI",
      "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic",
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;

    a {
      text-decoration: none;
    }

    @media screen and (max-width: ${WIDTH.SM}) {
      overflow-x: scroll;
      background: ${COLORS.WHITE};
    }
  }

  a,
  button {
    -webkit-tap-highlight-color: transparent !important; // 모바일에서 링크 클릭 시 하이라이트 제거
  }
`;
