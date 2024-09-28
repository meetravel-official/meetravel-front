import { css, SerializedStyles } from "@emotion/react";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

import { cssCheckboxStyle } from "./Checkbox.styles";

interface ICheckboxProps {
  checked: boolean;
  onChange?: (checkValue: boolean) => void;
  detailStyle?: SerializedStyles;
}

const Checkbox = ({ checked, onChange, detailStyle }: ICheckboxProps) => {
  return (
    <div
      css={css`
        ${cssCheckboxStyle}
        ${detailStyle}
      `}
    >
      <RadixCheckbox.Root
        className="checkbox-root"
        checked={checked}
        onCheckedChange={onChange}
        id="c1"
      >
        <RadixCheckbox.Indicator className="checkbox-indicator">
          <CheckIcon />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
    </div>
  );
};

export default Checkbox;
