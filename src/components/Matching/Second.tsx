import { css } from "@emotion/react";
import { useMemo, useState } from "react";

import { useGetAreaCode } from "@/api/hooks/visitKorea";
import { COLORS } from "@/styles/color";

import RadioButtonGroup from "../RadioButton/RadioButtonGroup";
import { Typography } from "../Typography/Typography";
import { checkNotEmpty } from "./Matching";

const AreaMapping: { [key: string]: string } = {
  서울: "1",
  인천: "2",
  대전: "3",
  대구: "4",
  광주: "5",
  부산: "6",
  울산: "7",
  세종특별자치시: "8",
  경기도: "31",
  강원특별자치도: "32",
  충청북도: "33",
  충청남도: "34",
  경상북도: "35",
  경상남도: "36",
  전북특별자치도: "37",
  전라남도: "38",
  제주도: "39",
};

const Second = ({ form, registerField }: { form: any; registerField: any }) => {
  const { onChange } = registerField("areaCode");
  const { onChange: onChangeDetail } = registerField("areaDetailCode");
  const [areaCode, setAreaCode] = useState<string>();
  const { data } = useGetAreaCode();
  const { data: detailData } = useGetAreaCode({
    areaCode: areaCode ? AreaMapping[areaCode] : undefined,
  });
  const renderRadioButtonGroups = useMemo(() => {
    const radioButtonGroups: any[] = [];
    const areaCodeData = data?.data.response?.body?.items?.item;
    if (areaCodeData) {
      areaCodeData.forEach((item: { code: string; name: string }) => {
        radioButtonGroups.push(
          <RadioButtonGroup.RadioButton key={item.name} value={item.name}>
            {item.name}
          </RadioButtonGroup.RadioButton>
        );
      });
    }

    return radioButtonGroups;
  }, [data?.data.response?.body?.items?.item]);

  const renderDetailRadioButtonGroups = useMemo(() => {
    const radioButtonGroups: any[] = [];
    const areaCodeData = detailData?.data.response?.body?.items?.item;
    if (areaCodeData && areaCode) {
      areaCodeData.forEach((item: { code: string; name: string }) => {
        radioButtonGroups.push(
          <RadioButtonGroup.RadioButton key={item.name} value={item.name}>
            {item.name}
          </RadioButtonGroup.RadioButton>
        );
      });
    }

    return radioButtonGroups;
  }, [areaCode, detailData?.data.response?.body?.items?.item]);

  return (
    <div>
      <div
        css={css`
          display: flex;
          flex-direction: row;
        `}
      >
        {/* 대분류 들어가야함 */}
        <RadioButtonGroup
          {...registerField("areaCode")}
          defaultValue={
            checkNotEmpty([form.areaCode]) ? form.areaCode.value : undefined
          }
          gridType="row"
          buttonDetailStyle={css`
            width: 104px;
            height: 40px;
            font-weight: 400;
            font-size: 14px;
          `}
          onChange={(value) => {
            console.log(value);

            onChange(value);
            if (value !== "all") setAreaCode(value);
          }}
        >
          <RadioButtonGroup.RadioButton value="all">
            전국
          </RadioButtonGroup.RadioButton>
          {renderRadioButtonGroups}
        </RadioButtonGroup>
        <div
          css={css`
            height: auto;
            border: 1px solid ${COLORS.GRAY1};
            margin: 0px 16px;
          `}
        />
        <div
          css={css`
            width: 100%;
          `}
        >
          {/* 소분류 들어가야함 */}
          <Typography
            size={12}
            color={COLORS.GRAY3}
            detailStyle={css`
              display: block;
              margin-bottom: 16px;
            `}
          >
            *상세 지역은 꼭 고르지 않아도 괜찮아요!
          </Typography>
          <RadioButtonGroup
            {...registerField("areaDetailCode")}
            gridType="row"
            buttonDetailStyle={css`
              width: 100%;
              height: 40px;
              font-weight: 400;
              font-size: 14px;
            `}
            gridDetailStyle={css`
              width: 100%;
            `}
            onChange={(value) => {
              console.log(value);
              onChangeDetail(value);
            }}
          >
            {renderDetailRadioButtonGroups}
          </RadioButtonGroup>
        </div>
      </div>
    </div>
  );
};
export default Second;
