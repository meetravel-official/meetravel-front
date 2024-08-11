import { Link } from "react-router-dom";

import { Step, Typography } from "@/components";
import { BarStep } from "@/components/BarStep/BarStep";
import { cssAlignHorizontalStyle, cssAlignVerticalStyle } from "@/styles/align";

import { pageRoutes } from "..";
import { HomeStep } from "./components/HomeStep";

export const HomeContainer = () => {
  const [step] = Step.useStep();
  const [step2] = Step.useStep();

  const stepList = [
    {
      title: "A",
      content: <div>a content</div>,
    },
    {
      title: "B",
      content: <div>b content</div>,
    },
    {
      title: "C",
      content: <div>c content</div>,
    },
  ];

  return (
    <div css={cssAlignVerticalStyle({ gap: 16, alignItems: "flex-start" })}>
      <Typography weight="black" mode="block" align="center">
        홈
      </Typography>
      <div css={cssAlignVerticalStyle({ gap: 40 })}>
        <div css={cssAlignVerticalStyle({ gap: 16 })}>
          <BarStep step={step} stepList={stepList} />{" "}
          <div css={cssAlignHorizontalStyle}>
            {(!step.isFirst || step.isLast) && (
              <button onClick={step.handleOnClickPrev}>이전</button>
            )}
            {step.isLast ? (
              <button onClick={step.handleOnReset}>처음으로</button>
            ) : (
              <button onClick={step.handleOnClickNext}>확인</button>
            )}
          </div>
        </div>
        <div css={cssAlignVerticalStyle({ gap: 16 })}>
          <HomeStep step={step2} stepList={stepList} />
          <div css={cssAlignHorizontalStyle}>
            <button onClick={step2.handleOnClickPrev}>&lt;</button>
            <button onClick={step2.handleOnClickNext}>&gt;</button>
          </div>
        </div>
        <div css={cssAlignHorizontalStyle}>
          <Link to={`${pageRoutes.POST}/1`}>
            <button>포스트 1번</button>
          </Link>
          <Link to={`${pageRoutes.POST}/2`}>
            <button>포스트 2번</button>
          </Link>
          <Link to={`${pageRoutes.POST}/3`}>
            <button>포스트 3번</button>
          </Link>
          <Link to={`${pageRoutes.POST}/4`}>
            <button>포스트 4번</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
