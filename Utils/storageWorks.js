export const setToLocalStorage = (key, data) => {
  window.localStorage.setItem(key, JSON.stringify(data));
};

export const removeLocalStorage = (key) => {
  window.localStorage.removeItem(key);
};

export const getFromLocalStorage = (key) => window.localStorage.getItem(key)
 && JSON.parse(window.localStorage.getItem(key));
