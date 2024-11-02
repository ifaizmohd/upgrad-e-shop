import { apiHandler } from "../lib/apiHandler";
import { Auth } from "./Auth";

const baseUrl = "http://localhost:8080";
apiHandler.config({ baseUrl });

export const Authentication = new Auth(apiHandler);
