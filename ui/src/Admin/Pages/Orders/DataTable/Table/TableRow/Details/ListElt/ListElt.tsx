import * as S from "./Styles";
import { ColType } from "../../../../../Orders";
import { DefaultElt } from "./DefaultElt";

type ListEltProps = {
  col: ColType;
};
export const ListElt = ({ col }: ListEltProps) => {
  const Component = col.Cell || DefaultElt;
  return (
    <S.Element data-testid={"listElement"}>
      <S.TitleSpan>{col.title}</S.TitleSpan> <Component name={col.name} />
    </S.Element>
  );
};
