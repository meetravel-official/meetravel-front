import { SerializedStyles } from "@emotion/react";
import * as RadixSelect from "@radix-ui/react-select";
import { PropsWithChildren, useState } from "react";

import { ReactComponent as SelectArrow } from "@/assets/icons/select-arrow.svg";
import { COLORS } from "@/styles/color";

import { cssSelectStyle } from "./Select.styles";

export interface ISelectStyle {
  selectOptions: { key: string | number; value: string }[];
  placeholder?: string;
  value?: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  width?: number | string;
  bgColor?: string;
  color?: string;
  borderWidth?: number;
  borderColor?: string;
  borderStyle?: string;
  disabled?: boolean;
  detailStyles?: SerializedStyles;
}

type TSelectProps = PropsWithChildren & ISelectStyle;
/**
 * Select component
 * @param selectOptions select components option items, default: {key: string, value: string}[]
 * @param placeholder select components placeholder, default: 선택하세요
 * @param value select components default value, default: string
 * @param onChange select components onChange event
 * @param width select width, default: 100%
 * @param bgColor select background color, default: #FFFFFF(WHITE)
 * @param color select color, default: #FF6B9C(PINK3)
 * @param borderWidth select border width, default: 1
 * @param borderColor select border color, default: #FF6B9C(PINK3)
 * @param borderStyle select border style, default: #FF6B9C(PINK3)
 * @param disabled default: false
 * @param detailStyle 기타 세부 css 전달
 */

const Select = ({
  selectOptions,
  placeholder,
  value,
  onChange,
  width,
  bgColor = COLORS.WHITE,
  color = COLORS.PINK3,
  borderWidth = 2,
  borderColor = COLORS.PINK3,
  borderStyle = "solid",
  disabled,
  detailStyles,
}: TSelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const groupWidth = window.document
    .querySelector(".select-trigger")
    ?.getBoundingClientRect().width;
  const filteredOptions = selectOptions.filter((x) => x.value !== value);

  return (
    <div
      css={cssSelectStyle({
        width,
        bgColor,
        color,
        borderWidth,
        borderColor,
        borderStyle,
        disabled,
        isOpen,
        detailStyles,
      })}
    >
      <RadixSelect.Root
        value={value}
        onValueChange={(item) => onChange(item)}
        onOpenChange={(state) => setIsOpen(state)}
      >
        <RadixSelect.Trigger className="select-trigger">
          <RadixSelect.Value
            asChild
            placeholder={placeholder || "선택하세요"}
          />
          {value}
          <div
            className="select-icon"
            style={{ transform: isOpen ? "rotate(0deg)" : "rotate(90deg)" }}
          >
            <SelectArrow
              stroke={borderColor}
              strokeWidth={2}
              height="12px"
              width="12px"
            />
          </div>
        </RadixSelect.Trigger>
        <RadixSelect.Content
          className="select-content"
          style={{ width: groupWidth }}
        >
          <RadixSelect.Group className="select-group">
            {filteredOptions
              .filter((selected) => selected.key !== value)
              .map((item) => (
                <RadixSelect.Item
                  key={item.key}
                  value={item.value}
                  className="select-item"
                >
                  {item.value}
                </RadixSelect.Item>
              ))}
          </RadixSelect.Group>
          <RadixSelect.Separator />
        </RadixSelect.Content>
      </RadixSelect.Root>
    </div>
  );
};

export default Select;
