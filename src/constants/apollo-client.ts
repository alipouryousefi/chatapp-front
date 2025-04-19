import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { API_URL } from "./url";
import { onError } from "@apollo/client/link/error";
import excludedRoutes from "./excluded-routes";
import { onLogout } from "../utils/logout";

const logoutLink = onError((error) => {
  if (
    error.graphQLErrors?.length &&
    //@ts-ignore
    (error.graphQLErrors[0].extensions.originalError as any).statusCode === 401
  ) {
    if (!excludedRoutes.includes(window.location.pathname)) {
      onLogout();
    }
  }
});

const httpLink = new HttpLink({
  uri: `${API_URL}/graphql`,
  credentials: "include",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: logoutLink.concat(httpLink),
});

export default client;
