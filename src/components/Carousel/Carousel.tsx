import React, { ReactNode, useCallback, useEffect, useRef } from "react";

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
  const carouselRef = useRef<HTMLDivElement>(null);
  const startX = useRef<number>(0);
  const moveX = useRef<number>(0);

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

  const handleOnTouchDown = (event: TouchEvent) => {
    startX.current = event.touches[0].clientX;
  };

  const handleOnTouchMove = useCallback(
    (event: TouchEvent) => {
      if (startX.current)
        moveX.current = event.touches[0].clientX - startX.current;
      if (moveX.current > 50) {
        setCurrentIndex((prevIndex) => (prevIndex > 1 ? prevIndex - 1 : 1));
        startX.current = 0;
        moveX.current = 0;
      } else if (moveX.current < -50) {
        setCurrentIndex((prevIndex) =>
          prevIndex < children.length ? prevIndex + 1 : children.length
        );
        startX.current = 0;
        moveX.current = 0;
      }
    },
    [children.length]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev === infiniteArray(children).length - 2) {
          return 1;
        }
        return prev + 1;
      });
    }, 5000);
    return () => {
      if (timer) clearInterval(timer);
    };
  });

  useEffect(() => {
    const carouselElement = carouselRef.current;
    carouselElement?.addEventListener("touchstart", handleOnTouchDown);
    carouselElement?.addEventListener("touchmove", handleOnTouchMove);

    return () => {
      carouselElement?.removeEventListener("touchstart", handleOnTouchDown);
      carouselElement?.removeEventListener("touchmove", handleOnTouchMove);
    };
  }, [handleOnTouchMove]);

  return (
    <div css={cssCarouselStyle} ref={carouselRef}>
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
