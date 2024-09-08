import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

import { cssCheckboxStyle } from "./Checkbox.styles";

interface ICheckboxProps {
  checked: boolean;
}

const Checkbox = ({ checked }: ICheckboxProps) => {
  return (
    <div css={cssCheckboxStyle}>
      <RadixCheckbox.Root className="checkbox-root" checked={checked} id="c1">
        <RadixCheckbox.Indicator className="checkbox-indicator">
          <CheckIcon />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
    </div>
  );
};

export default Checkbox;
