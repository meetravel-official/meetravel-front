import { ChatStatus, IChatData } from "@/components/Chat/ChatItem";

export const dummyChatData: IChatData = {
  isActive: true,
  status: ChatStatus.INPROGRESS,
  person: { woman: 2, man: 2, total: 4 },
  startDate: "2024-12-26",
  endDate: "2024-12-27",
  title: "서귀포",
  tags: ["산", "야경", "힐링"],
  link: "/chat/1",
};
