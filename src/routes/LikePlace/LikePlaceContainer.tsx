import { css } from "@emotion/react";
import { useEffect } from "react";
import { useHeaderState } from "states/useHeader";

import NotFound from "@/components/NotFound/NotFound";

export const LikePlaceContainer = () => {
  const { setTitle } = useHeaderState();

  useEffect(() => {
    setTitle("좋아요한 여행 장소");
  }, [setTitle]);

  return (
    <div>
      <NotFound
        mainText="아직 좋아요한 여행 장소가 없습니다"
        subText="여행 정보 탭에서 마음에 드는 장소에 하트를 눌러 주세요!"
        detailStyle={css`
          margin-top: 100px;
        `}
      />
    </div>
  );
};
