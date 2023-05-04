import { Feature } from "../../../../../../GraphQL/typeDefs";
import * as S from "./Styles";
import {
  FcApproval,
  FcElectronics,
  FcLike,
  FcMoneyTransfer,
  FcOnlineSupport,
  FcOvertime
} from "react-icons/fc";

const getIcon = (id: string) => {
  if (id === "date") {
    return <FcOvertime />;
  } else if (id === "price") {
    return <FcMoneyTransfer />;
  } else if (id === "supp") {
    return <FcOnlineSupport />;
  } else if (id === "qual") {
    return <FcApproval />;
  } else if (id === "tech") {
    return <FcElectronics />;
  } else {
    return <FcLike />;
  }
};

export type ItemProps = {
  item: Feature;
  i: number;
  animated: boolean;
};
export const Item = ({ item, i, animated }: ItemProps) => {
  return (
    <>
      <S.Wrapper
        $animated={animated}
        $index={i}
        className="col d-flex align-items-start"
      >
        <div className="icon-square bg-light text-dark flex-shrink-0 me-3">
          <S.IconDivider className="bi" data-testid={item.icon}>
            {getIcon(item.icon)}
          </S.IconDivider>
        </div>
        <div>
          <S.Heading>{item.title}</S.Heading>
          <S.Paragraph>{item.description}</S.Paragraph>
        </div>
      </S.Wrapper>
    </>
  );
};
