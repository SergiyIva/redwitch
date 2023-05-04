import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createUploadLink } from "apollo-upload-client";
import { ApolloClient, ApolloLink, ApolloProvider } from "@apollo/client";
import { cache } from "./GraphQL/Cache";
import { typeDefs } from "./GraphQL/typeDefs";
import Consumer from "./Consumer/Consumer";
import Administrator from "./Administrator";
import { useEffect } from "react";
//import { v4 } from "uuid/wrapper.mjs";
import { generate as v4 } from "./functions/generateID";
import { IS_LOGGED_IN } from "./GraphQL/Query";
import { lightTheme } from "./Styles/theme";
import { ThemeProvider } from "styled-components";

const uri = process.env.REACT_APP_URI + "/api";
const httpLink = createUploadLink({ uri });

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext((context: any) => ({
    headers: {
      ...context.headers,
      clientId: localStorage.getItem("clientId") || "",
      authorization:
        localStorage.getItem("token") || sessionStorage.getItem("token") || ""
    }
  }));
  return forward(operation);
});
//@ts-ignore
const httpAuthLink = authLink.concat(httpLink);

const client = new ApolloClient({
  link: httpAuthLink,
  cache,
  typeDefs,
  connectToDevTools: true
});

client.cache.writeQuery({
  query: IS_LOGGED_IN,
  data: {
    isLoggedIn:
      !!localStorage.getItem("token") || !!sessionStorage.getItem("token")
  }
});

export default function App() {
  useEffect(() => {
    const clientId = localStorage.getItem("clientId");
    if (!clientId) {
      const id = v4();
      localStorage.setItem("clientId", id);
    }
  }, []);
  useEffect(() => console.log("App rend"));
  return (
    <Router>
      <ThemeProvider theme={lightTheme}>
        <ApolloProvider client={client}>
          <Routes>
            <Route path={"admin/*"} element={<Administrator />} />
            <Route path={"/*"} element={<Consumer />} />
          </Routes>
        </ApolloProvider>
      </ThemeProvider>
    </Router>
  );
}
