import { ChatStatus, IChatData } from "@/api/interfaces/chat";

export const dummyChatData: IChatData = {
  isActive: true,
  status: ChatStatus.INPROGRESS,
  person: { femaleCount: 2, maleCount: 2, totalCount: 4 },
  startDate: "2024-12-26",
  endDate: "2024-12-27",
  title: "서귀포",
  tags: ["산", "야경", "힐링"],
  link: "/chat/1",
};

export const chatData1 = {
  isActive: true,
  status: ChatStatus.INPROGRESS,
  person: { femaleCount: 1, maleCount: 2, totalCount: 3 },
  startDate: "2024/12/26",
  endDate: "2024/12/27",
  title: "서귀포",
  tags: ["산", "야경", "힐링"],
  link: "/chat/1",
};
export const chatData2 = {
  isActive: false,
  status: ChatStatus.REVIEW,
  person: { femaleCount: 2, maleCount: 1, totalCount: 3 },
  startDate: "2024/12/26",
  endDate: "2024/12/27",
  title: "서귀포",
  tags: ["산", "야경", "힐링"],
  link: "/chat/2",
};

export const chatData3 = {
  isActive: false,
  status: ChatStatus.DONE,
  person: { femaleCount: 2, maleCount: 1, totalCount: 3 },
  startDate: "2024/12/26",
  endDate: "2024/12/27",
  title: "서귀포",
  tags: ["산", "야경", "힐링"],
  link: "/chat/3",
};
