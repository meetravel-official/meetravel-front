import { useEffect, useState } from "react";

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
  src?: string;
  alt: string;
  draggable?: boolean;
}

/**
 * Image 이미지 컴포넌트(로딩, 에러 처리)
 * 이미지 로딩 시 로딩 화면 표시, 이미지 로딩 실패 시 실패 이미지 표시 처리함
 * lazy loading 적용
 * @param src 이미지 주소(없으면 계속 로딩으로 표시)
 * @param alt 이미지 대체 텍스트(필수)
 * @param width 이미지 너비(default: 100%)
 * @param height 이미지 높이(default: auto)
 * @param objectFit 이미지 크기 조절(default: cover)
 * @param draggable 드래그 가능 여부(default: false)
 */
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

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
  }, [src]);

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
