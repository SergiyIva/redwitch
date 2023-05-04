import * as S from "./Styles";
import { ColsType } from "../../../../Orders";
import { ListElt } from "./ListElt/ListElt";
import { FaPaperclip } from "react-icons/fa";
import { OrderControl } from "./OrderControl/OrderControl";

type DetailsProps = {
  tailCols: ColsType;
  colspan: number;
};
export const Details = ({ colspan, tailCols }: DetailsProps) => {
  return (
    <S.MainCell colSpan={colspan}>
      <S.ListWrapper>
        <S.ClipElt>
          <FaPaperclip />
        </S.ClipElt>
        {tailCols.map((col) => (
          <ListElt key={col.name} col={col} />
        ))}
        <OrderControl />
      </S.ListWrapper>
    </S.MainCell>
  );
};
