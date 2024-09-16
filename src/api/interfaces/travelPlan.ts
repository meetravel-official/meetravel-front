export interface ITravelPlanItem {
  date: string;
  firstMeetPlace: string;
  firstMeetTime: string;
  places?: {
    contentId?: string;
    contentTypeId?: string;
    title: string;
    addr1: string; //주소
    addr2: string; //상세 주소
    firstimage: string; // 대표 이미지
  }[];
}

export interface ITravelPlan {
  keyword?: string[];
  travelPlan?: ITravelPlanItem[];
}
