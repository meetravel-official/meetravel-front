import { useCallback, useEffect, useMemo } from "react";
import { useTravelInfo } from "states/useTravelInfo";

import { useGetDetailCommon, useGetDetailIntro } from "@/api/hooks/visitKorea";
import { IDetailIntro } from "@/api/interfaces/visitKorea";
import { ReactComponent as TelIcon } from "@/assets/icons/tel.svg";
import { Image, Typography } from "@/components";
import { cssAlignHorizontalStyle, cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import {
  cssTravelImageStyle,
  cssTravelInfoDetailStyle,
  cssTravelMapStyle,
} from "../styles/TravelInfoDetail.styles";

export const TravelInfoDetail = () => {
  const { kakao } = window;
  const { selectedContent } = useTravelInfo();

  const { data: detailCommonData } = useGetDetailCommon(
    selectedContent?.contentid
  );
  const { data: detailIntroData } = useGetDetailIntro({
    contentId: selectedContent?.contentid,
    contentTypeId: selectedContent?.contenttypeid,
  });

  const contentIntro = useMemo(() => {
    switch (selectedContent?.contenttypeid) {
      case "12":
        return [
          { label: "개장일", key: "opendate" },
          { label: "주차시설", key: "parking" },
          { label: "쉬는날", key: "restdate" },
          { label: "이용시기", key: "useseason" },
          { label: "이용시간", key: "usetime" },
        ];
      case "14":
        return [
          { label: "주차시설", key: "parkingculture" },
          { label: "쉬는날", key: "restdateculture" },
          { label: "이용요금", key: "usefee" },
          { label: "이용시간", key: "usetimeculture" },
        ];
      case "15":
        return [
          {
            label: "예매처",
            key: "bookingplace",
          },
          {
            label: "행사장소",
            key: "eventplace",
          },
          {
            label: "행사시작일",
            key: "eventstartdate",
          },
          {
            label: "행사종료일",
            key: "eventenddate",
          },
          {
            label: "행사홈페이지",
            key: "eventhomepage",
          },

          {
            label: "공연시간",
            key: "playtime",
          },
          {
            label: "행사프로그램",
            key: "program",
          },
          {
            label: "관람소요시간",
            key: "spendtimefestival",
          },
          {
            label: "주최자",
            key: "sponsor1",
          },
          {
            label: "주관사",
            key: "sponsor2",
          },
          {
            label: "이용요금",
            key: "usetimefestival",
          },
        ];
      case "28":
        return [
          { label: "개장기간", key: "openperiod" },
          { label: "주차시설", key: "parkingleports" },
          { label: "예약안내", key: "reservation" },
          { label: "쉬는날", key: "restdateleports" },
          { label: "입장료", key: "usefeeleports" },
          { label: "이용시간", key: "usetimeleports" },
        ];
      case "32":
        return [
          { label: "입실시간", key: "checkintime" },
          { label: "퇴실시간", key: "checkouttime" },
          { label: "객실내취사여부", key: "chkcooking" },
          { label: "식음료장", key: "foodplace" },
          { label: "주차시설", key: "parkinglodging" },
          { label: "픽업서비스", key: "pickup" },
          { label: "예약안내홈페이지", key: "reservationurl" },
          { label: "바비큐장여부", key: "barbecue" },
        ];
      case "38":
        return [
          { label: "영업시간", key: "opentime" },
          { label: "쉬는날", key: "restdateshopping" },
          { label: "주차시설", key: "parkingshopping" },
          { label: "판매품목", key: "saleitem" },
        ];
      case "39":
        return [
          { label: "대표메뉴", key: "firstmenu" },
          { label: "영업시간", key: "opentimefood" },
          { label: "포장가능", key: "packing" },
          { label: "주차시설", key: "parkingfood" },
          { label: "예약안내", key: "reservationfood" },
          { label: "쉬는날", key: "restdatefood" },
          { label: "인허가번호", key: "lcnsno" },
        ];
    }
  }, [selectedContent?.contenttypeid]);

  useEffect(() => {
    if (selectedContent?.mapx && selectedContent.mapy) {
      const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
      const options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(
          selectedContent?.mapy,
          selectedContent?.mapx
        ), //지도의 중심좌표.
        level: selectedContent.mlevel, //지도의 레벨(확대, 축소 정도)
        draggable: false,
      };

      const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

      const markerPosition = new kakao.maps.LatLng(
        selectedContent?.mapy,
        selectedContent?.mapx
      );

      const marker = new kakao.maps.Marker({
        position: markerPosition,
      });

      marker.setMap(map);
    }
  }, [kakao.maps, selectedContent]);

  const handleOnOpenKakaoMap = useCallback(() => {
    window.open(
      `https://map.kakao.com/link/map/${selectedContent?.title},${selectedContent?.mapy},${selectedContent?.mapx}`,
      "_blank",
      "noopener noreferrer"
    );
  }, [selectedContent?.mapx, selectedContent?.mapy, selectedContent?.title]);

  return (
    <div css={cssTravelInfoDetailStyle}>
      <div css={cssTravelImageStyle}>
        <Image
          src={selectedContent?.firstimage || ""}
          alt="travel-info"
          width="100%"
          height="100%"
          objectFit="cover"
        />
      </div>
      <div css={cssAlignVerticalStyle({ gap: 24, alignItems: "flex-start" })}>
        <div css={cssAlignVerticalStyle({ gap: 14, alignItems: "flex-start" })}>
          <div
            css={cssAlignVerticalStyle({ gap: 8, alignItems: "flex-start" })}
          >
            <Typography size="24" color={COLORS.GRAY5} weight={700}>
              {selectedContent?.title}
            </Typography>
            <Typography size="16" color={COLORS.GRAY5} weight={700}>
              {selectedContent?.addr1} {selectedContent?.addr2}
            </Typography>
          </div>
          <div css={cssAlignHorizontalStyle({ gap: 8 })}>
            <TelIcon />
            <Typography size="16" color={COLORS.GRAY4} weight={700}>
              {selectedContent?.tel || "-"}
            </Typography>
          </div>
        </div>
        <div css={cssAlignVerticalStyle({ gap: 8 })}>
          {contentIntro?.map(
            (intro, index) =>
              detailIntroData?.data.response.body.items.item[0][
                intro.key as keyof IDetailIntro
              ] && (
                <div
                  key={index}
                  css={cssAlignVerticalStyle({
                    gap: 4,
                    alignItems: "flex-start",
                  })}
                >
                  <Typography size="16" color={COLORS.GRAY5} weight={700}>
                    {intro.label}
                  </Typography>
                  {detailIntroData?.data.response.body.items.item[0][
                    intro.key as keyof IDetailIntro
                  ]
                    ?.split(/(?:<br>\n|<br>|\n)+/)
                    .map((text, index) => (
                      <div key={index}>
                        <Typography size="16" color={COLORS.GRAY5} weight={400}>
                          {text || "-"}{" "}
                        </Typography>
                      </div>
                    ))}
                </div>
              )
          )}
        </div>
        <div css={cssAlignVerticalStyle({ gap: 16, alignItems: "flex-start" })}>
          {detailCommonData?.data.response.body.items.item[0].overview
            ?.split(/\n|<br>/)
            ?.map((overview, index) => (
              <div key={index}>
                <Typography size="16" color={COLORS.GRAY5} weight={400}>
                  {overview}
                </Typography>
              </div>
            ))}
        </div>
        {selectedContent?.mapx && selectedContent?.mapy && (
          <button
            id="map"
            css={cssTravelMapStyle}
            onClick={handleOnOpenKakaoMap}
          />
        )}
      </div>
    </div>
  );
};
