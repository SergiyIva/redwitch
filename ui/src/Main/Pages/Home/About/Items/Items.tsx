import { useQuery } from "@apollo/client";
import { GET_FEATURES, GetFeatures } from "../../../../../GraphQL/Query";
import { Spinner } from "../../../../../Components/Spinner/Spinner";
import { ItemsWrapper } from "./ItemsWrapper";
import { useEffect } from "react";

export const Items = () => {
  const { data, loading, error } = useQuery<GetFeatures>(GET_FEATURES);

  useEffect(() => {
    console.log(data);
  });
  if (loading) return <Spinner />;
  if (error) return <div>{error.message}</div>;
  if (!data!.getFeatures.length) return <div>Нет данных!</div>;
  return <ItemsWrapper items={data!.getFeatures} />;
};
