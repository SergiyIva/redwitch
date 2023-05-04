import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_SERVICE_CARD, GetServiceCardType } from "../../../GraphQL/Query";
import { Spinner } from "../../../Components/Spinner/Spinner";
import { UPSERT_CARD, UpsertCardType } from "../../../GraphQL/Mutation";
import { useState } from "react";
import { ErrorMutationAdmin } from "../../../Components/ErrorMutation/ErrorMutationAdmin";
import { SuccessMutationAdmin } from "../../../Components/SuccessMutation/SuccessMutationAdmin";
import { ErrorQueryAdmin } from "../../../Components/ErrorQuery/ErrorQueryAdmin";
import { DeleteCard } from "./DeleteCard/DeleteCard";
import { useToggle } from "../../../Hooks/useToggle";
import { Form } from "../AddCard/Form/Form";
import { _GET_SERVICE_CARD } from "../../../GraphQL/TestQuery";
import { TitleAdmin } from "../../../Components/TitleAdmin/TitleAdmin";

const query =
  process.env.NODE_ENV === "test" ? _GET_SERVICE_CARD : GET_SERVICE_CARD;

const EditCard = () => {
  const param = useParams();
  const [success, setSuccess] = useToggle(false);
  const [isError, setError] = useState<null | Error>(null);
  const { data, loading, error } = useQuery<
    GetServiceCardType["GetServiceCard"],
    GetServiceCardType["GetServiceCardVars"]
  >(query, {
    variables: {
      idx: param.sku!
    }
  });
  const [addCard, { loading: mutLoad }] = useMutation<
    UpsertCardType["UpsertCard"],
    UpsertCardType["UpsertCardVars"]
  >(UPSERT_CARD, {
    onCompleted: (data) => {
      setSuccess(true)();
    },
    onError: (error1) => setError(error1)
  });

  if (loading || mutLoad) return <Spinner />;
  if (error) return <ErrorQueryAdmin error={error} />;
  if (success) return <SuccessMutationAdmin goBack={"/admin/products"} />;
  if (isError)
    return (
      <ErrorMutationAdmin error={isError} tryAgain={() => setError(null)} />
    );
  return (
    <>
      <TitleAdmin>Редактировать услугу</TitleAdmin>
      <div className="py-3 text-center">
        <p className="lead">
          Измените значения в полях формы, что представлена ниже. Нажмите кнопку
          "Сохранить".
        </p>
      </div>

      <div className="row pb-5">
        <div className="col-md-7 col-lg-8">
          {data && data.getCards.length ? (
            <>
              <h4 className="mb-3">Новые данные</h4>
              <Form card={data.getCards[0]} addCard={addCard} />
              <DeleteCard
                card={data.getCards[0]}
                setSuccess={setSuccess}
                setError={setError}
              />
            </>
          ) : (
            <>
              <h4 className="mb-3">Нет данных по данной услуге.</h4>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default EditCard;
