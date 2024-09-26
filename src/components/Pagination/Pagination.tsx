import { useCallback } from "react";

import { cssAlignHorizontalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import { ArrowButton } from "../ArrowButton/ArrowButton";
import { Typography } from "../Typography/Typography";

interface PaginationProps {
  page: number;
  maxPage: number;
  setPage: (page: number) => void;
}
export const Pagination = ({ page, maxPage, setPage }: PaginationProps) => {
  const handleOnClickPrevPage = useCallback(() => {
    if (page > 1) setPage(page - 1);
  }, [page, setPage]);

  const handleOnClickNextPage = useCallback(() => {
    if (page < maxPage) setPage(page + 1);
  }, [maxPage, page, setPage]);

  return (
    <div css={cssAlignHorizontalStyle({ gap: 39 })}>
      <ArrowButton
        direction="left"
        onClick={handleOnClickPrevPage}
        disabled={page === 1}
      />
      <div>
        <Typography color={COLORS.GRAY4} weight={700} size="20">
          {page}{" "}
        </Typography>
        <Typography color={COLORS.GRAY3} weight={700} size="20">
          / {maxPage}
        </Typography>
      </div>
      <ArrowButton
        direction="right"
        onClick={handleOnClickNextPage}
        disabled={page === maxPage}
      />
    </div>
  );
};
