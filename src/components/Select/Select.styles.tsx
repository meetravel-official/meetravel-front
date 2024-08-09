import { css } from "@emotion/react";

import { COLORS } from "@/styles/color";

export const cssSelectStyle = () => css`
  button {
    all: unset;
  }
  .selectTrigger {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    padding: 0 15px;
    font-size: 13px;
    line-height: 1;
    width: fit-content;
    height: 35px;
    gap: 5px;
    background-color: orange;
    color: white;
    box-shadow: 0 2px 10px ${COLORS.GRAY3};
  }

  .SelectTrigger:focus {
    box-shadow: 0 0 0 2px pink;
  }
  .SelectTrigger[data-placeholder] {
    color: red;
  }

  .selectContent {
    overflow: hidden;
    background-color: pink;
    border-radius: 6px;
    box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35),
      0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  }
  .selectLabel {
    padding: 0 25px;
    font-size: 12px;
    line-height: 25px;
    color: #c5c0c0;
  }
  .selectItem {
    font-size: 13px;
    line-height: 1;
    color: green;
    border-radius: 3px;
    display: flex;
    align-items: center;
    height: 25px;
    padding: 0 15px;
    position: relative;
    &:hover {
      background-color: lightblue;
    }
  }
`;
