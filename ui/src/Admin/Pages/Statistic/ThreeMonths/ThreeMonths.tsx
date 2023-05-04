import { TitleAdmin } from "../../../../Components/TitleAdmin/TitleAdmin";
import { addMonths, subMonths } from "date-fns";
import { Visits } from "../Visits/Visits";

const ThreeMonths = () => {
  const base = new Date(
    `${new Date().getFullYear()}.${new Date().getMonth() + 1}.01`
  );
  const from = subMonths(base, 2);
  const to = addMonths(base, 1);

  return (
    <>
      <TitleAdmin>Статистика за квартал</TitleAdmin>
      <Visits from={from} to={to} />
    </>
  );
};

export default ThreeMonths;
