import { Feature } from "../../../../../GraphQL/typeDefs";
import { Item } from "./Item/Item";
import { MutableRefObject, useRef } from "react";
import { useOnScreen } from "../../../../../Hooks/useOnScreen";

type ItemsWrapperProps = {
  items: Feature[];
};
export const ItemsWrapper = ({ items }: ItemsWrapperProps) => {
  const ref = useRef() as MutableRefObject<HTMLDivElement>;
  const animated = useOnScreen<HTMLDivElement>(ref, "-200px");
  return (
    <div className="row g-4 py-5 row-cols-1 row-cols-lg-3" ref={ref}>
      {items.map((f, i) => (
        <Item item={f} key={f.id} animated={animated} i={i} />
      ))}
    </div>
  );
};
