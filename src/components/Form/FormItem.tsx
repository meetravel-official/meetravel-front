import { SerializedStyles } from "@emotion/react";
import React, { ReactElement } from "react";

import {
  cssFormItemErrorStyle,
  cssFormItemLabelStyle,
  cssFormItemStyle,
} from "./Form.styles";
import { FormValues } from "./useForm";

interface FormItemProps {
  name: string;
  label: string;
  value?: FormValues<any>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  children: ReactElement;
  labelStyle?: SerializedStyles;
  formItemStyle?: SerializedStyles;
  errorStyle?: ErrorStyle;
}
export interface ErrorStyle {
  fontSize?: string;
  display?: string;
}

/**
 * FormItem - Form 내부의 field를 감싸는 컴포넌트.
 * 각 field의 label과 error message를 표시.
 * @param name useForm에서 공유하는 form value의 key
 * @param label field의 label
 * @param labelStyle label의 style.
 * @param formItemStyle label의 style.
 * @param errorStyle error message의 style. ```display: block```으로 설정하면 error message가 노출됨. 비노출이 기본값.
 * @param value form에서 cloneElement로 전달받은 form value
 */
export const FormItem: React.FC<FormItemProps> = ({
  name,
  label,
  value,
  labelStyle,
  formItemStyle,
  errorStyle,
  children,
}) => {
  return (
    <div css={cssFormItemStyle(formItemStyle)}>
      <div css={cssFormItemLabelStyle(labelStyle)}>
        <label htmlFor={name}>{label}</label>
      </div>
      <div> {children}</div>
      <div css={cssFormItemErrorStyle(errorStyle)} className="test">
        {value && value[name]?.error && (
          <span className="error">{value[name].error}</span>
        )}
      </div>
    </div>
  );
};
