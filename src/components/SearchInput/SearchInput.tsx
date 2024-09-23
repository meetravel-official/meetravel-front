import { useRef } from "react";

import { ReactComponent as Search } from "@/assets/icons/search.svg";
import { COLORS } from "@/styles/color";

import {
  cssInputIconStyle,
  cssInputStyle,
  cssSearchInputWrapperStyle,
} from "./SearchInput.styles";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  borderColor?: string;
  placeholderColor?: string;
  color?: string;
  onClickSearch?: (inputValue?: string) => void;
}
export const SearchInput = ({
  borderColor = COLORS.GRAY3,
  placeholderColor = COLORS.GRAY2,
  color = COLORS.GRAY4,
  onClickSearch,
  ...inputProps
}: SearchInputProps) => {
  const ref = useRef<HTMLInputElement | null>(null);

  return (
    <div css={cssSearchInputWrapperStyle({ borderColor })}>
      <input
        ref={ref}
        type="input"
        css={cssInputStyle({ placeholderColor, color })}
        {...inputProps}
      />
      <button
        css={cssInputIconStyle}
        onClick={(e) => {
          e.preventDefault();
          if (onClickSearch) {
            onClickSearch(ref.current?.value);
          }
        }}
      >
        <Search />
      </button>
    </div>
  );
};
