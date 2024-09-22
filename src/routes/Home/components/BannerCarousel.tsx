import dayjs from "dayjs";
import React, { Fragment, useMemo, useState } from "react";

import { useGetGallerySearchListByKeywordList } from "@/api/hooks/visitKorea";
import { Image, Typography } from "@/components";
import { Carousel } from "@/components/Carousel/Carousel";
import { COLORS } from "@/styles/color";

import {
  cssBannerCarouselItemDateStyle,
  cssBannerCarouselItemImageStyle,
  cssBannerCarouselItemStyle,
  cssBannerCarouselItemTitleStyle,
} from "./BannerCarousel.styles";
import { ContentOctober } from "./PostModal/ContentOctober";
import { ContentSeptember } from "./PostModal/ContentSeptember";
import { PostModal } from "./PostModal/PostModal";
export const BannerCarousel = () => {
  const [isOpenPostModal, setIsOpenPostModal] = useState(false);
  const [scrollTo, setScrollTo] = useState("");

  const getContentByMonth = (currentMonth: number) => {
    switch (currentMonth) {
      case 9:
        return {
          subTitle: "미트래블이 선정한",
          title: "9월 추천 여행지",
          date: "2024/09/02",
          imageSearchList: ["경주 남산", "불국사", "전주 한옥마을"],
          postContent: ContentSeptember,
        };
      case 10:
      default:
        return {
          subTitle: "미트래블이 선정한",
          title: "10월 추천 여행지",
          date: "2024/10/01",
          imageSearchList: ["양평 들꽃수목원", "청평호", "양평 두물머리"],
          postContent: ContentOctober,
        };
    }
  };

  const content = getContentByMonth(dayjs().month() + 1);

  const imgDataList = useGetGallerySearchListByKeywordList(
    content.imageSearchList
  );

  const banners = useMemo(() => {
    return content.imageSearchList.map((keyword, index) => ({
      subTitle: content.subTitle,
      title: content.title,
      imgSrc: imgDataList?.[index]?.[0]?.galWebImageUrl,
      date: content.date,
      id: keyword,
    }));
  }, [content, imgDataList]);

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
            <div css={cssBannerCarouselItemImageStyle}>
              <Image
                alt={banner.title}
                src={banner.imgSrc}
                width="100%"
                height="100%"
                objectFit="cover"
              />
            </div>
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
        imgDataList={imgDataList.map((imgData) => imgData?.[0])}
        postContent={content.postContent}
      />
    </Fragment>
  );
};
