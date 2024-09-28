import { useEffect } from "react";
import { useHeaderState } from "states/useHeader";

export const SettingContainer = () => {
  const { setTitle } = useHeaderState();

  useEffect(() => {
    setTitle("설정");
  }, [setTitle]);

  return <div>설정</div>;
};
