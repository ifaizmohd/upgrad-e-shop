// Importing the apiHandler instance to manage API requests with a consistent base URL configuration
import { apiHandler } from "../lib/apiHandler";
// Importing the Auth and Product classes which handle specific API functionalities for authentication and products
import { Auth } from "./Auth";
import { Product } from "./Products";

// Define the base URL for API requests
const baseUrl = "http://localhost:8080/api";

// Configure apiHandler to use the defined base URL for all requests
apiHandler.config({ baseUrl });

// Creating an instance of Auth for handling authentication API calls,
// passing in apiHandler to ensure requests use the configured base URL
export const Authentication = new Auth(apiHandler);

// Creating an instance of Product for handling product-related API calls,
// also passing in apiHandler for consistency across API calls
export const ProductsApi = new Product(apiHandler);
