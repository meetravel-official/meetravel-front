import { Button, Image, Typography } from "@/components";
import { cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import { PostModalContentProps } from "./PostModal";
import {
  cssPostImageBoxStyle,
  cssPostImageFullBoxStyle,
} from "./PostModal.styles";

export const ContentOctober = ({
  imgDataList,
  handleOnLinkMap,
}: PostModalContentProps) => {
  return (
    <div css={cssAlignVerticalStyle({ gap: 16 })}>
      <div css={cssAlignVerticalStyle({ gap: 20, alignItems: "flex-start" })}>
        <div css={cssPostImageFullBoxStyle} id="양평 들꽃수목원">
          <Image
            src={imgDataList?.[0]?.galWebImageUrl}
            alt={imgDataList?.[0]?.galTitle || ""}
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
            10월 추천 여행지
          </Typography>
          <Typography color={COLORS.GRAY4} size="12" weight={400}>
            2024/10/01
          </Typography>
        </div>
        <Typography color={COLORS.GRAY5} weight={400} size={16}>
          미트래블이 선택한 10월 추천 여행지를 한곳에 모아보았습니다. 가을이
          절정을 맞이하는 10월, 서울 근교에서 선선한 바람과 단풍의 절경과 함께
          잊지 못할 여행을 경험할 수 있습니다.
        </Typography>
      </div>
      <div css={cssAlignVerticalStyle({ gap: 20, alignItems: "flex-start" })}>
        <div css={cssPostImageBoxStyle} id="청평호">
          <Image
            src={imgDataList?.[1]?.galWebImageUrl}
            alt={imgDataList?.[1]?.galTitle || ""}
            width="100%"
            height="100%"
            objectFit="cover"
          />
        </div>
        <Typography color={COLORS.GRAY5} weight={400} size={16}>
          1. 가평
          <br />
          가평은 서울에서 가까운 가을 여행지로, 단풍으로 물든 자연 속에서 여유와
          힐링을 동시에 즐길 수 있는 곳입니다. 청평호는 맑고 고요하며, 주변을
          둘러싼 단풍이 더해져 한 폭의 그림 같은 풍경을 자아냅니다. 남이섬은
          특히 10월에 은행나무와 단풍나무들이 화려하게 물듭니다. 가평의
          액티비티도 훌륭합니다. 가평의 자라섬에서는 캠핑과 다양한 야외 체험을
          할 수 있고, 북한강변을 따라 자전거를 타거나, 강을 건너는 짚라인을 통해
          액티브한 여행을 즐길 수 있습니다.
        </Typography>
        <Button
          bgColor={COLORS.PINK2}
          color={COLORS.WHITE}
          onClick={() => handleOnLinkMap("가평")}
        >
          장소 위치 지도에서 확인하기
        </Button>
        <div css={cssPostImageBoxStyle} id="양평 두물머리">
          <Image
            src={imgDataList?.[2]?.galWebImageUrl}
            alt={imgDataList?.[2]?.galTitle || ""}
            width="100%"
            height="100%"
            objectFit="cover"
          />
        </div>
        <Typography color={COLORS.GRAY5} weight={400} size={16}>
          2. 양평
          <br />
          양평은 서울 근교에서 접근하기 쉬운 숨은 보석 같은 장소입니다.
          두물머리에서는 이른 아침, 물안개가 피어오르는 강과 단풍으로 물든
          풍경이 어우러져 마치 동양화 같은 장면을 연출합니다. 10월의 양평은
          단풍뿐만 아니라, 다양한 가을꽃들이 만개하며, 들꽃수목원에서 체험해볼
          수 있습니다. 산책을 즐기며 자연과 교감할 수 있는 양평은 도시의
          복잡함에서 벗어나 한적하고 평온한 하루를 보낼 수 있는 완벽한
          장소입니다. 또한 용문산 자락에서 트레킹을 즐기며 청명한 공기를 마음껏
          들이마실 수 있습니다.
        </Typography>
        <Button
          bgColor={COLORS.PINK2}
          color={COLORS.WHITE}
          onClick={() => handleOnLinkMap("양평")}
        >
          장소 위치 지도에서 확인하기
        </Button>
      </div>
    </div>
  );
};
