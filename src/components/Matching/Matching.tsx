import { Fragment, useCallback, useMemo, useState } from "react";

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
  areaCode?: string;
  areaDetailCode?: string;
  genderRatio?: string;
}

export const checkNotEmpty = (values: any[]) => {
  return values.every((item) => item.value !== "" && item.value !== undefined);
};

const MatchingButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step] = Step.useStep();
  const { form, registerField, invalidFields } = useForm<MatchingForm>({
    initialValues: {
      duration: "",
      startDate: "",
      endDate: "",
      areaCode: "",
      areaDetailCode: "",
      genderRatio: "",
    },
    required: [
      "duration",
      "startDate",
      "endDate",
      "areaCode",
      "areaDetailCode",
      "genderRatio",
    ],
  });
  const stepList = [
    {
      title: "first",
      content: <First form={form} registerField={registerField} />,
    },
    {
      title: "second",
      content: <Second form={form} registerField={registerField} />,
    },
    {
      title: "third",
      content: <Third form={form} registerField={registerField} />,
    },
  ];

  const handleOnSubmit = useCallback(() => {
    //TODO:form value 확인용으로 임시 작성
    invalidFields(({ errors }) => {
      if (errors) {
        console.log("error in if", form);
      } else {
        console.log("error in else", form);
      }
    });
  }, [form, invalidFields]);

  const isEnableNextPage = useMemo(() => {
    if (step.current === 0) {
      return checkNotEmpty([form.startDate, form.endDate, form.duration]);
    } else if (step.current === 1) {
      return checkNotEmpty([form.areaCode]);
    } else if (step.current === 2) {
      return checkNotEmpty([form.genderRatio]);
    }
    return false;
  }, [
    form.areaCode,
    form.duration,
    form.endDate,
    form.genderRatio,
    form.startDate,
    step,
  ]);

  return (
    <Fragment>
      <Button
        bgColor={COLORS.PINK3}
        onClick={() => setIsModalOpen(true)}
        detailStyle={cssModalButtonStyle}
      >
        <Logo fill={COLORS.WHITE} width={60} height={60} />
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
                  handleOnSubmit();
                } else step.handleOnClickNext();
              }}
              disabled={!isEnableNextPage}
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
