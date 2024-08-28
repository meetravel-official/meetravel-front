import { useState } from "react";

import { Typography } from "@/components";
import Select from "@/components/Select/Select";
import { cssAlignVerticalStyle } from "@/styles/align";

export const ProfileContainer = () => {
  const SelectItems = [
    { key: "latest", value: "최신순" },
    { key: "deadline", value: "마감순" },
    { key: "distance", value: "거리순" },
  ];

  const [selectedValue, setSelectedValue] = useState(SelectItems[0].value);

  return (
    <div css={cssAlignVerticalStyle({ gap: 16, alignItems: "flex-start" })}>
      <Typography>프로필</Typography>
      <Select
        value={selectedValue}
        selectOptions={SelectItems}
        onChange={setSelectedValue}
      />
    </div>
  );
};
