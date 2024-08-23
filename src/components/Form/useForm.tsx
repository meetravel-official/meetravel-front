import React, { useCallback, useState } from "react";

interface FormField<T> {
  value: T;
  error?: string;
}

export type FormValues<T extends Record<string, any>> = {
  [K in keyof T]: FormField<T[K]>;
};

type ValidateFunction<T> = (value: T) => string | undefined;

interface UseFormOptions<T extends Record<string, any>> {
  initialValues: T;
  required?: (keyof T)[];
  validate?: {
    [K in keyof T]?: ValidateFunction<T[K]>;
  };
}

/**
 * useForm - Form의 상태를 관리하는 hook.
 * @param initialValues Form의 초기값
 * @param required 필수 입력값을 설정하는 key 배열
 * @param validate Form의 각 field에 대한 validation 함수
 * @returns form, handleChange, registerField, invalidFields, resetFields
 */
function useForm<T extends Record<string, any>>({
  initialValues,
  required,
  validate,
}: UseFormOptions<T>) {
  const [form, setForm] = useState<FormValues<T>>(() => {
    const initialFormValues: FormValues<T> = {} as FormValues<T>;
    for (const key in initialValues) {
      initialFormValues[key] = { value: initialValues[key] };
    }
    return initialFormValues;
  });

  const handleChange = useCallback(
    (name: keyof T, value: T[keyof T]) => {
      setForm((prevValues) => ({
        ...prevValues,
        [name]: {
          value,
          error: validate?.[name] ? validate[name]?.(value) : undefined,
        },
      }));
    },
    [validate]
  );

  const registerField = useCallback(
    (name: keyof T) => {
      return {
        value: form[name].value,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(name, e.target.value as T[keyof T]),
        error: form[name].error,
      };
    },
    [form, handleChange]
  );

  const invalidFields = useCallback(
    (
      callback: ({
        value,
        errors,
      }: {
        value: FormValues<T>;
        errors?: { error: keyof T; errorText: string }[];
      }) => void
    ) => {
      const errors: Partial<Record<keyof T, string>> = {};
      for (const key in form) {
        if (validate?.[key]) {
          errors[key] = validate?.[key]?.(form[key].value);
        }

        if (required?.includes(key) && !form[key].value && !errors[key]) {
          errors[key] = "필수 입력값입니다.";
        }
      }

      setForm((prevValues) => {
        const newForm = { ...prevValues };
        for (const key in newForm) {
          newForm[key] = { ...newForm[key], error: errors[key] };
        }
        return newForm;
      });

      const hasErrors = Object.entries(errors)
        .filter((error) => error[1] !== undefined)
        .map((error) => ({
          error: error[0],
          errorText: error[1] || "useForm error",
        }));

      callback({
        value: form,
        errors: hasErrors.length > 0 ? hasErrors : undefined,
      });
    },
    [form, required, validate]
  );

  const resetFields = useCallback(() => {
    setForm((prevValues) => {
      const newForm = { ...prevValues };
      for (const key in newForm) {
        newForm[key] = { value: initialValues[key] };
      }
      return newForm;
    });
  }, [initialValues]);

  return {
    form: form,
    handleChange,
    registerField,
    invalidFields,
    resetFields,
  };
}

export default useForm;
