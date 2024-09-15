import { css } from "@emotion/react";

import { Typography } from "@/components";
import NotFound from "@/components/NotFound/NotFound";
import { COLORS } from "@/styles/color";

const NotFoundChat = () => {
  return (
    <div
      css={css`
        /* TODO: 중앙정렬 확정시 추가 160px 수정필요
         display: flex;
        justify-content: center;
        align-items: center;
        height: calc(100vh - 160px); */

        margin-top: 100px;
      `}
    >
      <NotFound
        mainText="아직 매칭된 여행이 없어요!"
        subText={
          <Typography
            size="12"
            color={COLORS.GRAY3}
            detailStyle={css`
              display: flex;
              text-align: center;
            `}
          >
            여행 시작 버튼을 눌러
            <br />
            매칭 신청서를 작성해보세요.
          </Typography>
        }
      />
    </div>
  );
};
export default NotFoundChat;
