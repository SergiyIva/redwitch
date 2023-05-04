import { useNavigate } from "react-router-dom";
import { Form } from "./Form/Form";
import { useMutation } from "@apollo/client";
import { SIGNIN_USER, SignInType } from "../../GraphQL/Mutation";
import { Spinner } from "../../Components/Spinner/Spinner";
import { IS_LOGGED_IN } from "../../GraphQL/Query";

export const Auth = () => {
  const navigate = useNavigate();
  const [signIn, { loading, error, client }] = useMutation<
    SignInType["SignIn"],
    SignInType["SignInVars"]
  >(SIGNIN_USER, {
    onError: (error) => console.log(error.message),
    onCompleted: (data) => {
      console.log(data.signIn);
      client.cache.writeQuery({
        query: IS_LOGGED_IN,
        data: { isLoggedIn: true }
      });
      navigate("/admin/main", { replace: true });
    }
  });
  return (
    <div className="text-center auth-body">
      <main className="form-signin">
        {loading ? <Spinner /> : <Form action={signIn} />}
        {error && (
          <div className={"invalid-feedback d-block"}>
            Неверный логин/пароль!
          </div>
        )}
        <p className="mt-5 mb-3 text-muted">© NailNet, 2022</p>
      </main>
    </div>
  );
};

export default Auth;
