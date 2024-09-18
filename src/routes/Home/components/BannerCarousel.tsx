import React, { Fragment, useState } from "react";

import { useGetGallerySearchList } from "@/api/hooks/visitKorea";
import { Typography } from "@/components";
import { Carousel } from "@/components/Carousel/Carousel";
import { COLORS } from "@/styles/color";

import {
  cssBannerCarouselItemDateStyle,
  cssBannerCarouselItemImageStyle,
  cssBannerCarouselItemStyle,
  cssBannerCarouselItemTitleStyle,
} from "./BannerCarousel.styles";
import { PostModal } from "./PostModal/PostModal";
export const BannerCarousel = () => {
  const [isOpenPostModal, setIsOpenPostModal] = useState(false);
  const [scrollTo, setScrollTo] = useState("");

  const { data: kyeonjunamsanData } = useGetGallerySearchList("경주 남산");
  const { data: bulguksaData } = useGetGallerySearchList("불국사");
  const { data: junjuhanokData } = useGetGallerySearchList("전주 한옥마을");

  const banners = [
    {
      subTitle: "미트래블이 선정한",
      title: "9월 추천 여행지",
      imgSrc:
        kyeonjunamsanData?.data?.response?.body?.items?.item?.[0]
          .galWebImageUrl,
      date: "2024/09/02",
    },
    {
      subTitle: "미트래블이 선정한",
      title: "9월 추천 여행지",
      imgSrc:
        bulguksaData?.data?.response?.body?.items?.item?.[0].galWebImageUrl,
      date: "2024/09/02",
      id: "불국사",
    },
    {
      subTitle: "미트래블이 선정한",
      title: "9월 추천 여행지",
      imgSrc:
        junjuhanokData?.data?.response?.body?.items?.item?.[0].galWebImageUrl,
      date: "2024/09/02",
      id: "전주 한옥마을",
    },
  ];

  const handleOnOpenPostModal = (scrollTo?: string) => {
    setIsOpenPostModal(true);
    setScrollTo(scrollTo || "");
  };

  return (
    <Fragment>
      <Carousel>
        {banners.map((banner, index) => (
          <button
            key={index}
            css={cssBannerCarouselItemStyle}
            onClick={() => handleOnOpenPostModal(banner.id)}
          >
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
          </button>
        ))}
      </Carousel>
      <PostModal
        isOpen={isOpenPostModal}
        onClose={() => {
          setIsOpenPostModal(false);
        }}
        scrollTo={scrollTo}
      />
    </Fragment>
  );
};
