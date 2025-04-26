import {
  Box,
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

  const showChatList = path === "/" || path.includes("chat");
  return (
    <Box sx={{ maxHeight: "100vh"}}>
      <ApolloProvider client={client}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Header />
          <Guard>
            {showChatList ? (
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
    </Box>
  );
};

export default App;

const Routes = () => {
  return (
    <Container sx={{ height: "100%" }}>
      <RouterProvider router={router} />
    </Container>
  );
};
