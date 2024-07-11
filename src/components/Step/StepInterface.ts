import { PropsWithChildren, ReactNode } from "react";

export type StepKey = number;

export interface StepItem {
  content: ReactNode;
}

export type StepList = StepItem[];

export interface StepContextProps {
  current: StepKey;
  setCurrent: (key: StepKey) => void;
  stepList: StepList;
}

export interface StepInstance {
  current: StepKey;
  isFirst: boolean;
  isLast: boolean;
  setCurrent: (key: StepKey) => void;
  setMax: (key: StepKey) => void;
  handleOnClickNext: () => void;
  handleOnClickPrev: () => void;
  handleOnReset: () => void;
}

export interface StepProps extends PropsWithChildren {
  step: StepInstance;
  stepList: StepList;
}
