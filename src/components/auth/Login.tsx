import { Link } from "react-router-dom";
import { Link as MUILink } from "@mui/material";
import Auth from "./Auth";
import { useLogin } from "../../hooks/useLogin";

const Login = () => {
  const { error, login } = useLogin();

  return (
    <Auth
      submitLabel="Login"
      onSubmit={(request) => login(request)}
      error={error}
    >
      <Link to={"/signup"} style={{ alignSelf: "center" }}>
        <MUILink>Don't have an account? Sign up</MUILink>
      </Link>
    </Auth>
  );
};

export default Login;
