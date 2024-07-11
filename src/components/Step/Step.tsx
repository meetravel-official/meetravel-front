import { createContext, useContext, useEffect } from "react";

import { cssStepContainerStyle } from "./Step.styles";
import { StepContent } from "./StepContent";
import { StepContextProps, StepProps } from "./StepInterface";
import { Stepper } from "./Stepper";
import { useStep } from "./useStep";

const StepContext = createContext<StepContextProps>({} as StepContextProps);

export const useStepConsumer = () => {
  return useContext(StepContext);
};

/**
 * Step - 모든 스텝 세부 컴포넌트를 감싸는 영역
 * @param step useStep 을 이용해서 현재 위치 등의 상태 공유
 * @param stepList 스텝의 각 단계 지정
 */
export const Step = ({ step, stepList, children }: StepProps) => {
  const { current, setCurrent, setMax } = step;

  useEffect(() => {
    setMax(stepList.length - 1);
  });

  return (
    <div className="step" css={cssStepContainerStyle}>
      <StepContext.Provider value={{ stepList, current, setCurrent }}>
        {children}
      </StepContext.Provider>
    </div>
  );
};

Step.Stepper = Stepper;
Step.Content = StepContent;
Step.useStep = useStep;
