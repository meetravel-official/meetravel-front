import { IArea, IDuration, IPerson } from "./chat";

export interface IMatchingArea {
  code: string;
  name: string;
}
export interface IMatchingDetailArea {
  detailCode?: string;
  detailName?: string;
}

export interface IMatchingForm {
  duration: string;
  startDate: string;
  endDate: string;
  groupSize: string;
  genderRatio: string;
  cost: string;
  area: IMatchingArea;
  detailArea: IMatchingDetailArea;
  travelKeywordList: string[];
}

export interface IUpdateMatchingForm {
  matchingFormId: number;
  duration: string;
  startDate: string;
  endDate: string;
  groupSize: string;
  genderRatio: string;
  cost: string;
  area: IMatchingArea;
  detailArea: IMatchingDetailArea;
  travelKeywordToDelete: number;
  travelKeywordToAdd: string[];
}
