import { TitleAdmin } from "../../../../Components/TitleAdmin/TitleAdmin";
import { useToggle } from "../../../../Hooks/useToggle";
import { Visits } from "../Visits/Visits";

const Year = () => {
  const [isCurrentYear, toggleYear] = useToggle(true);
  const base = new Date(`${new Date().getFullYear()}.01.01`);
  const from = isCurrentYear
    ? base
    : new Date(`${new Date().getFullYear() - 1}.01.01`);
  const to = isCurrentYear
    ? new Date(`${new Date().getFullYear()}.${new Date().getMonth() + 2}.01`)
    : base;

  const onChange = () => {
    toggleYear()();
  };

  return (
    <>
      <TitleAdmin>Статистика за год</TitleAdmin>
      <div className="mb-3 form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckChecked"
          checked={isCurrentYear}
          onChange={onChange}
        />
        <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
          Показать текущий год
        </label>
      </div>
      <Visits from={from} to={to} />
    </>
  );
};

export default Year;
