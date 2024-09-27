import { SerializedStyles } from "@emotion/react";
import React from "react";

import { FormValues } from "./useForm";

interface FormProps {
  formStyle?: SerializedStyles;
  children: React.ReactNode;
  formValue?: FormValues<any>;
  onSubmit?: () => void;
}

/**
 * Form - Form 전체를 감싸는 컴포넌트
 * @param formValue useForm에서 공유하는 form value
 * @param onSubmit form 전송 시 실행할 함수
 */
const Form = ({ children, formValue, formStyle, onSubmit }: FormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    return onSubmit ? onSubmit() : null;
  };
  const renderChildren = () => {
    if (children) {
      return React.Children.map(
        children as React.ReactElement[],
        (child: React.ReactElement) => {
          if (
            formValue &&
            (child?.type as React.JSXElementConstructor<any>)?.name ===
              "FormItem"
          ) {
            return React.cloneElement(child, {
              value: formValue,
            });
          } else {
            return child;
          }
        }
      );
    }
    return children;
  };

  return (
    <form css={formStyle} onSubmit={handleSubmit}>
      {renderChildren()}
    </form>
  );
};

export default Form;
