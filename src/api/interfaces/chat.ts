export interface IArea {
  areaCode: string;
  areaName: string;
}

export interface IPerson {
  femaleCount: number;
  maleCount: number;
  totalCount: number;
}

export enum ChatStatus {
  INPROGRESS = "진행중",
  REVIEW = "후기필요",
  DONE = "종료",
}

export interface IDuration {
  duration: string;
  startDate: string;
  endDate: string;
}

export interface IChatData {
  isActive: boolean;
  status?: ChatStatus;
  person: IPerson;
  startDate: string;
  endDate: string;
  title: string;
  tags: string[];
  link?: string;
}

export interface IMatchingData {
  chatRoomId: number;
  area: IArea;
  persons: IPerson;
  travelKeywords: string[];
  travelPlanDate: IDuration;
}

export interface IChatMessageData {
  userId: string;
  chatRoomId?: number;
  message?: string;
  type?: string;
  sendAt?: string;
}
