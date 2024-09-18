import { css } from "@emotion/react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

import { Button, Typography } from "@/components";
import NotFound from "@/components/NotFound/NotFound";
import { COLORS } from "@/styles/color";

import { pageRoutes } from ".";

const NotFoundPage = () => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        height: calc(100vh - 160px);
      `}
    >
      <NotFound
        mainText="존재하지 않는 페이지입니다."
        subText={
          <Fragment>
            <Typography
              size="12"
              color={COLORS.GRAY3}
              detailStyle={css`
                display: flex;
                text-align: center;
              `}
            >
              버튼을 눌러
              <br />
              홈으로 이동해주세요.
            </Typography>
            <Link to={pageRoutes.ROOT}>
              <Button
                detailStyle={css`
                  padding: 6px 10px;
                  background-color: ${COLORS.PINK2};
                  color: ${COLORS.WHITE};
                `}
              >
                홈으로 이동
              </Button>
            </Link>
          </Fragment>
        }
      />
    </div>
  );
};
export default NotFoundPage;
