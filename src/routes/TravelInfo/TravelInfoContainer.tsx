import { useState } from "react";

import { Bar, Typography } from "@/components";
import Select from "@/components/Select/Select";
import { cssAlignHorizontalStyle, cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import { TravelInfoItem } from "./components/TravelInfoItem";

export const TravelInfoContainer = () => {
  const [searchValue, setSearchValue] = useState<{
    location: string;
    type: string;
  }>({
    location: "",
    type: "",
  });

  const travelInfoItemList = [
    {
      placeName: "제주도",
      address: "제주특별자치도",
      imageUrl:
        "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fo1KIw%2Fbtqu9mflPY6%2FrGk1mM3iugV1c6jj9Z3E80%2Fimg.jpg",
      like: 12,
    },
    {
      placeName: "제주도",
      address: "제주특별자치도",
      imageUrl: "https://images.unsplash.com/photo-1593642532936-3e6b1f6e3c9f",
      like: 12,
    },
    {
      placeName: "제주도",
      address: "제주특별자치도",
      imageUrl: "https://images.unsplash.com/photo-1593642532936-3e6b1f6e3c9f",
      like: 12,
    },
  ];

  return (
    <div css={cssAlignVerticalStyle({ gap: 16 })}>
      <div css={cssAlignVerticalStyle({ gap: 16, alignItems: "flex-start" })}>
        <Typography size="20" weight="regular" color={COLORS.GRAY3}>
          여행 정보
        </Typography>
        <Bar />
      </div>
      <div css={cssAlignVerticalStyle({ gap: 16, alignItems: "flex-start" })}>
        <div
          css={cssAlignHorizontalStyle({
            gap: 4,
          })}
        >
          <Select
            width="106px"
            placeholder="지역 선택"
            value={searchValue.location}
            selectOptions={[
              { key: "A0502", value: "강원도" },
              { key: "A0501", value: "경상도" },
            ]}
            borderWidth={1}
            onChange={(e) => {
              setSearchValue({ ...searchValue, location: e as string });
            }}
          />
          <Select
            width="138px"
            placeholder="여행 타입 선택"
            selectOptions={[
              { key: "A0502", value: "음식" },
              { key: "A0501", value: "쇼핑" },
            ]}
            value={searchValue.type}
            borderWidth={1}
            onChange={(e) => {
              setSearchValue({ ...searchValue, type: e as string });
            }}
          />
        </div>
        <div css={cssAlignVerticalStyle({ gap: 8 })}>
          {travelInfoItemList.map((item, index) => (
            <TravelInfoItem
              key={index}
              placeName={item.placeName}
              address={item.address}
              imageUrl={item.imageUrl}
              like={item.like}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
