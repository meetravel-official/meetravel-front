import { css } from "@emotion/react";

import { cssAlignVerticalStyle } from "@/styles/align";

export const cssHomeContainerStyle = css`
  min-height: calc(var(--vh, 1vh) * 100 - 64px - 32px);
  ${cssAlignVerticalStyle({ gap: 16, justifyContent: "space-between" })}
`;
