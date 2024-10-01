import dayjs from "dayjs";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

import { ReactComponent as Airplane } from "@/assets/icons/airplane.svg";
import { ReactComponent as Bell } from "@/assets/icons/bell.svg";
import { cssAlignHorizontalStyle, cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

import { Typography } from "../Typography/Typography";
import {
  cssNotificationLinkStyle,
  cssNotificationStyle,
  cssNotificationTitleStyle,
  cssNotificationWrapperStyle,
} from "./Notification.styles";

export interface NotificationProps {
  notificationId: number;
  type: "service" | "travel";
  title: string;
  subTitle: string;
  date: string;
  read?: boolean;
  active?: boolean;
  link?: string;
}

export const Notification = ({
  type,
  title,
  subTitle,
  date,
  read,
  active,
  link,
}: NotificationProps) => {
  const readColor = read ? COLORS.GRAY3 : undefined;

  return (
    <NotificationWrapper link={link}>
      <div css={cssNotificationStyle({ read, active })}>
        <div
          css={cssAlignHorizontalStyle({ gap: 8, alignItems: "flex-start" })}
        >
          {type === "service" ? (
            <Bell stroke={readColor || COLORS.PINK3} />
          ) : (
            <Airplane stroke={readColor || COLORS.PINK3} />
          )}
          <div
            css={cssAlignVerticalStyle({ gap: 4, alignItems: "flex-start" })}
          >
            <div
              css={cssAlignHorizontalStyle({
                gap: 4,
                justifyContent: "space-between",
                alignItems: "flex-start",
                width: "100%",
              })}
            >
              <div css={cssNotificationTitleStyle}>
                <Typography
                  color={readColor || COLORS.GRAY4}
                  size="16"
                  weight={700}
                >
                  {title}
                </Typography>
              </div>
              <Typography
                color={readColor || COLORS.GRAY2}
                size="12"
                weight={400}
              >
                {dayjs(date, "YYYY-MM-DD").format("MM/DD")}
              </Typography>
            </div>
            <Typography
              color={readColor || COLORS.GRAY4}
              size="14"
              weight={400}
            >
              {subTitle.split("\n").map((text, index) => (
                <div key={index}>{text}</div>
              ))}
            </Typography>
          </div>
        </div>
      </div>
    </NotificationWrapper>
  );
};

export const NotificationWrapper = ({
  link,
  children,
}: {
  link?: string;
  children: ReactNode;
}) => {
  return link ? (
    <Link css={cssNotificationLinkStyle} to={link}>
      {children}
    </Link>
  ) : (
    <div css={cssNotificationWrapperStyle}>{children}</div>
  );
};
