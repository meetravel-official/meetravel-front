import { useEffect } from "react";
import { useHeaderState } from "states/useHeader";

export const TermsOfServiceContainer = () => {
  const { setTitle } = useHeaderState();
  useEffect(() => {
    setTitle("이용약관");
  }, [setTitle]);
  return <div>이용약관</div>;
};
