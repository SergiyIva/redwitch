import { useToggle } from "../../../../Hooks/useToggle";
import { TitleAdmin } from "../../../../Components/TitleAdmin/TitleAdmin";
import { addMonths, subMonths } from "date-fns";
import { Visits } from "../Visits/Visits";
import { Orders } from "../Orders/Orders";

const Month = () => {
  const [isCurrentMonth, toggleMonth] = useToggle(true);
  const base = new Date(
    `${new Date().getFullYear()}.${new Date().getMonth() + 1}.01`
  );
  const from = isCurrentMonth ? base : subMonths(base, 1);
  const to = isCurrentMonth ? addMonths(base, 1) : base;

  const onChange = () => {
    toggleMonth()();
  };

  return (
    <>
      <TitleAdmin>Статистика за месяц</TitleAdmin>
      <div className="mb-3 form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckChecked"
          checked={isCurrentMonth}
          onChange={onChange}
        />
        <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
          Показать текущий месяц
        </label>
      </div>
      <Visits from={from} to={to} isGtMonth={false} />
      <Orders from={from} to={to} isGtMonth={false} />
    </>
  );
};

export default Month;
