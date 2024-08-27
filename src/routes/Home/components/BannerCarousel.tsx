import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

import { Typography } from "@/components";
import { Carousel } from "@/components/Carousel/Carousel";
import { COLORS } from "@/styles/color";

import {
  cssBannerCarouselItemDateStyle,
  cssBannerCarouselItemImageStyle,
  cssBannerCarouselItemStyle,
  cssBannerCarouselItemTitleStyle,
} from "./BannerCarousel.styles";
export const BannerCarousel = () => {
  const dummyBanners = [
    {
      subTitle: "미트래블이 선정한",
      title: "10월 여행지 추천",
      imgSrc:
        "https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      date: "2024/09/16",
      link: "/post/1",
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

  const BannerWrapper = ({
    link,
    children,
  }: {
    link?: string;
    children: ReactNode;
  }) => (link ? <Link to={link}>{children}</Link> : <div>{children}</div>);
  return (
    <Carousel>
      {dummyBanners.map((banner, index) => (
        <BannerWrapper link={banner.link} key={index}>
          <div css={cssBannerCarouselItemStyle}>
            <div css={cssBannerCarouselItemTitleStyle}>
              {banner.subTitle && (
                <Typography size="16" color={COLORS.GRAY1} weight="bold">
                  {banner.subTitle}
                </Typography>
              )}
              <Typography size="24" color={COLORS.GRAY1} weight="bold">
                {banner.title}
              </Typography>
            </div>
            <img
              css={cssBannerCarouselItemImageStyle}
              alt={banner.imgSrc}
              src={banner.imgSrc}
              draggable={false}
            />
            <div css={cssBannerCarouselItemDateStyle}>
              <Typography size="12" color={COLORS.GRAY2} weight="regular">
                {banner.date}
              </Typography>
            </div>
          </div>
        </BannerWrapper>
      ))}
    </Carousel>
  );
};
