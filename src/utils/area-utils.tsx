export const getShortAreaName = (areaName: string) => {
  switch (areaName) {
    case "세종특별자치시":
    case "강원특별자치도":
    case "전북특별자치도":
      return areaName.slice(0, 2);
    case "충청북도":
    case "충청남도":
    case "경상북도":
    case "경상남도":
    case "전라북도":
    case "전라남도":
      return areaName[0] + areaName[2];
    default:
      return areaName;
  }
};
