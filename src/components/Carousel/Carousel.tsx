import React, { ReactNode } from "react";

import {
  cssCarouselDotBoxStyle,
  cssCarouselDotStyle,
  cssCarouselInnerStyle,
  cssCarouselItemStyle,
  cssCarouselStyle,
} from "./Carousel.styles";

interface CarouselProps {
  children: ReactNode[];
}
export const Carousel = ({ children }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = React.useState<number>(1);

  const infiniteArray = (arr: ReactNode[]) => {
    const startItem = arr[0];
    const endItem = arr[arr.length - 1];
    const modifiedArray = [endItem, ...arr, startItem];
    return modifiedArray;
  };

  const handleOnClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div css={cssCarouselStyle}>
      <div css={cssCarouselInnerStyle(currentIndex, children.length)}>
        {infiniteArray(children).map((child, index) => (
          <div css={cssCarouselItemStyle} key={index}>
            {child}
          </div>
        ))}
      </div>
      <div css={cssCarouselDotBoxStyle}>
        {React.Children.map(children, (_child, index) => (
          <button
            key={index}
            css={cssCarouselDotStyle(index === currentIndex - 1)}
            onClick={() => handleOnClick(index + 1)}
          />
        ))}
      </div>
    </div>
  );
};
