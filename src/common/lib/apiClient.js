import { getUrlFilters } from "./utils";

export async function apiClient(
  url,
  options = {},
  errorMessage = "An error occurred in API Client"
) {
  try {
    // Few APIs are returning some encoded strings which are breaking the response.json() code. to bypass the parsing,
    // we have added an optional queryParam in the url i.e, ?filter=noResponse; if this query param is present, we are
    // skipping the parsing step.
    const { urlString, noResponse } = getUrlFilters(url);
    const response = await fetch(urlString, options);
    if (noResponse) {
      return { data: 200, error: null };
    }
    // Check if the response status is OK (status code 2xx)
    if (!response.ok) {
      throw new Error(`Error: ${response?.status} ${response?.statusText}`);
    }
    // Parse the JSON response
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error(errorMessage, error);
    return { data: null, error: error.message || errorMessage };
  }
}
