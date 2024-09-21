import { ReactComponent as LeaveIcon } from "@/assets/icons/leave.svg";
import { ReactComponent as ReportIcon } from "@/assets/icons/report.svg";
import { Typography } from "@/components";
import { IChatData } from "@/components/Chat/ChatItem";
import { cssAlignHorizontalStyle, cssAlignVerticalStyle } from "@/styles/align";
import { COLORS } from "@/styles/color";

const TitleHeader = ({ data }: { data: IChatData }) => {
  return (
    <div
      css={cssAlignHorizontalStyle({
        alignItems: "flex-end",
        justifyContent: "space-between",
      })}
    >
      <div
        css={cssAlignVerticalStyle({
          gap: 4,
          alignItems: "flex-start",
          justifyContent: "space-between",
        })}
      >
        <div>
          <Typography size={14} color={COLORS.GRAY3}>
            {data.startDate} ~ {data.endDate}
          </Typography>
        </div>
        <div css={cssAlignHorizontalStyle({ gap: 8 })}>
          <div css={cssAlignHorizontalStyle({ gap: 4 })}>
            <Typography weight={700} color={COLORS.GRAY3}>
              女
            </Typography>
            <Typography weight={700} color={COLORS.GRAY4}>
              {data.person.woman}명
            </Typography>
          </div>
          <div css={cssAlignHorizontalStyle({ gap: 4 })}>
            <Typography weight={700} color={COLORS.GRAY3}>
              男
            </Typography>
            <Typography weight={700} color={COLORS.GRAY4}>
              {data.person.man}명
            </Typography>
          </div>
          <div>
            <Typography weight={700} color={COLORS.GRAY3}>
              /
            </Typography>
          </div>
          <div>
            <Typography weight={700} color={COLORS.GRAY3}>
              {data.person.total}명
            </Typography>
          </div>
        </div>
      </div>
      <div css={cssAlignHorizontalStyle({ gap: 18 })}>
        <ReportIcon />
        <LeaveIcon />
      </div>
    </div>
  );
};
export default TitleHeader;
