import { css } from "@emotion/react";
import { dummyTravelInfo } from "dummies/travel";
import { useCallback, useState } from "react";

import { IAreaBasedList } from "@/api/interfaces/visitKorea";
import { Button, Typography } from "@/components";
import BorderModal from "@/components/BorderModal/BorderModal";
import ChatItem, { ChatStatus, IChatData } from "@/components/Chat/ChatItem";
import { TravelPlaceSelectItem } from "@/components/TravelPlaceSelectItem/TravelPlaceSelectItem";
import { cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import { cssModalFooterStyle } from "../../styles/TravelReviewModal.styles";

interface TravelReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  chatData?: IChatData;
}
export const TravelReviewModal = ({
  isOpen,
  onClose,
  chatData,
}: TravelReviewModalProps) => {
  const navigate = useNavigate();

  const travelPlaceList: IAreaBasedList[] = [
    {
      ...dummyTravelInfo,
      contentid: "1",
      contenttypeid: "12",
    },
    {
      ...dummyTravelInfo,
      contentid: "2",
      contenttypeid: "39",
    },
    {
      ...dummyTravelInfo,
      contentid: "3",
      contenttypeid: "39",
    },
    {
      ...dummyTravelInfo,
      contentid: "4",
      contenttypeid: "32",
    },
    {
      ...dummyTravelInfo,
      contentid: "1",
      contenttypeid: "12",
    },
    {
      ...dummyTravelInfo,
      contentid: "2",
      contenttypeid: "39",
    },
    {
      ...dummyTravelInfo,
      contentid: "3",
      contenttypeid: "39",
    },
    {
      ...dummyTravelInfo,
      contentid: "4",
      contenttypeid: "32",
    },
    {
      ...dummyTravelInfo,
      contentid: "1",
      contenttypeid: "12",
    },
    {
      ...dummyTravelInfo,
      contentid: "2",
      contenttypeid: "39",
    },
    {
      ...dummyTravelInfo,
      contentid: "3",
      contenttypeid: "39",
    },
    {
      ...dummyTravelInfo,
      contentid: "4",
      contenttypeid: "32",
    },
  ];

  const [selectedContentIdList, setSelectedContentIdList] = useState<string[]>(
    []
  );

  const contentTypeList = [
    {
      label: "관광",
      contenttypeid: "12",
    },
    {
      label: "식당",
      contenttypeid: "39",
    },
    {
      label: "숙박",
      contenttypeid: "32",
    },
  ];

  const handleOnHeartTravelPlace = useCallback(
    (travelPlace: IAreaBasedList) => {
      if (travelPlace.contentid)
        if (selectedContentIdList.includes(travelPlace.contentid)) {
          const filteredList = selectedContentIdList.filter(
            (id) => id !== travelPlace.contentid
          );
          setSelectedContentIdList([...filteredList]);
        } else {
          setSelectedContentIdList([
            ...selectedContentIdList,
            travelPlace.contentid,
          ]);
        }
    },
    [selectedContentIdList]
  );
  useEffect(() => {
    navigate("", {
      state: { isModal: true },
    });
  }, [navigate]);

  useEffect(() => {
    window.addEventListener("popstate", () => {
      onClose();
    });
    return () => {
      window.removeEventListener("popstate", () => {
        onClose();
      });
    };
  }, [onClose]);

  return (
    <BorderModal
      title={
        <Typography size="24" color={COLORS.GRAY3} weight={700}>
          여행 평가
        </Typography>
      }
      modalType="full"
      isOpen={isOpen}
      onClose={onClose}
      footer={
        <div css={cssModalFooterStyle}>
          <Button bgColor={COLORS.PINK3} height="large">
            <Typography color={COLORS.WHITE} size="16" weight={700}>
              완료
            </Typography>
          </Button>
        </div>
      }
      modalDetailStyle={css`
        display: flex;
        flex-direction: column;
      `}
    >
      <div
        css={cssAlignVerticalStyle({
          gap: 28,
        })}
      >
        <div css={cssAlignVerticalStyle({ gap: 24 })}>
          {chatData && (
            <ChatItem
              chatData={{
                ...chatData,
                status: ChatStatus.INPROGRESS,
                isActive: true,
              }} // TODO: 수연이한테 여행 평가 이렇게 보여져야하는 게 맞는건지 확인
            />
          )}
          <Typography color={COLORS.GRAY4} weight={700} size="16">
            해당 여행에서 즐겼던 장소들은 어떠셨나요?
          </Typography>
        </div>
        <div css={cssAlignVerticalStyle({ gap: 16 })}>
          {contentTypeList.map((item) => (
            <div
              key={item.label}
              css={cssAlignVerticalStyle({ gap: 8, alignItems: "flex-start" })}
            >
              <Typography color={COLORS.GRAY3} weight={700} size="16">
                {item.label}
              </Typography>
              <div css={cssAlignVerticalStyle({ gap: 8 })}>
                {travelPlaceList
                  .filter(
                    (travelPlace) =>
                      travelPlace.contenttypeid === item.contenttypeid
                  )
                  .map((travelPlace) => (
                    <TravelPlaceSelectItem
                      key={travelPlace.contentid}
                      travelInfo={travelPlace}
                      selected={
                        travelPlace.contentid
                          ? selectedContentIdList.includes(
                              travelPlace.contentid
                            )
                          : false
                      }
                      onSelect={handleOnHeartTravelPlace}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </BorderModal>
  );
};
