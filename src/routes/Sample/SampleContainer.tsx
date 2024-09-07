import { css } from "@emotion/react";
import { Fragment, useState } from "react";

import { ReactComponent as ChatIcon } from "@/assets/icons/cross.svg";
import Form from "@/components/Form/Form";
import { FormItem } from "@/components/Form/FormItem";
import useForm from "@/components/Form/useForm";
import Input from "@/components/Input/Input";
import Modal from "@/components/Modal/Modal";
import RadioButtonGroup from "@/components/RadioButton/RadioButtonGroup";
import { COLORS } from "@/styles/color";
import CheckButtonGroup from "@/components/CheckButton/CheckButtonGroup";

export interface UserForm {
  hobby: string;
  email: string;
  requiredTest1?: string;
  requiredTest2?: string;
  age?: number;
  notRequiredTest: string;
}

export const SampleContainer = () => {
  const { form, registerField, invalidFields } = useForm<UserForm>({
    initialValues: {
      hobby: "initial hobby text",
      email: "",
      age: undefined,
      requiredTest1: "",
      requiredTest2: "",
      notRequiredTest: "",
    },
    required: ["age", "requiredTest1", "requiredTest2"],
    validate: {
      hobby: (value) =>
        value.length < 1 ? "취미는 한글자 이상이어야 합니다." : undefined,
      email: (value) =>
        !value.includes("@") ? "올바른 이메일 형식이 아닙니다." : undefined,
      age: (value) =>
        value && value < 0 ? "나이는 0보다 작을 수 없습니다." : undefined,
    },
  });

  const handleSubmit = () => {
    invalidFields(({ errors, value }) => {
      if (errors) {
        console.log("error in if", errors);
      } else {
        console.log("error in else", value);
      }
    });
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [modalOpen3, setModalOpen3] = useState(false);

  const handleModal = () => {
    setModalOpen((prev) => !prev);
  };

  const [radioValue, setRadioValue] = useState("a");

  return (
    <div>
      <Form formValue={form} onSubmit={handleSubmit}>
        <FormItem
          name="hobby"
          label="취미"
          labelStyle={{ color: COLORS.GRAY1, fontSize: "30px" }}
        >
          <Input {...registerField("hobby")} placeholder="취미" />
        </FormItem>

        <FormItem name="email" label="이메일">
          <Input
            {...registerField("email")}
            placeholder="이메일을 입력해주세요"
          />
        </FormItem>
        <FormItem name="age" label="나이">
          <Input {...registerField("age")} />
        </FormItem>

        <FormItem
          name="requiredTest1"
          label="필수입력"
          errorStyle={{ display: "block" }} // error text 노출
        >
          <Input
            {...registerField("requiredTest1")}
            placeholder="필수 입력 인풋 + error text 노출"
          />
        </FormItem>

        <FormItem name="requiredTest2" label="필수입력2">
          <Input
            {...registerField("requiredTest2")}
            placeholder="필수 입력 인풋 + error text 비노출"
          />
        </FormItem>

        <FormItem
          name="notRequiredTest"
          label="제한없음"
          errorStyle={{ display: "block" }}
        >
          <Input
            {...registerField("notRequiredTest")}
            placeholder="입력 제한 없음"
          />
        </FormItem>

        <button type="submit">제출</button>
      </Form>
      <br />
      <br />
      <Input
        detailStyle={css`
          background-color: ${COLORS.WHITE};
          outline: 1px solid ${COLORS.PINK1};
        `}
        suffix={<ChatIcon />}
      />
      <br />

      <button>매칭시작 </button>
      <br />
      <button onClick={handleModal}>simple 모달 열기</button>
      <Modal
        isOpen={modalOpen}
        onClose={handleModal}
        title="제목 얍얍"
        modalType="simple"
        footer={
          <Fragment>
            <Modal.Button bgColor={COLORS.PINK3}>어쩌구</Modal.Button>
            <Modal.Button>저쩌구</Modal.Button>
          </Fragment>
        }
      >
        <p>모달 내용 얍얍</p>
        <p>모달 내용 얍얍</p>
        <p>모달 내용 얍얍</p>
      </Modal>
      <button onClick={() => setModalOpen2(true)}>normal 모달 열기</button>
      <Modal
        isOpen={modalOpen2}
        onClose={() => setModalOpen2(false)}
        title="제목 얍얍"
        modalType="normal"
      >
        <p>모달 내용 얍얍</p>
        <p>모달 내용 얍얍</p>
        <p>모달 내용 얍얍</p>
        {<Modal.Button>어쩍구</Modal.Button>}
      </Modal>
      <button onClick={() => setModalOpen3(true)}>full 모달 열기</button>
      <Modal
        isOpen={modalOpen3}
        onClose={() => setModalOpen3(false)}
        title="제목 얍얍"
        modalType="full"
      >
        <p>모달 내용 얍얍</p>
        <p>모달 내용 얍얍</p>
        <p>모달 내용 얍얍</p>
      </Modal>
      <br />
      <br />
      <RadioButtonGroup
        defaultValue={radioValue}
        onChange={(e) => {
          console.log(e);
          return setRadioValue(e);
        }}
      >
        <RadioButtonGroup.RadioButton value="a">
          당일 치기
          <br />
          <span
            css={css`
              font-size: 14px;
              font-weight: 400;
            `}
          >
            (토/일)
          </span>
        </RadioButtonGroup.RadioButton>
        <RadioButtonGroup.RadioButton
          value="b"
          detailStyle={css`
            width: 200px;
          `}
        >
          항목 B
        </RadioButtonGroup.RadioButton>
        <RadioButtonGroup.RadioButton value="c">
          항목 C
        </RadioButtonGroup.RadioButton>
      </RadioButtonGroup>
      <br />
      <br />
      <RadioButtonGroup
        gridType="row"
        defaultValue="a"
        onChange={(e) => {
          return console.log(e);
        }}
        buttonDetailStyle={css`
          height: 100px;
        `}
      >
        <RadioButtonGroup.RadioButton value="a">
          당일 치기
          <br />
          <span
            css={css`
              font-size: 14px;
              font-weight: 400;
            `}
          >
            (토/일)
          </span>
        </RadioButtonGroup.RadioButton>
        <RadioButtonGroup.RadioButton value="b">
          항목 B
        </RadioButtonGroup.RadioButton>
        <RadioButtonGroup.RadioButton value="c">
          항목 C
        </RadioButtonGroup.RadioButton>
      </RadioButtonGroup>
      <br />
      <br />
      <CheckButtonGroup
        defaultValue="a"
        onChange={(e) => {
          return console.log(e);
        }}
      >
        <CheckButtonGroup.CheckboxButton value="a">
          당일 치기
          <br />
          <span
            css={css`
              font-size: 14px;
              font-weight: 400;
            `}
          >
            (토/일)
          </span>
        </CheckButtonGroup.CheckboxButton>
        <CheckButtonGroup.CheckboxButton value="b">
          항목 B
        </CheckButtonGroup.CheckboxButton>
        <CheckButtonGroup.CheckboxButton
          value="c"
          detailStyle={css`
            width: 10px !important;
          `}
        >
          항목 C
        </CheckButtonGroup.CheckboxButton>
      </CheckButtonGroup>
    </div>
  );
};
