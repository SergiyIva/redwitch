import * as S from "./Styles";

export const stages = [
  {
    stage: 1,
    name: "Оформление"
  },
  {
    stage: 2,
    name: "Контактные данные"
  },
  {
    stage: 3,
    name: "Описание работы"
  },
  {
    stage: 4,
    name: "Подтверждение"
  }
];

type SubHeaderProps = {
  currStage: number;
  isHidden: boolean;
};

export const getStatus = (stage: number, currStage: number) => {
  if (stage === currStage) return "active";
  else if (stage < currStage) return "on";
  else return "off";
};

export const SubHeader = ({ currStage, isHidden }: SubHeaderProps) => {
  return (
    <S.SubHeader isHidden={isHidden} role={"header"}>
      <S.NumStageWrapper>
        {stages.map(({ stage }) => (
          <S.NumCircle
            status={getStatus(stage, currStage)}
            key={stage}
            data-testid={"numCircle" + stage}
          >
            <S.Number status={getStatus(stage, currStage)} isFour={stage === 4}>
              {stage}
            </S.Number>
          </S.NumCircle>
        ))}
        <S.LineProgress>
          <S.ProgressBar stage={currStage} />
        </S.LineProgress>
      </S.NumStageWrapper>
      <S.DescribeWrapper>
        {stages.map(({ stage, name }) => (
          <S.StageDescribe isActive={stage === currStage} key={name}>
            {name}
          </S.StageDescribe>
        ))}
      </S.DescribeWrapper>
    </S.SubHeader>
  );
};
