import { createContext, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  useEffect(() => {
    // Load user credentials from session storage on component mount
    const storedUsername = sessionStorage.getItem('username');
    const storedPassword = sessionStorage.getItem('password');
    if (storedUsername && storedPassword) {
      setUserCredentials(storedUsername, storedPassword);
    }
  }, []);

  const setUserCredentials = (username, password) => {
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('password', password);
  };

  const clearUserCredentials = () => {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');
  };

  const userContextValue = {
    username: sessionStorage.getItem('username'),
    password: sessionStorage.getItem('password'),
    setUserCredentials,
    clearUserCredentials,
  };

  return <UserContext.Provider value={userContextValue}>{children}</UserContext.Provider>;
};
