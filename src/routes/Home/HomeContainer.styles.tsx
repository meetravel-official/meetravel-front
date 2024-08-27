import { css } from "@emotion/react";

import { cssAlignVerticalStyle } from "@/styles/align";

export const cssHomeContainerStyle = css`
  height: calc(100vh - 64px - 32px);
  ${cssAlignVerticalStyle({ gap: 16, justifyContent: "space-between" })}
`;
