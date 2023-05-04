import * as S from "./Styles";

type FieldFormWarningProps = {
  value?: string;
  notAbsolute?: boolean;
  withoutStyle?: boolean;
};
export const FieldFormWarning = ({
  value,
  notAbsolute,
  withoutStyle
}: FieldFormWarningProps) => {
  return (
    <S.Warning
      className="invalid-feedback"
      notAbsolute={notAbsolute}
      withoutStyle={withoutStyle}
      data-testid={"warningField"}
    >
      {value && value !== "isValid" && <div role={"alert"}>{value}</div>}
    </S.Warning>
  );
};
