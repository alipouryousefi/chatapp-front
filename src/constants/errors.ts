import { SnackMessage } from "../components/interfaces/snack-message.interface";

const UNKNOWN_ERROR_MESSAGE =
  "An Unknown error has occurred. Please try again later.";

const UNKNOWN_ERROR_SNACK_MESSAGE: SnackMessage = {
  message: UNKNOWN_ERROR_MESSAGE,
  type: "error",
};

export { UNKNOWN_ERROR_MESSAGE, UNKNOWN_ERROR_SNACK_MESSAGE };
