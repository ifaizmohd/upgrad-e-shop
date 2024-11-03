import { apiHandler } from "../lib/apiHandler";
import { Auth } from "./Auth";
import { Product } from "./Products";

const baseUrl = "http://localhost:8080/api";
apiHandler.config({ baseUrl });

export const Authentication = new Auth(apiHandler);

export const ProductsApi = new Product(apiHandler);
