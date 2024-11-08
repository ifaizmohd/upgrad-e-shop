import { createContext, useCallback, useContext } from "react";

const Store = {};

const StoreContext = createContext({
  setValue: () => {},
  getValue: () => {},
});

export const useStore = () => useContext(StoreContext);

const StoreProvider = ({ children }) => {
  const setValue = useCallback((key, value) => {
    Store[key] = value;
  }, []);

  const getValue = useCallback((key) => {
    if (Store) {
      return Store[key];
    }
    return null;
  }, []);

  return (
    <StoreContext.Provider value={{ setValue, getValue }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
