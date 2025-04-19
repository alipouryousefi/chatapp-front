import { makeVar } from "@apollo/client";
import { SnackMessage } from "../components/interfaces/snack-message.interface";

export  const snackVar = makeVar<SnackMessage|undefined>(undefined)