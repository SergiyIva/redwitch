import { MutableRefObject, useRef } from "react";
import { useOnScreen } from "../../../../Hooks/useOnScreen";
import { Card } from "./Card/Card";
import { Cardservice } from "../../../../GraphQL/typeDefs";

type CardsWrapperProps = {
  cards: Cardservice[];
};
export const CardsWrapper = ({ cards }: CardsWrapperProps) => {
  const ref = useRef() as MutableRefObject<HTMLDivElement>;
  const animated = useOnScreen<HTMLDivElement>(ref, "-200px");

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3" ref={ref}>
      {cards.map((c, i) => (
        <Card card={c} key={c.id} animated={animated} index={i} />
      ))}
    </div>
  );
};
