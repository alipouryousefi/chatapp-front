import {
  Container,
  createTheme,
  CssBaseline,
  Grid,
  ThemeProvider,
} from "@mui/material";
import { RouterProvider } from "react-router-dom";
import router from "./components/Routes";
import { ApolloProvider } from "@apollo/client";
import client from "./constants/apollo-client";
import Guard from "./components/auth/Guard";
import Header from "./components/Header";
import Snackbar from "./components/Snackbar";
import ChatList from "./components/ChatList";
import { usePath } from "./hooks/usePath";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  const { path } = usePath();
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        <Guard>
          {path === "/" ? (
            <Grid container>
              <Grid size={{ md: 3 }}>
                <ChatList />
              </Grid>
              <Grid size={{ md: 9 }}>
                <Routes />
              </Grid>
            </Grid>
          ) : (
            <Routes />
          )}
        </Guard>
        <Snackbar />
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;

const Routes = () => {
  return (
    <Container>
      <RouterProvider router={router} />
    </Container>
  );
};
