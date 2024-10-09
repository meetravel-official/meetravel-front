import { css } from "@emotion/react";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import {
  useEditModal,
  useMatchingModal,
  useMatchingProcessModal,
} from "states/useMatching";

import { useGetMatchingForm, usePostMatchingForm } from "@/api/hooks/matching";
import { ReactComponent as Group } from "@/assets/icons/group.svg";
import { ReactComponent as Logo } from "@/assets/icons/logo.svg";
import { COLORS } from "@/styles/color";

import { BarStep } from "../BarStep/BarStep";
import { Button } from "../Button/Button";
import Form from "../Form/Form";
import useForm from "../Form/useForm";
import Modal from "../Modal/Modal";
import Potal from "../Potal/Potal";
import { Step } from "../Step";
import { Typography } from "../Typography/Typography";
import EditModal from "./EditModal";
import First from "./First";
import {
  cssModalButtonStyle,
  cssModalFooterStyle,
  cssModalTitleStyle,
  cssModalTitleTextStyle,
} from "./Matching.styles";
import MatchingProcessModal from "./MatchingProcessModal";
import Second from "./Second";
import Third from "./Third";

export interface MatchingForm {
  startDate?: string;
  endDate?: string;
  duration?: string;
  areaCode?: string;
  areaDetailCode?: string;
  genderRatio?: string;
  keyword?: string;
}

export const checkNotEmpty = (values: any[]) => {
  return values.every((item) => item.value !== "" && item.value !== undefined);
};

const MatchingButton = () => {
  const [step] = Step.useStep();
  const {
    isOpenMatchingModal,
    handleOnCloseMatchingModal,
    handleOnOpenMatchingModal,
  } = useMatchingModal();

  const mutationPostMatchingForm = usePostMatchingForm();
  const { data: prevMatchingFormData, refetch: refetchMyMatchingForm } =
    useGetMatchingForm();

  const { handleOnOpenMatchingProcessModal } = useMatchingProcessModal();
  const { handleOnOpenEditModal } = useEditModal();

  const [postFormValue, setPostFormValue] = useState<MatchingForm>();

  const { form, registerField, invalidFields } = useForm<MatchingForm>({
    initialValues: {
      duration: "",
      startDate: "",
      endDate: "",
      areaCode: "",
      areaDetailCode: "",
      genderRatio: "",
      keyword: "",
    },
    required: [
      "duration",
      "startDate",
      "endDate",
      "areaCode",
      "genderRatio",
      "keyword",
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
    invalidFields(({ errors, value }) => {
      if (errors) {
        console.log("error in if", errors);
        toast.error("필수 입력값을 확인해주세요.");
      } else {
        console.log("success", value);

        const durationMapping = {
          "1": "당일치기",
          "2": "1박2일",
          "3": "2박3일",
        };

        const postValue = {
          groupSize: "4명",
          cost: "1~5만원",
          genderRatio: value.genderRatio?.value || "",
          duration: value.duration?.value
            ? durationMapping[
                value.duration.value as keyof typeof durationMapping
              ]
            : "",
          startDate: value.startDate?.value || "",
          endDate: value.endDate?.value || "",
          area: {
            code: value.areaCode?.value || "",
            name: value.areaCode?.value || "",
          },
          detailArea: {
            detailCode: value.areaDetailCode?.value || undefined,
            detailName: value.areaDetailCode?.value || undefined,
          },
          travelKeywordList: value.keyword?.value
            ? (value.keyword.value as unknown as string[])
            : [],
        };
        setPostFormValue(postValue);
        console.log("postValue", postValue);
        if (prevMatchingFormData) {
          console.log("수정");

          handleOnOpenEditModal();
        } else {
          console.log("생성");
          mutationPostMatchingForm.mutate(postValue, {
            onSuccess: () => {
              handleOnOpenMatchingProcessModal();
            },
          });
        }
      }
    });
  }, [
    handleOnOpenEditModal,
    handleOnOpenMatchingProcessModal,
    invalidFields,
    mutationPostMatchingForm,
    prevMatchingFormData,
  ]);

  const isEnableNextPage = useMemo(() => {
    if (step.current === 0) {
      return checkNotEmpty([form.startDate, form.endDate, form.duration]);
    } else if (step.current === 1) {
      return checkNotEmpty([form.areaCode]);
    } else if (step.current === 2) {
      const isKeywordListLength = form.keyword?.value?.length ?? 0;
      return checkNotEmpty([form.genderRatio]) && isKeywordListLength >= 3;
    }
    return false;
  }, [
    form.areaCode,
    form.duration,
    form.endDate,
    form.genderRatio,
    form.keyword?.value?.length,
    form.startDate,
    step,
  ]);

  useEffect(() => {
    if (isOpenMatchingModal) {
      refetchMyMatchingForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenMatchingModal]);

  return (
    <Fragment>
      <Button
        bgColor={COLORS.PINK3}
        onClick={handleOnOpenMatchingModal}
        detailStyle={cssModalButtonStyle}
      >
        <Logo fill={COLORS.WHITE} width={60} height={60} />
      </Button>
      <Potal>
        <Modal
          zIndex={105}
          isOpen={isOpenMatchingModal}
          onClose={handleOnCloseMatchingModal}
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
                loading={mutationPostMatchingForm.isPending}
                disabled={!isEnableNextPage}
              >
                {step.current === 2
                  ? prevMatchingFormData
                    ? "수정하기"
                    : "여행 시작!"
                  : "다음"}
              </Button>
            </div>
          }
        >
          <Form formValue={form}>
            <BarStep
              step={step}
              stepList={stepList}
              contentDetailStyle={css`
                width: 99%;
                margin: 0 auto;
              `}
            />
          </Form>
        </Modal>
      </Potal>
      <Potal>
        <MatchingProcessModal />
      </Potal>
      <Potal>
        <EditModal form={postFormValue} />
      </Potal>
    </Fragment>
  );
};
export default MatchingButton;
