import { SerializedStyles } from "@emotion/react";

import { cssToggleSwitchStyle } from "./ToggleSwitch.styles";

export interface IToggleStyle {
  isOn: boolean;
  handleToggle: () => void;
  detailStyle?: SerializedStyles;
}
/**
 *
 * ToggleSwitch component
 * @param isOn toggle switch state, default: false
 * @param handleToggle toggle switch event
 * @param detailStyle 기타 세부 css 전달
 */

export const ToggleSwitch = ({
  isOn,
  handleToggle,
  detailStyle,
}: IToggleStyle) => {
  return (
    <div css={cssToggleSwitchStyle({ detailStyle })}>
      <button onClick={handleToggle}>
        <div className={`toggle-container`} />
        <div className={`toggle-circle ${isOn ? "toggle-checked" : ""}`} />
      </button>
    </div>
  );
};
