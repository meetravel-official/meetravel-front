export interface ITravelPlan {
  chatRoomId: number;
  travelKeywords: Array<string>;
  dailyPlans: Array<{
    planDate: string;
    meetPlace: string;
    meetTime: string;
    travelPlaces: Array<{
      placeId: string;
      placeType: string;
      placeTitle: string;
      placeAddress1: string;
      placeAddress2: string;
      placeImageUrl: string;
      isPicked: boolean;
    }>;
  }>;
}
