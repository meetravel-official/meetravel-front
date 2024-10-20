import { css } from "@emotion/react";

import { ChatStatus, IChatData } from "@/api/interfaces/chat";
import { cssAlignHorizontalStyle, cssAlignVerticalStyle } from "@/styles/align";
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
      <div css={cssAlignVerticalStyle({ gap: 12, alignItems: "flex-start" })}>
        <div css={cssAlignVerticalStyle({ gap: 8, alignItems: "flex-start" })}>
          <div
            className="chat-title"
            css={cssAlignHorizontalStyle({
              gap: 4,
              justifyContent: "space-between",
              wrap: "wrap",
              width: "100%",
            })}
          >
            <Typography
              size={24}
              weight={700}
              color={chatData.isActive ? COLORS.PINK3 : COLORS.GRAY4}
            >
              {chatData.title === "all" ? "전국" : chatData.title}{" "}
              {chatData.subTitle}
            </Typography>
            <div className="chat-gender">
              <Typography size={16} weight={700} color={COLORS.GRAY3}>
                <span css={cssMarginRight4px}>女</span>
                <span css={cssMarginNColor}>
                  {chatData.person.femaleCount}명
                </span>
                <span css={cssMarginRight4px}>男</span>
                <span css={cssMarginNColor}>{chatData.person.maleCount}명</span>
                <span css={cssMarginRight8px}>/</span>
                {chatData.person.totalCount}명
              </Typography>
            </div>
          </div>
          <div
            className="chat-tag"
            css={cssAlignHorizontalStyle({
              gap: 4,
              wrap: "wrap",
            })}
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
                    flex-wrap: wrap;
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
        </div>
        <div
          css={cssAlignHorizontalStyle({
            justifyContent: "space-between",
          })}
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
    </div>
  );
};
export default ChatItem;
