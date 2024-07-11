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
 * Step
 * @param step useStep 을 이용해서 index 등의 상태를 공유합니다.
 * @param stepList 각 단계들을 넣어주세요
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
