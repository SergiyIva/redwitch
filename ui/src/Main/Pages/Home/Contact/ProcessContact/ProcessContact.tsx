import { useMutation } from "@apollo/client";
import { Form } from "./Form/Form";
import { useState } from "react";
import { ThankYou } from "./ThankYou/ThankYou";
import { ContactError } from "./ContactError/ContactError";
import {
  ADD_CALL_ORDER,
  AddCallorderType
} from "../../../../../GraphQL/Mutation";
import { Spinner } from "../../../../../Components/Spinner/Spinner";
import * as S from "./Styles";

const ProcessContact = () => {
  const [sendForm, { loading, error }] = useMutation<
    AddCallorderType["AddCallorder"],
    AddCallorderType["AddCallorderVars"]
  >(ADD_CALL_ORDER, {
    onCompleted: (data) => {
      if (data.addCallorder) setSuccess("TRUE");
      else setSuccess("FALSE");
    },
    onError: (err) => console.error(err)
  });
  const [success, setSuccess] = useState("");

  return (
    <>
      <S.StateDivider
        isHidden={!loading && success === "" && !error}
        data-testid={"stateDivider"}
      >
        {loading && <Spinner />}
        {success === "TRUE" && <ThankYou />}
        {(success === "FALSE" || !!error) && <ContactError />}
      </S.StateDivider>
      <S.Wrapper
        isHidden={
          loading || success === "TRUE" || success === "FALSE" || !!error
        }
      >
        <S.Heading>Связаться с нами</S.Heading>
        <S.Describe>
          Заполните небольшую форму ниже и мы свяжемся с Вами в ближайшее время.
        </S.Describe>
        <Form action={sendForm} />
      </S.Wrapper>
    </>
  );
};

export default ProcessContact;
