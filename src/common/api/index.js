// Importing the apiHandler instance to manage API requests with a consistent base URL configuration
import { apiHandler } from "../lib/apiHandler";
import { Address } from "./Address";
// Importing the Auth and Product classes which handle specific API functionalities for authentication and products
import { Auth } from "./Auth";
import { Order } from "./Order";
import { Product } from "./Products";

// Define the base URL for API requests
const baseUrl = "https://dev-project-ecommerce.upgrad.dev/api";

// Configure apiHandler to use the defined base URL for all requests
apiHandler.config({ baseUrl });

// Creating an instance of Auth for handling authentication API calls,
// passing in apiHandler to ensure requests use the configured base URL
export const Authentication = new Auth(apiHandler);

// Creating an instance of Product for handling product-related API calls,
// also passing in apiHandler for consistency across API calls
export const ProductsApi = new Product(apiHandler);

// Creating an instance of Address for handling address-related API calls,
// also passing in apiHandler for consistency across API calls
export const AddressApi = new Address(apiHandler);

// Creating an instance of orderApi for handling order-related API calls,
// also passing in apiHandler for consistency across API calls
export const OrderApi = new Order(apiHandler);
