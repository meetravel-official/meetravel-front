import React from "react";

import { FormValues } from "./useForm";

interface FormProps {
  children: React.ReactNode;
  value?: FormValues<any>;
  onSubmit?: () => void;
}

/**
 * Form - Form 전체를 감싸는 컴포넌트
 * @param value useForm에서 공유하는 form value
 * @param onSubmit form 전송 시 실행할 함수
 */
const Form = ({ children, value, onSubmit }: FormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    return onSubmit ? onSubmit() : null;
  };
  const renderChildren = () => {
    if (children) {
      return React.Children.map(
        children as React.ReactElement[],
        (child: React.ReactElement) => {
          if (value && typeof child?.type === "function") {
            return React.cloneElement(child, {
              value: value,
            });
          } else {
            return child;
          }
        }
      );
    }
    return children;
  };

  return <form onSubmit={handleSubmit}>{renderChildren()}</form>;
};

export default Form;
