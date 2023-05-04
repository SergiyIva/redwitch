import { Callorder as CallorderType } from "../../../../../GraphQL/typeDefs";

type CallorderProps = {
  order: CallorderType;
};

export const getPhone = (phone: string) => {
  const value = [...phone];
  value.splice(3, 0, ")");
  value.splice(7, 0, "-");
  value.splice(10, 0, "-");
  value.unshift("(");
  value.unshift("8");
  return value.join("");
};
export const getDescribe = (describe: string | null) => {
  if (!describe) return;
  const newdescribe = [...describe];
  if (newdescribe.length > 15) newdescribe.length = 15;
  return newdescribe.join("");
};
export const getDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};

export const Callorder = ({ order }: CallorderProps) => {
  return (
    <tr data-testid={"orderRow"}>
      <td>{getDate(order.createdAt)}</td>
      <td>{order.name}</td>
      <td>{getPhone(order.phone)}</td>
      <td>{order.email}</td>
      <td>{getDescribe(order.describe)}</td>
    </tr>
  );
};
