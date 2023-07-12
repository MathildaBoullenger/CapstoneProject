import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [user_id, setUser_id] = useState('');

  useEffect(() => {
    // Load user credentials from session storage on component mount
    const storedUsername = sessionStorage.getItem('username');
    const storedUserId = sessionStorage.getItem('user_id');
    if (storedUsername && storedUserId) {
      setUsername(storedUsername);
      setUser_id(storedUserId);
    }
  }, []);

  const setUserCredentials = (username, user_id) => {
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('user_id', user_id);
    setUsername(username);
    setUser_id(user_id);
  };

  const clearUserCredentials = () => {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('user_id');
    setUsername('');
    setUser_id('');
  };

  const userContextValue = {
    username,
    user_id,
    setUserCredentials,
    clearUserCredentials,
  };

  return <UserContext.Provider value={userContextValue}>{children}</UserContext.Provider>;
};
