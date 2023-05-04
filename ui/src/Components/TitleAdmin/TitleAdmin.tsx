import { PropsWithChildren } from "react";

export const TitleAdmin = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div className="pt-3 pb-2 mb-3 border-bottom">
      <h2 className="h2">{children}</h2>
    </div>
  );
};
