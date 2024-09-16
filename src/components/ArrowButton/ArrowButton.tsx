import { ReactComponent as ArrowLeft } from "@/assets/icons/arrow-left-3.svg";
import { ReactComponent as ArrowRight } from "@/assets/icons/arrow-right-3.svg";

import { cssArrowButtonStyle } from "./ArrowButton.styles";

interface ArrowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  direction: "left" | "right";
}

export const ArrowButton = ({ direction, ...props }: ArrowButtonProps) => {
  return (
    <button
      css={cssArrowButtonStyle({ direction, disabled: props.disabled })}
      {...props}
    >
      {direction === "left" ? <ArrowLeft /> : <ArrowRight />}
    </button>
  );
};
