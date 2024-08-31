import { css } from "@emotion/react";

import { COLORS } from "@/styles/color";

import { IToggleStyle } from "./ToggleSwitch";

type TToggleSwitchStyle = Pick<IToggleStyle, "detailStyle">;

export const cssToggleSwitchStyle = ({
  detailStyle,
}: TToggleSwitchStyle) => css`
  button {
    all: unset;
  }
  position: relative;
  cursor: pointer;
  .toggle-container {
    width: 56px;
    height: 34px;
    border-radius: 17px;
    border: 1px solid ${COLORS.GRAY2};
    border-radius: 30px;
  }
  .toggle-circle {
    position: absolute;
    top: 50%;
    margin-top: -17px;
    left: 3px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background-color: rgb(255, 254, 255);
    transition: all 0.3s;
    border: 1px solid ${COLORS.GRAY2};
  }
  .toggle-checked {
    left: 25px;
    transition: 0.5s;
    background-color: ${COLORS.SITUATION2};
    border: 1px solid ${COLORS.SITUATION2};
  }
  ${detailStyle}
`;
