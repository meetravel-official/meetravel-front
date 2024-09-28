import { useLeaveModal, useReportModal } from "states/useChat";

import { IChatData, IChatUserData } from "@/api/interfaces/chat";
import { ReactComponent as LeaveIcon } from "@/assets/icons/leave.svg";
import { ReactComponent as ReportIcon } from "@/assets/icons/report.svg";
import { Button, Typography } from "@/components";
import { cssAlignHorizontalStyle, cssAlignVerticalStyle } from "@/styles/align";
import { cssDefaultBtnStyle } from "@/styles/button";
import { COLORS } from "@/styles/color";

const TitleHeader = ({ data }: { data?: IChatUserData }) => {
  const { handleOnOpenLeaveModal } = useLeaveModal();
  const { handleOnOpenReportModal } = useReportModal();

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
            {/* {data.startDate} ~ {data.endDate} TODO: date 추가되면 수정 */}
            2024/12/26 ~ 2024/12/27
          </Typography>
        </div>
        <div css={cssAlignHorizontalStyle({ gap: 8 })}>
          <div css={cssAlignHorizontalStyle({ gap: 4 })}>
            <Typography weight={700} color={COLORS.GRAY3}>
              女
            </Typography>
            <Typography weight={700} color={COLORS.GRAY4}>
              {data?.persons.femaleCount}명
            </Typography>
          </div>
          <div css={cssAlignHorizontalStyle({ gap: 4 })}>
            <Typography weight={700} color={COLORS.GRAY3}>
              男
            </Typography>
            <Typography weight={700} color={COLORS.GRAY4}>
              {data?.persons.maleCount}명
            </Typography>
          </div>
          <div>
            <Typography weight={700} color={COLORS.GRAY3}>
              /
            </Typography>
          </div>
          <div>
            <Typography weight={700} color={COLORS.GRAY3}>
              {data?.persons.totalCount}명
            </Typography>
          </div>
        </div>
      </div>
      <div css={cssAlignHorizontalStyle({ gap: 18 })}>
        <button
          css={cssDefaultBtnStyle}
          onClick={() => {
            console.log("신고버튼 누름");
            handleOnOpenReportModal();
          }}
        >
          <ReportIcon stroke={COLORS.GRAY3} />
        </button>
        <button
          css={cssDefaultBtnStyle}
          onClick={() => {
            console.log("나가기버튼 누름");
            handleOnOpenLeaveModal();
          }}
        >
          <LeaveIcon />
        </button>
      </div>
    </div>
  );
};
export default TitleHeader;
