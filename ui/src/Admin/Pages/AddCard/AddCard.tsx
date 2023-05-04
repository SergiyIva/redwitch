import { Form } from "./Form/Form";
import { useMutation } from "@apollo/client";
import { UPSERT_CARD, UpsertCardType } from "../../../GraphQL/Mutation";
import { Spinner } from "../../../Components/Spinner/Spinner";
import { ErrorMutationAdmin } from "../../../Components/ErrorMutation/ErrorMutationAdmin";
import { SuccessMutationAdmin } from "../../../Components/SuccessMutation/SuccessMutationAdmin";
import { useToggle } from "../../../Hooks/useToggle";
import { useUpdateServiceCards } from "../../../Hooks/useUpdateServiceCards";
import { useState } from "react";
import { TitleAdmin } from "../../../Components/TitleAdmin/TitleAdmin";

const AddCard = () => {
  const setCards = useUpdateServiceCards();
  const [success, setSuccess] = useToggle(false);
  const [isError, setError] = useState<null | Error>(null);
  const [addCard, { loading }] = useMutation<
    UpsertCardType["UpsertCard"],
    UpsertCardType["UpsertCardVars"]
  >(UPSERT_CARD, {
    onCompleted: (data) => {
      setSuccess(true)();
      setCards(data.upsertCard);
    },
    onError: (err) => setError(err)
  });

  if (loading) return <Spinner />;
  if (success) return <SuccessMutationAdmin repeat={setSuccess(false)} />;
  if (isError)
    return (
      <ErrorMutationAdmin error={isError} tryAgain={() => setError(null)} />
    );
  return (
    <>
      <TitleAdmin>Добавить новую услугу</TitleAdmin>
      <div className="py-3 text-center">
        <p className="lead">
          Заполните форму ниже, для добавления нового вида услуги. Заполните все
          предложенные поля.
        </p>
      </div>

      <div className="row pb-5">
        <div className="col-md-7 col-lg-8">
          <h4 className="mb-3">Введите данные</h4>

          <Form addCard={addCard} />
        </div>
      </div>
    </>
  );
};
export default AddCard;
