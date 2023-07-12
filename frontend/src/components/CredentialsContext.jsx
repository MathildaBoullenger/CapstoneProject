import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Load user credentials from session storage on component mount
    const storedUsername = sessionStorage.getItem('username');
    const storedPassword = sessionStorage.getItem('password');
    if (storedUsername && storedPassword) {
      setUsername(storedUsername);
      setPassword(storedPassword);
    }
  }, []);

  const setUserCredentials = (username, password) => {
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('password', password);
    setUsername(username);
    setPassword(password);
  };

  const clearUserCredentials = () => {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');
    setUsername('');
    setPassword('');
  };

  const userContextValue = {
    username,
    password,
    setUserCredentials,
    clearUserCredentials,
  };

  return <UserContext.Provider value={userContextValue}>{children}</UserContext.Provider>;
};
