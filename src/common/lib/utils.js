export const saveToStorage = (key, value) => {
  if (window && window.sessionStorage) {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }
};

export const getItemFromStorage = (key) => {
  if (window && window.sessionStorage) {
    return JSON.parse(window.sessionStorage.getItem(key));
  }
};

export const removeItemFromStorage = (key) => {
  if (window && window.sessionStorage) {
    sessionStorage.removeItem(key);
  }
};

/**
 * This method splits the originalUrl with the '?' and returns the url without queryParam and query params.
 * @param {*} url
 * @returns {Array} urlString and noResponse flag
 */
export const getUrlFilters = (url) => {
  const [urlString, queryString] = url.split("?");
  if (queryString === "filter=noResponse") {
    return { urlString, noResponse: true };
  }
  return { urlString, noResponse: false };
};

/**
 * This method checks if session is expired or not, if the session is expired then it will redirect user to login page.
 * @param {*} error
 * @param {*} showNotification
 * @param {*} navigate
 * @param {*} logout
 */
export const checkForSessionErrors = (
  error,
  showNotification,
  navigate,
  logout
) => {
  if (error && error?.includes("401")) {
    showNotification("Session Expired! Please login again!", "error");
    logout();
    navigate("/login");
  }
};
