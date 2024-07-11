import { useStepConsumer } from "./Step";

export const StepContent = () => {
  const { stepList, current } = useStepConsumer();

  return <div>{stepList[current].content}</div>;
};
