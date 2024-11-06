// Class responsible for handling authentication-related API calls, such as login and signup
export class Auth {
  // Property to store an instance of ApiHandler for making API requests
  apiHandler;

  /**
   * Constructor to initialize Auth with an ApiHandler instance.
   * @param {ApiHandler} apiHandler - An instance of ApiHandler to be used for API requests.
   */
  constructor(apiHandler) {
    this.apiHandler = apiHandler; // Assign the provided ApiHandler instance to the class property
  }

  /**
   * Sends a login request to the authentication endpoint.
   * @param {Object} body - The request body containing login credentials (e.g., username and password).
   * @returns {Promise} - Resolves with the response from the server for the login request.
   */
  async login(body) {
    return await this.apiHandler.post("/auth/signin", body); // Use ApiHandler to send POST request to login endpoint
  }

  /**
   * Sends a signup request to the authentication endpoint.
   * @param {Object} body - The request body containing signup details (e.g., username, password, email).
   * @returns {Promise} - Resolves with the response from the server for the signup request.
   */
  async signUp(body) {
    return await this.apiHandler.post("/auth/signup", body); // Use ApiHandler to send POST request to signup endpoint
  }

  async getUserDetails(id) {
    return await this.apiHandler.get(`/users/${id}`);
  }
}
