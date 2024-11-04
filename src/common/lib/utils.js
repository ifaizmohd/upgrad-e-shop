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
