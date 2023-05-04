import { Selector } from "./Selector/Selector";
import { Search } from "./Search/Search";

export const TableSearch = () => {
  return (
    <div className="row mb-3">
      <Search />
      <Selector />
    </div>
  );
};
