import { Link2Icon } from "@radix-ui/react-icons";
import dayjs from "dayjs";
import { Fragment, useCallback, useEffect, useMemo } from "react";

import { useGetDetailCommon, useGetDetailIntro } from "@/api/hooks/visitKorea";
import { IDetailCommon, IDetailIntro } from "@/api/interfaces/visitKorea";
import { ReactComponent as CalendarIcon } from "@/assets/icons/calendar.svg";
import { ReactComponent as CarIcon } from "@/assets/icons/car.svg";
import { ReactComponent as CheckCalendarIcon } from "@/assets/icons/check-calendar.svg";
import { ReactComponent as ClockIcon } from "@/assets/icons/clock.svg";
import { ReactComponent as ExclamationBoxIcon } from "@/assets/icons/exclamation-box.svg";
import { ReactComponent as HeartIcon } from "@/assets/icons/heart.svg";
import { ReactComponent as ICircleIcon } from "@/assets/icons/i-circle.svg";
import { ReactComponent as LocationIcon } from "@/assets/icons/location.svg";
import { ReactComponent as MoneyIcon } from "@/assets/icons/money.svg";
import { ReactComponent as TelIcon } from "@/assets/icons/tel.svg";
import { Image, Typography } from "@/components";
import { cssAlignHorizontalStyle, cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import { Spin } from "../Spin/Spin";
import {
  cssTravelImageStyle,
  cssTravelMapStyle,
} from "./TravelInfoDetailModal.styles";

interface TravelInfoDetailProps {
  travelId?: string;
}

export const TravelInfoDetail = ({ travelId }: TravelInfoDetailProps) => {
  const { kakao } = window;

  const { data: detailCommonData, isLoading: isLoadingDetailCommon } =
    useGetDetailCommon(travelId);
  const { data: detailIntroData, isLoading: isLoadingDetailIntro } =
    useGetDetailIntro({
      contentId: travelId,
      contentTypeId:
        detailCommonData?.data.response.body.items.item?.[0].contenttypeid,
    });

  const detailCommon = useMemo(() => {
    return detailCommonData?.data?.response?.body?.items
      ?.item?.[0] as IDetailCommon;
  }, [detailCommonData]);

  const detailIntro = useMemo(() => {
    return detailIntroData?.data?.response?.body?.items
      ?.item?.[0] as IDetailIntro;
  }, [detailIntroData]);

  const travelCommonInfo = useMemo(() => {
    return {
      mapx: detailCommon?.mapx,
      mapy: detailCommon?.mapy,
      title: detailCommon?.title,
      mlevel: detailCommon?.mlevel,
      firstimage: detailCommon?.firstimage,
      addr1: detailCommon?.addr1,
      addr2: detailCommon?.addr2,
      tel: detailCommon?.tel,
    };
  }, [detailCommon]);

  const detailItem = useMemo(() => {
    return [
      {
        icon: <CalendarIcon />,
        label: "행사 시작일",
        data: detailIntro?.eventstartdate,
        originDateFormat: "YYYYMMDD",
        targetDateFormat: "YYYY년 MM월 DD일",
      },
      {
        icon: <ExclamationBoxIcon />,
        label: "행사 종료일",
        data: detailIntro?.eventenddate,
        originDateFormat: "YYYYMMDD",
        targetDateFormat: "YYYY년 MM월 DD일",
        labelColor: COLORS.SITUATION1,
        dataColor: COLORS.SITUATION1,
      },
      {
        icon: <CalendarIcon />,
        label: "개장일",
        data: detailIntro?.opendate || detailIntro?.opendateshopping,
      },
      {
        icon: <CalendarIcon />,
        label: "개장기간",
        data: detailIntro?.openperiod,
      },
      {
        icon: <CalendarIcon />,
        label: "휴무일",
        data:
          detailIntro?.restdatefood ||
          detailIntro?.restdateshopping ||
          detailIntro?.restdateleports ||
          detailIntro?.restdateculture ||
          detailIntro?.restdate,
      },
      {
        icon: <ClockIcon />,
        label: "이용 시간",
        data:
          detailIntro?.usetime ||
          detailIntro?.usetimeculture ||
          detailIntro?.usetimeleports,
      },
      {
        icon: <ClockIcon />,
        label: "영업 시간",
        data: detailIntro?.opentime || detailIntro?.opentimefood,
      },
      {
        icon: <ClockIcon />,
        label: "입실 시간",
        data: detailIntro?.checkintime,
      },
      {
        icon: <ClockIcon />,
        label: "퇴실 시간",
        data: detailIntro?.checkouttime,
      },
      {
        icon: <ClockIcon />,
        label: "공연 시간",
        data: detailIntro?.playtime,
      },
      {
        icon: <ClockIcon />,
        label: "관람 소요 시간",
        data: detailIntro?.spendtime || detailIntro?.spendtimefestival,
      },
      {
        icon: <MoneyIcon />,
        label: "이용 요금",
        data: detailIntro?.usefee || detailIntro?.usetimefestival,
      },
      {
        icon: <CheckCalendarIcon />,
        label: "예약 안내",
        data:
          detailIntro?.reservation ||
          detailIntro?.reservationlodging ||
          detailIntro?.reservationfood,
      },
      {
        icon: (
          <Link2Icon
            width={19}
            height={19}
            color={COLORS.GRAY3}
            stroke={COLORS.GRAY3}
            strokeWidth={0.5}
          />
        ),
        label: "예약 페이지",
        data: detailIntro?.reservationurl,
      },
      {
        icon: (
          <Link2Icon
            width={19}
            height={19}
            color={COLORS.GRAY3}
            stroke={COLORS.GRAY3}
            strokeWidth={0.5}
          />
        ),
        label: "홈페이지",
        data: detailCommon?.homepage,
        noView: "32",
      },
      {
        icon: <LocationIcon />,
        label: "주소",
        data: `${travelCommonInfo?.addr1 || ""} ${
          travelCommonInfo?.addr2 || ""
        }`,
      },
      {
        icon: <CarIcon />,
        label: "주차시설",
        data:
          detailIntro?.parking ||
          detailIntro?.parkingculture ||
          detailIntro?.parkingleports ||
          detailIntro?.parkinglodging ||
          detailIntro?.parkingshopping ||
          detailIntro?.parkingfood,
      },
      {
        icon: <CarIcon />,
        label: "주차 요금",
        data: detailIntro?.parkingfee || detailIntro?.parkingfeeleports,
      },
      {
        icon: <TelIcon />,
        label: "주최자 연락처",
        data: detailIntro?.sponsor1tel,
      },
      {
        icon: <TelIcon />,
        label: "주관사 연락처",
        data: detailIntro?.sponsor2tel,
      },
      {
        icon: <ICircleIcon />,
        label: "문의 및 안내",
        data:
          detailIntro?.infocenter ||
          detailIntro?.infocenterculture ||
          detailIntro?.infocenterleports ||
          detailIntro?.infocenterlodging ||
          detailIntro?.infocentershopping ||
          detailIntro?.infocenterfood ||
          travelCommonInfo?.tel,
      },
    ];
  }, [detailIntro, detailCommon, travelCommonInfo]);

  const handleOnOpenKakaoMap = useCallback(() => {
    if (
      travelCommonInfo?.mapx &&
      travelCommonInfo?.mapy &&
      travelCommonInfo?.title
    )
      window.open(
        `https://map.kakao.com/link/map/${travelCommonInfo?.title || ""},${
          travelCommonInfo?.mapy || ""
        },${travelCommonInfo?.mapx || ""}`,
        "_blank",
        "noopener noreferrer"
      );
  }, [travelCommonInfo]);

  useEffect(() => {
    if (
      !isLoadingDetailIntro &&
      !isLoadingDetailCommon &&
      travelCommonInfo?.mapx &&
      travelCommonInfo.mapy &&
      kakao?.maps
    ) {
      const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
      const options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(
          travelCommonInfo?.mapy,
          travelCommonInfo?.mapx
        ), //지도의 중심좌표.
        level: travelCommonInfo?.mlevel || 3, //지도의 레벨(확대, 축소 정도)
        draggable: false,
      };

      const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

      const markerPosition = new kakao.maps.LatLng(
        travelCommonInfo?.mapy,
        travelCommonInfo?.mapx
      );

      const marker = new kakao.maps.Marker({
        position: markerPosition,
      });

      marker.setMap(map);
    }
  }, [kakao?.maps, travelCommonInfo]);

  return isLoadingDetailCommon || isLoadingDetailIntro ? (
    <div
      css={cssAlignVerticalStyle({
        alignItems: "center",
        justifyContent: "center",
      })}
    >
      <Spin size={36} />
    </div>
  ) : (
    <div css={cssAlignVerticalStyle({ gap: 16, alignItems: "flex-start" })}>
      <div css={cssTravelImageStyle}>
        <Image
          src={travelCommonInfo.firstimage || ""}
          alt="travel-info"
          width="100%"
          height="100%"
          objectFit="cover"
        />
      </div>
      <div css={cssAlignVerticalStyle({ gap: 24 })}>
        <div css={cssAlignVerticalStyle({ gap: 8, alignItems: "flex-start" })}>
          <div css={cssAlignHorizontalStyle({ gap: 4 })}>
            <Typography size="24" color={COLORS.GRAY5} weight={700}>
              {travelCommonInfo?.title}{" "}
            </Typography>
          </div>
          {/* <div css={cssAlignHorizontalStyle({ gap: 8 })}> TODO: 추천수 연동
            <HeartIcon stroke={COLORS.PINK3} width={18} height={16} />
            <Typography size="16" color={COLORS.PINK3} weight={700}>
              추천수
            </Typography>
          </div> */}
        </div>
        {detailItem.map((item) => (
          <Fragment key={item.label}>
            {item.data && (
              <div
                css={cssAlignVerticalStyle({
                  gap: 8,
                  alignItems: "flex-start",
                })}
              >
                <div css={cssAlignHorizontalStyle({ gap: 8 })}>
                  {item.icon}
                  <Typography
                    size="16"
                    color={item.labelColor || COLORS.GRAY3}
                    weight={700}
                  >
                    {item.label}
                  </Typography>
                </div>
                <div
                  css={cssAlignVerticalStyle({
                    gap: 12,
                    alignItems: "flex-start",
                  })}
                >
                  {item.label === "홈페이지" || item.label === "예약 페이지" ? (
                    item.data.includes("<a") ? (
                      <div dangerouslySetInnerHTML={{ __html: item.data }} />
                    ) : (
                      <a
                        href={item.data}
                        target="_blank"
                        rel="noopenner noreferrer"
                      >
                        {item.data}
                      </a>
                    )
                  ) : (
                    <Typography
                      size="16"
                      color={item.dataColor || COLORS.GRAY4}
                      weight={400}
                    >
                      {item.originDateFormat && item.targetDateFormat
                        ? dayjs(item.data, "YYYYMMDD").format(
                            "YYYY년 MM월 DD일"
                          )
                        : item.data
                            .split(/\n|<br>|<br \/>|<br\/>/)
                            .map((text, index) => (
                              <div key={index}>{text}</div>
                            ))}
                    </Typography>
                  )}
                  {item.label === "주소" && (
                    <button
                      id="map"
                      css={cssTravelMapStyle}
                      onClick={handleOnOpenKakaoMap}
                    />
                  )}
                </div>
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};
