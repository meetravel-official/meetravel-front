import { useState } from "react";

import NoImageSvg from "@/assets/icons/no-image.svg";

import {
  cssImageContainerStyle,
  cssImageStyle,
  cssLoadingStyle,
  cssNoImageStyle,
} from "./Image.styles";

export interface ImageStyle {
  width?: string;
  height?: string;
  objectFit?: React.CSSProperties["objectFit"];
}

interface ImageProps extends ImageStyle {
  src: string;
  alt: string;
  draggable?: boolean;
}

export const Image = ({
  src,
  alt,
  width,
  height,
  objectFit,
  draggable = false,
}: ImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const handleOnLoad = () => {
    setIsLoading(false);
  };

  return isError ? (
    <div css={cssNoImageStyle({ width, height })}>
      <img src={NoImageSvg} alt={alt} draggable={false} />
    </div>
  ) : (
    <div css={cssImageContainerStyle({ width, height })}>
      <img
        className="image"
        css={cssImageStyle({ width, height, objectFit })}
        src={src}
        alt={alt}
        onError={() => {
          setIsError(true);
        }}
        onLoad={handleOnLoad}
        draggable={draggable}
        loading="lazy"
      />
      {isLoading && <div css={cssLoadingStyle} />}
    </div>
  );
};
