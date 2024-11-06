import { apiClient } from "./apiClient";
import { getItemFromStorage } from "./utils";

// Class responsible for handling API requests (GET and POST) with a configurable base URL
class ApiHandler {
  // Property to store the base URL for all API requests
  baseUrl;
  // Property to store the token for all API requests
  token;

  /**
   * Configures the API handler by setting the base URL.
   * @param {Object} config - Configuration object containing baseUrl.
   */
  config(config) {
    this.baseUrl = config?.baseUrl; // Set baseUrl if provided in config
    this.token = getItemFromStorage("token");
  }

  /**
   * Sends a POST request to the specified endpoint.
   * @param {string} url - The endpoint URL to send the POST request to (appended to baseUrl).
   * @param {Object} payload - The request body data to be sent in JSON format.
   * @returns {Promise<Response>} - Resolves with the response object from the server, rejects with an error message if the request fails.
   */
  post(url, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        // Make a POST request with JSON headers and stringified request body
        const response = await apiClient(`${this.baseUrl}${url}`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
          body: JSON.stringify(payload),
        });
        resolve(response); // Resolve with the server response if successful
      } catch (error) {
        reject(`Network or server error: ${error.message}`); // Reject with error message in case of failure
      }
    });
  }

  /**
   * Sends a GET request to the specified endpoint.
   * @param {string} url - The endpoint URL to send the GET request to (appended to baseUrl).
   * @returns {Promise<Response>} - Resolves with the response object from the server, rejects with an error message if the request fails.
   */
  get(url) {
    return new Promise(async (resolve, reject) => {
      try {
        // Make a GET request with JSON headers
        const response = await apiClient(`${this.baseUrl}${url}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        });
        resolve(response); // Resolve with the server response if successful
      } catch (error) {
        reject(`Network or server error: ${error.message}`); // Reject with error message in case of failure
      }
    });
  }

  delete(url) {
    return new Promise(async (resolve, reject) => {
      try {
        // Make a DELETE request with JSON headers
        const response = await apiClient(`${this.baseUrl}${url}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        });
        resolve(response); // Resolve with the server response if successful
      } catch (error) {
        reject(`Network or server error: ${error.message}`); // Reject with error message in case of failure
      }
    });
  }

  put(url, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        // Make a PUT request with JSON headers
        const response = await apiClient(`${this.baseUrl}${url}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
          body: JSON.stringify(payload),
        });
        resolve(response); // Resolve with the server response if successful
      } catch (error) {
        reject(`Network or server error: ${error.message}`); // Reject with error message in case of failure
      }
    });
  }
}

// Export a single instance of the ApiHandler class for use throughout the app
export const apiHandler = new ApiHandler();
