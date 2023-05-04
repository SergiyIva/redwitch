import React, { FC, ReactNode } from "react";
import { ErrorScreen } from "../ErrorScreen/ErrorScreen";
export interface IError {
  error: Error;
}
interface IProps {
  // fallback?: (error: Error)=>ReactElement;
  fallback?: FC<IError>;
}
interface IState {
  error?: Error | null;
  //info: ErrorInfo | null;
}
export default class ErrorBoundary extends React.Component<IProps, IState> {
  state = {
    error: null
    // info: null
  };

  static getDerivedStateFromError(
    error: Error
    // info: ErrorInfo
  ): IState {
    return {
      error
      //info
    };
  }

  render(): ReactNode {
    const { error } = this.state;
    const { children, fallback } = this.props;

    const FallbackComponent = fallback || ErrorScreen;

    if (error) return <FallbackComponent error={error} />;
    return children;
  }
}
