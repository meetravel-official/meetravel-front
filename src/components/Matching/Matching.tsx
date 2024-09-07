import { css } from "@emotion/react";
import { Fragment, useState } from "react";

import { ReactComponent as Group } from "@/assets/icons/group.svg";
import { COLORS } from "@/styles/color";

import { BarStep } from "../BarStep/BarStep";
import { Button } from "../Button/Button";
import Modal from "../Modal/Modal";
import { Step } from "../Step";
import { Typography } from "../Typography/Typography";
import First from "./First";
import Second from "./Second";
import Third from "./Third";

const MatchingButton = () => {
  const [modalOpen3, setModalOpen3] = useState(false);

  const [step] = Step.useStep();
  const stepList = [
    {
      title: "first",
      content: <First />,
    },
    {
      title: "second",
      content: <Second />,
    },
    {
      title: "third",
      content: <Third />,
    },
  ];

  return (
    <Fragment>
      <Button bgColor={COLORS.PINK3} onClick={() => setModalOpen3(true)}>
        <div>
          <Typography color={COLORS.WHITE} weight="bold">
            매칭 시작!
          </Typography>{" "}
          <Typography color={COLORS.PINK1} weight="bold">
            (매칭 기회 2번)
          </Typography>
        </div>
      </Button>
      <Modal
        isOpen={modalOpen3}
        onClose={() => setModalOpen3(false)}
        title={
          <div
            css={css`
              display: flex;
            `}
          >
            <Group stroke={COLORS.GRAY4} />
            <Typography
              color={COLORS.GRAY4}
              weight="bold"
              size="20"
              detailStyle={css`
                display: block;
                margin-bottom: 32px;
                margin-left: 8px;
              `}
            >
              매칭 전{" "}
              <Typography color={COLORS.PINK2} weight="bold" size="20">
                신청서
              </Typography>
              를 작성해요!
            </Typography>
          </div>
        }
        modalType="full"
        modalDetailStyle={css`
          z-index: 100;
          max-height: 100%-48px;
        `}
        footer={
          <div
            css={css`
              width: -webkit-fill-available;
              display: flex;
              gap: 8px;
              bottom: 15px;
              z-index: 100;
              backdrop-filter: blur(10px);
              height: 60px;
              align-items: center;
              box-shadow: 1px 1px 3px 3px ${COLORS.WHITE};
            `}
          >
            <Button
              color={COLORS.WHITE}
              bgColor={COLORS.PINK1}
              onClick={step.handleOnClickPrev}
              disabled={step.current === 0}
            >
              이전
            </Button>
            <Button
              color={COLORS.WHITE}
              bgColor={COLORS.PINK2}
              onClick={() => {
                if (step.current === 2) {
                  console.log("제출");
                } else step.handleOnClickNext();
              }}
            >
              {step.current === 2 ? "제출" : "다음"}
            </Button>
          </div>
        }
      >
        <BarStep step={step} stepList={stepList} />
      </Modal>
    </Fragment>
  );
};
export default MatchingButton;
