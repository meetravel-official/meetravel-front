import { useState } from "react";

import Form from "@/components/Form/Form";
import { FormItem } from "@/components/Form/FormItem";
import useForm from "@/components/Form/useForm";
import Input from "@/components/Input/Input";
import { COLORS } from "@/styles/color";
export interface UserForm {
  hobby: string;
  email: string;
  requiredTest1?: string;
  requiredTest2?: string;
  age?: number;
  notRequiredTest: string;
}

export const SampleContainer = () => {
  const { form, registerField, isValid, resetFields, invalidFields } =
    useForm<UserForm>({
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

  const [testReset, setTestReset] = useState(false);

  console.log("///////");

  const handleSubmit = () => {
    invalidFields();
    if (isValid()) {
      console.log("Form submitted:", form);
      resetFields();
    } else {
      console.log("Form has errors");
    }
  };

  return (
    <Form value={form} onSubmit={handleSubmit}>
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

      <button type="submit" onClick={() => setTestReset(false)}>
        제출
      </button>
      <button type="submit" onClick={() => setTestReset(true)}>
        제출 후 리셋
      </button>
    </Form>
  );
};
