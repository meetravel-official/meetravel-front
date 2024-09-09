import { css } from "@emotion/react";
import { Fragment, useEffect, useState } from "react";

import { apiRoute } from "@/api/routes/apiRoutes";
import { ReactComponent as Group } from "@/assets/icons/group.svg";
import { ReactComponent as Logo } from "@/assets/icons/logo.svg";
import { COLORS } from "@/styles/color";

import { BarStep } from "../BarStep/BarStep";
import { Button } from "../Button/Button";
import Form from "../Form/Form";
import useForm from "../Form/useForm";
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

export interface MatchingForm {
  startDate?: string;
  endDate?: string;
  duration?: string;
  groupSize?: string;
  genderRatio?: string;
}

const MatchingButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step] = Step.useStep();
  const { form, registerField, invalidFields } = useForm<MatchingForm>({
    initialValues: {
      duration: "",
      startDate: "",
      endDate: "",
      groupSize: "",
      genderRatio: "",
    },
    required: ["duration", "startDate", "endDate", "groupSize", "genderRatio"],
  });
  const stepList = [
    {
      title: "first",
      content: <First registerField={registerField} />,
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

  useEffect(() => {
    invalidFields(({ errors }) => {
      if (errors) {
        console.log("error in if", form);
      } else {
        console.log("error in else", form);
      }
    });
  }, [step.current]);

  return (
    <Fragment>
      <Button
        bgColor={COLORS.PINK3}
        onClick={() => setIsModalOpen(true)}
        detailStyle={cssModalButtonStyle}
      >
        <Logo fill={COLORS.WHITE} />
      </Button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
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
        <Form formValue={form}>
          <BarStep step={step} stepList={stepList} />
        </Form>
      </Modal>
    </Fragment>
  );
};
export default MatchingButton;
