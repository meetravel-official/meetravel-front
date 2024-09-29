import { css } from "@emotion/react";
import { useEffect } from "react";
import { useHeaderState } from "states/useHeader";

import NotFound from "@/components/NotFound/NotFound";

export const NotificationContainer = () => {
  const { setTitle } = useHeaderState();

  useEffect(() => {
    setTitle("알림 내역");
  }, [setTitle]);

  return (
    <div>
      <NotFound
        mainText="아직 알림이 없어요!"
        detailStyle={css`
          margin-top: 100px;
        `}
      />
    </div>
  );
};