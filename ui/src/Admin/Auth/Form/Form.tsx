import { useFormInput } from "../../../Hooks/useFormInput";
import { FormEvent } from "react";
import { SignInType } from "../../../GraphQL/Mutation";
import { MutationTuple } from "@apollo/client/react/types/types";

type FormProps = {
  action: MutationTuple<SignInType["SignIn"], SignInType["SignInVars"]>[0];
};
export const Form = ({ action }: FormProps) => {
  const [formValue] = useFormInput({
    username: "",
    password: "",
    checkbox: "false"
  });
  const isValues = formValue.value.username && formValue.value.password;
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const variables = {
      username: formValue.value.username,
      password: formValue.value.password
    };
    if (formValue.value.checkbox === "true") {
      await action({
        variables,
        onCompleted: (data) => {
          console.log("localStore");
          localStorage.setItem("token", data.signIn);
        }
      });
    } else {
      await action({
        variables,
        onCompleted: (data) => {
          console.log("session");
          sessionStorage.setItem("token", data.signIn);
        }
      });
    }
  };

  return (
    <form data-testid={"form"} onSubmit={onSubmit}>
      <div className={"mb-4"}>
        <svg
          stroke="hsl(152, 69%, 41%)"
          fill="hsl(152, 69%, 41%)"
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="5em"
          width="5em"
          xmlns="http://www.w3.org/2000/svg"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM9 11V5h6v6H9zm6 2v6H9v-6h6zM5 5h2v2H5V5zm0 4h2v2H5V9zm0 4h2v2H5v-2zm0 4h2v2H5v-2zm14.002 2H17v-2h2.002v2zm-.001-4H17v-2h2.001v2zm0-4H17V9h2.001v2zM17 7V5h2v2h-2z" />
        </svg>
      </div>
      <h1 className="h3 mb-3 fw-normal">Выполните вход</h1>

      <div className="form-floating">
        <input
          type="username"
          name={"username"}
          className="form-control"
          id="floatingInput"
          placeholder="username"
          value={formValue.value.username}
          onChange={formValue.onChange}
        />
        <label htmlFor="floatingInput">Имя пользователя</label>
      </div>
      <div className="form-floating">
        <input
          name={"password"}
          type="password"
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
          value={formValue.value.password}
          onChange={formValue.onChange}
        />
        <label htmlFor="floatingPassword">Пароль</label>
      </div>

      <div className="checkbox mb-3">
        <label>
          <input
            className={"form-check-input"}
            type="checkbox"
            name={"checkbox"}
            value={formValue.value.checkbox}
            checked={formValue.value.checkbox === "true"}
            onChange={formValue.onChange}
          />{" "}
          Запомнить меня
        </label>
      </div>
      <button
        className={`w-100 btn btn-lg btn-success ${!isValues && "disabled"}`}
        type="submit"
        disabled={!isValues}
      >
        Войти
      </button>
    </form>
  );
};
