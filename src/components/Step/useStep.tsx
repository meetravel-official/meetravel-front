import { useState } from "react";

import { StepInstance, StepKey } from "./StepInterface";

export const useStep: () => [StepInstance] = () => {
  const [current, setCurrent] = useState<StepKey>(0);
  const [max, setMax] = useState(0);

  const handleOnClickNext = () => {
    if (current < max) setCurrent(current + 1);
  };

  const handleOnClickPrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const handleOnReset = () => {
    setCurrent(0);
  };

  const isFirst = current === 0;

  const isLast = current === max;

  const stepInstance: StepInstance = {
    current,
    isFirst,
    isLast,
    setCurrent,
    setMax,
    handleOnClickNext,
    handleOnClickPrev,
    handleOnReset,
  };

  return [stepInstance];
};
