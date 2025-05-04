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
    <Box sx={{ maxHeight: "100vh" }}>
      <ApolloProvider client={client}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Header />
          <Guard>
            <Container maxWidth="xl" sx={{ marginTop: "1rem" }}>
              {showChatList ? (
                <Grid container spacing={5}>
                  <Grid size={{ xs: 12, md: 5, lg: 4, xl: 3 }}>
                    <ChatList />
                  </Grid>
                  <Grid size={{ xs: 12, md: 7, lg: 8, xl: 9 }}>
                    <Routes />
                  </Grid>
                </Grid>
              ) : (
                <Routes />
              )}
            </Container>
          </Guard>
          <Snackbar />
        </ThemeProvider>
      </ApolloProvider>
    </Box>
  );
};

export default App;

const Routes = () => {
  return <RouterProvider router={router} />;
};
