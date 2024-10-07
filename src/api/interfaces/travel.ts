export interface TravelPlace {
  placeId: string;
  placeType: string;
  placeTitle: string;
  placeAddress1: string;
  placeAddress2: string;
  placeImageUrl: string;
  isPicked: boolean;
}

export interface DailyPlan {
  planDate: string;
  meetPlace: string;
  meetTime: string;
  travelPlaces: Array<TravelPlace>;
}

export type TravelKeywords = Array<string>;
export interface TravelPlan {
  chatRoomId: number;
  travelKeywords: TravelKeywords;
  dailyPlans: Array<DailyPlan>;
}
