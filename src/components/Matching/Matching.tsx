import { css } from "@emotion/react";
import { Fragment, useState } from "react";

import { ReactComponent as Group } from "@/assets/icons/group.svg";
import { ReactComponent as Logo } from "@/assets/icons/logo.svg";
import { COLORS } from "@/styles/color";

import { BarStep } from "../BarStep/BarStep";
import { Button } from "../Button/Button";
import Modal from "../Modal/Modal";
import { Step } from "../Step";
import { Typography } from "../Typography/Typography";
import First from "./First";
import {
  cssModalButtonStyle,
  cssModalFooterStyle,
  cssModalTitleStyle,
  cssModalTitleTextStyle,
} from "./Matching.styles";
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
      <Button
        bgColor={COLORS.PINK3}
        onClick={() => setModalOpen3(true)}
        detailStyle={cssModalButtonStyle}
      >
        <Logo fill={COLORS.WHITE} />
      </Button>
      <Modal
        isOpen={modalOpen3}
        onClose={() => setModalOpen3(false)}
        title={
          <div css={cssModalTitleStyle}>
            <Group stroke={COLORS.GRAY4} />
            <Typography
              color={COLORS.GRAY4}
              weight="bold"
              size="20"
              detailStyle={cssModalTitleTextStyle}
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
        `}
        footer={
          <div css={cssModalFooterStyle}>
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
              bgColor={step.current === 2 ? COLORS.PINK3 : COLORS.PINK2}
              onClick={() => {
                if (step.current === 2) {
                  console.log("제출");
                } else step.handleOnClickNext();
              }}
            >
              {step.current === 2 ? "여행 시작!" : "다음"}
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
