import * as RadixSelect from "@radix-ui/react-select";

import { cssSelectStyle } from "./Select.styles";

const SelectItems = [
  { value: "apple", children: "Apple" },
  { value: "banana", children: "Banana" },
  { value: "blueberry", children: "Blueberry" },
  { value: "grapes", children: "Grapes" },
  { value: "pineapple", children: "Pineapple" },
  { value: "aubergine", children: "Aubergine" },
  { value: "broccoli", children: "Broccoli" },
  { value: "carrot", children: "Carrot" },
  { value: "courgette", children: "Courgette" },
  { value: "leek", children: "Leek" },
  { value: "beef", children: "Beef" },
  { value: "chicken", children: "Chicken" },
  { value: "lamb", children: "Lamb" },
  { value: "pork", children: "Pork" },
];
const Select = () => (
  <div css={cssSelectStyle}>
    <RadixSelect.Root defaultValue={SelectItems[0].value}>
      <RadixSelect.Trigger className="selectTrigger">
        <RadixSelect.Value placeholder="선택하세요" />
      </RadixSelect.Trigger>
      <RadixSelect.Content className="selectContent">
        <RadixSelect.Group>
          <RadixSelect.Label className="selectLabel">Fruits</RadixSelect.Label>
          {SelectItems.map((item) => (
            <RadixSelect.Item
              key={item.value}
              value={item.value}
              className="selectItem"
            >
              {item.children}
            </RadixSelect.Item>
          ))}
        </RadixSelect.Group>
        <RadixSelect.Separator />
      </RadixSelect.Content>
    </RadixSelect.Root>
  </div>
);

export default Select;
