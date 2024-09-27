import { useCallback } from "react";

import { cssAlignHorizontalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import { ArrowButton } from "../ArrowButton/ArrowButton";
import { Typography } from "../Typography/Typography";
import { cssPageNumStyle } from "./Pagination.styles";

interface PaginationProps {
  page: number;
  maxPage: number;
  setPage: (page: number) => void;
}
export const Pagination = ({ page, maxPage, setPage }: PaginationProps) => {
  const handleOnClickPrevPage = useCallback(() => {
    if (page > 0) setPage(page - 1);
  }, [page, setPage]);

  const handleOnClickNextPage = useCallback(() => {
    if (page < maxPage - 1) setPage(page + 1);
  }, [maxPage, page, setPage]);

  return (
    <div css={cssAlignHorizontalStyle({ gap: 39 })}>
      <ArrowButton
        direction="left"
        onClick={handleOnClickPrevPage}
        disabled={page === 0}
      />
      <div css={cssAlignHorizontalStyle({ gap: 1 })}>
        <div css={cssPageNumStyle}>
          <Typography color={COLORS.GRAY4} weight={700} size="20">
            {page + 1}
          </Typography>
        </div>
        <Typography color={COLORS.GRAY3} weight={700} size="20">
          /
        </Typography>
        <div css={cssPageNumStyle}>
          <Typography color={COLORS.GRAY3} weight={700} size="20">
            {maxPage}
          </Typography>
        </div>
      </div>
      <ArrowButton
        direction="right"
        onClick={handleOnClickNextPage}
        disabled={page === maxPage - 1}
      />
    </div>
  );
};
