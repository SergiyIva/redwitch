import { Cardservice } from "../../../../../GraphQL/typeDefs";
import { orderSKUVar } from "../../../../../GraphQL/Cache";
import * as S from "./Styles";

const uri = process.env.REACT_APP_URI;
type CardProps = {
  index: number;
  card: Cardservice;
  animated: boolean;
};
export const Card = ({ index, card, animated }: CardProps) => {
  return (
    <S.Wrapper
      $animated={animated}
      $index={index}
      className="col"
      data-testid={"cardwrapper"}
    >
      <div className="card shadow-sm">
        <img
          src={`${uri}${card.srcImg}`}
          alt={card.name}
          className="bd-placeholder-img card-img-top img-card"
          width="100%"
          height="225"
          aria-label={`Placeholder: ${card.name}`}
        />
        <div className="card-body">
          <h5>{card.name}</h5>
          <p className="card-text">{card.describe}</p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-sm btn-outline-success"
                data-bs-toggle={"modal"}
                data-bs-target={"#staticBackdropLive"}
                onClick={() => orderSKUVar(card.sku)}
              >
                Оформить
              </button>
            </div>
          </div>
        </div>
      </div>
    </S.Wrapper>
  );
};
