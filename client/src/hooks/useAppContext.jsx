import { useContext, createContext, useState, useEffect } from "react";

const AppContext = createContext({});

export const useAppContext = () => {
  return useContext(AppContext);
};

export default function AppContextProvider({ children }) {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  useEffect(() => {
    if (error === null) return;
    setTimeout(() => {
      setError(null);
    }, 5000);
  }, [error]);
  useEffect(() => {
    if (message === null) return;
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  }, [message]);
  let value = {
    error,
    setError,
    message,
    setMessage,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
