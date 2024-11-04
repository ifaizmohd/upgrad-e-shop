// Class responsible for handling API requests (GET and POST) with a configurable base URL
class ApiHandler {
  // Property to store the base URL for all API requests
  baseUrl;

  /**
   * Configures the API handler by setting the base URL.
   * @param {Object} config - Configuration object containing baseUrl.
   */
  config(config) {
    this.baseUrl = config?.baseUrl; // Set baseUrl if provided in config
  }

  /**
   * Sends a POST request to the specified endpoint.
   * @param {string} url - The endpoint URL to send the POST request to (appended to baseUrl).
   * @param {Object} reqBody - The request body data to be sent in JSON format.
   * @returns {Promise} - Resolves with the response from the server, rejects with an error message if the request fails.
   */
  post(url, reqBody) {
    return new Promise(async (resolve, reject) => {
      try {
        // Make a POST request with JSON headers and stringified request body
        const response = await fetch(`${this.baseUrl}${url}`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBody),
        });
        resolve(response); // Resolve with the server response
      } catch (error) {
        reject(error?.message); // Reject with error message in case of failure
      }
    });
  }

  /**
   * Sends a GET request to the specified endpoint.
   * @param {string} url - The endpoint URL to send the GET request to (appended to baseUrl).
   * @returns {Promise} - Resolves with the response from the server, rejects with an error message if the request fails.
   */
  get(url) {
    return new Promise(async (resolve, reject) => {
      try {
        // Make a GET request with JSON headers
        const response = await fetch(`${this.baseUrl}${url}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        resolve(response); // Resolve with the server response
      } catch (error) {
        reject(error?.message); // Reject with error message in case of failure
      }
    });
  }
}

// Export a single instance of the ApiHandler class for use throughout the app
export const apiHandler = new ApiHandler();
