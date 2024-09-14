import { css } from "@emotion/react";

import { ReactComponent as CampingIcon } from "@/assets/icons/tag-camp.svg";
import { ReactComponent as CityIcon } from "@/assets/icons/tag-city.svg";
import { ReactComponent as HealingIcon } from "@/assets/icons/tag-healing.svg";
import { ReactComponent as LeisureIcon } from "@/assets/icons/tag-leisure.svg";
import { ReactComponent as LifeIcon } from "@/assets/icons/tag-life.svg";
import { ReactComponent as MountainIcon } from "@/assets/icons/tag-mountain.svg";
import { ReactComponent as NightIcon } from "@/assets/icons/tag-night.svg";
import { ReactComponent as ResortIcon } from "@/assets/icons/tag-resort.svg";
import { ReactComponent as SeaIcon } from "@/assets/icons/tag-sea.svg";
import { ReactComponent as SuburbIcon } from "@/assets/icons/tag-suburb.svg";
import { ReactComponent as TraditionalIcon } from "@/assets/icons/tag-traditional.svg";
import { ReactComponent as WalkingIcon } from "@/assets/icons/tag-walking.svg";
import { COLORS } from "@/styles/color";

import { Tag } from "../Tag/Tag";
import { Typography } from "../Typography/Typography";

export const tagKeywordList = [
  "산",
  "바다",
  "도시",
  "근교",
  "캠핑",
  "걷기여행",
  "야경",
  "전통문화",
  "생활관광",
  "레저체험",
  "휴양",
  "힐링",
];

interface ITagKeyword {
  keyword: string;
  returnType?: "tag" | "icon";
}

const TagKeyword = ({ keyword, returnType = "tag" }: ITagKeyword) => {
  const keywordMapping: { [key: string]: JSX.Element } = {
    산: <MountainIcon />,
    바다: <SeaIcon />,
    도시: <CityIcon />,
    근교: <SuburbIcon />,
    캠핑: <CampingIcon />,
    걷기여행: <WalkingIcon />,
    야경: <NightIcon />,
    전통문화: <TraditionalIcon />,
    생활관광: <LifeIcon />,
    레저체험: <LeisureIcon />,
    휴양: <ResortIcon />,
    힐링: <HealingIcon />,
  };
  if (returnType === "icon") {
    return keywordMapping[keyword];
  }
  return (
    <Tag
      icon={keywordMapping[keyword]}
      detailStyle={css`
        background-color: ${COLORS.WHITE};
        outline: 1px solid ${COLORS.GRAY3};
      `}
    >
      <Typography color={COLORS.GRAY5}>{keyword}</Typography>
    </Tag>
  );
};
export default TagKeyword;