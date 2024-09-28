import { css } from "@emotion/react";

import { ChatStatus, IChatData } from "@/api/interfaces/chat";
import { COLORS } from "@/styles/color";

import { Tag } from "../Tag/Tag";
import TagKeyword from "../TagKeyword/TagKeyword";
import { Typography } from "../Typography/Typography";
import {
  cssChatItemStyle,
  cssChatKeywordStyle,
  cssChatStatusStyle,
  cssMarginNColor,
  cssMarginRight4px,
  cssMarginRight8px,
} from "./ChatItem.style";

interface ChatItemProps {
  chatData: IChatData;
  statusVisible?: boolean;
}

const ChatItem = ({ chatData, statusVisible }: ChatItemProps) => {
  return (
    <div css={cssChatItemStyle(chatData)}>
      <div
        className="chat-title"
        css={css`
          display: flex;
          justify-content: space-between;
        `}
      >
        <Typography
          size={24}
          weight={700}
          color={chatData.isActive ? COLORS.PINK3 : COLORS.GRAY4}
        >
          {chatData.title}
        </Typography>
        <div className="chat-gender">
          <Typography size={16} weight={700} color={COLORS.GRAY3}>
            <span css={cssMarginRight4px}>女</span>
            <span css={cssMarginNColor}>{chatData.person.femaleCount}명</span>
            <span css={cssMarginRight4px}>男</span>
            <span css={cssMarginNColor}>{chatData.person.maleCount}명</span>
            <span css={cssMarginRight8px}>/</span>
            {chatData.person.totalCount}명
          </Typography>
        </div>
      </div>
      <div
        className="chat-tag"
        css={css`
          display: flex;
          gap: 4px;
          margin-bottom: 4x;
        `}
      >
        {chatData.tags.map((item, index) => {
          return (
            <TagKeyword
              key={index}
              keyword={item}
              detailStyle={cssChatKeywordStyle(chatData)}
              typographyStyle={css`
                color: ${chatData.status === ChatStatus.DONE
                  ? COLORS.GRAY2
                  : COLORS.GRAY4};
              `}
              svgColor={
                chatData.status === ChatStatus.DONE
                  ? COLORS.GRAY2
                  : COLORS.GRAY3
              }
            />
          );
        })}
      </div>
      <div
        css={css`
          display: flex;
          justify-content: space-between;
        `}
      >
        <Typography
          color={chatData.isActive ? COLORS.PINK3 : COLORS.GRAY3}
          size={14}
        >
          {chatData.startDate} ~ {chatData.endDate}
        </Typography>
        {statusVisible && chatData.status !== ChatStatus.DONE && (
          <Tag detailStyle={cssChatStatusStyle(chatData)}>
            {chatData.isActive ? "진행 중" : "후기 필요"}
          </Tag>
        )}
      </div>
    </div>
  );
};
export default ChatItem;
