import React from "react";

import { Typography } from "@/components";
import { Carousel } from "@/components/Carousel/Carousel";
import { COLORS } from "@/styles/color";

import {
  cssPostCarouselItemDateStyle,
  cssPostCarouselItemImageStyle,
  cssPostCarouselItemStyle,
  cssPostCarouselItemTitleStyle,
} from "./PostCarousel.styles";
export const PostCarousel = () => {
  const dummyPosts = [
    {
      subTitle: "미트래블이 선정한",
      title: "10월 여행지 추천",
      imgSrc:
        "https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      date: "2024/09/16",
    },
    {
      subTitle: "미트래블이 선정한",
      title: "10월 여행지 추천",
      imgSrc:
        "https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      date: "2024/09/16",
    },
    {
      subTitle: "미트래블이 선정한",
      title: "10월 여행지 추천",
      imgSrc:
        "https://images.unsplash.com/photo-1550133730-695473e544be?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      date: "2024/09/16",
    },
    {
      subTitle: "미트래블이 선정한",
      title: "10월 여행지 추천",
      imgSrc:
        "https://images.unsplash.com/photo-1550167164-1b67c2be3973?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      date: "2024/09/16",
    },
    {
      subTitle: "미트래블이 선정한",
      title: "10월 여행지 추천",
      imgSrc:
        "https://images.unsplash.com/photo-1550338861-b7cfeaf8ffd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      date: "2024/09/16",
    },
  ];
  return (
    <Carousel>
      {dummyPosts.map((post, index) => (
        <div css={cssPostCarouselItemStyle} key={index}>
          <div css={cssPostCarouselItemTitleStyle}>
            {post.subTitle && (
              <Typography size="16" color={COLORS.GRAY1} weight="bold">
                {post.subTitle}
              </Typography>
            )}
            <Typography size="24" color={COLORS.GRAY1} weight="bold">
              {post.title}
            </Typography>
          </div>
          <img
            css={cssPostCarouselItemImageStyle}
            alt={post.imgSrc}
            src={post.imgSrc}
            draggable={false}
          />
          <div css={cssPostCarouselItemDateStyle}>
            <Typography size="12" color={COLORS.GRAY2} weight="regular">
              {post.date}
            </Typography>
          </div>
        </div>
      ))}
    </Carousel>
  );
};
