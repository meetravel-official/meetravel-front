import { useGetGallerySearchList } from "@/api/hooks/visitKorea";
import { Button, Image, Typography } from "@/components";
import { cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import { PostModalContentProps } from "./PostModal";
import {
  cssPostImageBoxStyle,
  cssPostImageFullBoxStyle,
} from "./PostModal.styles";

export const ContentSeptember = ({
  handleOnLinkMap,
}: PostModalContentProps) => {
  const { data: kyeongjunamsanData } = useGetGallerySearchList("경주 남산");
  const { data: bulguksaData } = useGetGallerySearchList("불국사");
  const { data: junjuhanokData } = useGetGallerySearchList("전주 한옥마을");

  return (
    <div css={cssAlignVerticalStyle({ gap: 16 })}>
      <div css={cssAlignVerticalStyle({ gap: 20, alignItems: "flex-start" })}>
        <div css={cssPostImageFullBoxStyle} id="경주 남산">
          <Image
            src={
              kyeongjunamsanData?.data?.response?.body?.items?.item?.[0]
                .galWebImageUrl || ""
            }
            alt={
              kyeongjunamsanData?.data?.response?.body?.items?.item?.[0]
                .galTitle || ""
            }
            width="100%"
            height="100%"
            objectFit="cover"
          />
        </div>
        <div css={cssAlignVerticalStyle({ gap: 4, alignItems: "flex-start" })}>
          <Typography color={COLORS.GRAY5} size="16" weight={700}>
            미트래블이 선정한
          </Typography>
          <Typography color={COLORS.GRAY5} size="24" weight={700}>
            9월 추천 여행지
          </Typography>
          <Typography color={COLORS.GRAY4} size="12" weight={400}>
            2024/09/02
          </Typography>
        </div>
        <Typography color={COLORS.GRAY5} weight={400} size={16}>
          미트래블이 선택한 9월 추천 여행지를 한 곳에 모아보았습니다. 더위가
          꺾인 가을 한복판에서 여행자들에게 역사 유적은 여행자들에게 특별한
          경험을 선사할 수 있습니다. 단풍 구경은 덤이지요.
        </Typography>
      </div>
      <div css={cssAlignVerticalStyle({ gap: 20, alignItems: "flex-start" })}>
        <div css={cssPostImageBoxStyle} id="불국사">
          <Image
            src={
              bulguksaData?.data?.response?.body?.items?.item?.[0]
                .galWebImageUrl || ""
            }
            alt={
              bulguksaData?.data?.response?.body?.items.item?.[0].galTitle || ""
            }
            width="100%"
            height="100%"
            objectFit="cover"
          />
        </div>
        <Typography color={COLORS.GRAY5} weight={400} size={16}>
          1. 경주
          <br />
          역사의 숨결을 느끼는 도시 경주는 한국의 고대 문화와 역사가 살아 숨쉬는
          곳으로, 가을의 경치는 여행자들에게 더욱 특별한 경험을 선사합니다.
          불국사와 석굴암, 그리고 첨성대를 둘러보며 신라시대의 유산을
          느껴보세요. 또한, 경주 남산에 오르면 단풍으로 물든 산과 경주의
          아름다운 전경이 한눈에 들어옵니다.
        </Typography>
        <Button
          bgColor={COLORS.PINK2}
          color={COLORS.WHITE}
          onClick={() => handleOnLinkMap("경주")}
        >
          장소 위치 지도에서 확인하기
        </Button>
        <div css={cssPostImageBoxStyle} id="전주 한옥마을">
          <Image
            src={
              junjuhanokData?.data?.response?.body?.items?.item?.[0]
                .galWebImageUrl || ""
            }
            alt={
              junjuhanokData?.data?.response?.body?.items?.item?.[0].galTitle ||
              ""
            }
            width="100%"
            height="100%"
            objectFit="cover"
          />
        </div>
        <Typography color={COLORS.GRAY5} weight={400} size={16}>
          2. 전주
          <br />
          전통과 현대가 어우러진 도시 전주는 한옥마을과 전통의 멋이 살아있는
          도시로, 가을의 정취를 느끼기에 최적의 장소입니다. 전주 한옥마을을
          거닐며 전통 한옥과 전통차, 그리고 맛있는 전주 비빔밥을 즐길 수
          있습니다. 전통과 현대가 어우러진 이 도시에서 여행자들은 가을의 새로운
          감동을 느낄 수 있을 것입니다.
        </Typography>
        <Button
          bgColor={COLORS.PINK2}
          color={COLORS.WHITE}
          onClick={() => handleOnLinkMap("전주")}
        >
          장소 위치 지도에서 확인하기
        </Button>
      </div>
    </div>
  );
};
