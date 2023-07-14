import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [user_id, setUser_id] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [bio, setBio] = useState('');
  const [facebookAccount, setFacebookAccount] = useState('');

  useEffect(() => {
    // Load user credentials from session storage on component mount
    const storedUsername = sessionStorage.getItem('username');
    const storedUserId = sessionStorage.getItem('user_id');
    const storedProfilePicture = sessionStorage.getItem('profilePicture');
    const storedBio = sessionStorage.getItem('bio');
    const storedFacebookAccount = sessionStorage.getItem('facebookAccount');
    if (storedUsername && storedUserId) {
      setUsername(storedUsername);
      setUser_id(storedUserId);
      setProfilePicture(storedProfilePicture);
      setBio(storedBio);
      setFacebookAccount(storedFacebookAccount);
    }
  }, []);

  const setUserCredentials = (username, user_id) => {
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('user_id', user_id);
    setUsername(username);
    setUser_id(user_id);
  };

  const setProfileInformation = (profilePicture, bio, facebookAccount) => {
    sessionStorage.setItem('profilePicture', profilePicture);
    sessionStorage.setItem('bio', bio);
    sessionStorage.setItem('facebookAccount', facebookAccount);
    setProfilePicture(profilePicture);
    setBio(bio);
    setFacebookAccount(facebookAccount);
  };

  const clearUserCredentials = () => {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('user_id');
    sessionStorage.removeItem('profilePicture');
    sessionStorage.removeItem('bio');
    sessionStorage.removeItem('facebookAccount');
    setUsername('');
    setUser_id('');
    setProfilePicture(null);
    setBio('');
    setFacebookAccount('');
  };

  const userContextValue = {
    username,
    user_id,
    profilePicture,
    bio,
    facebookAccount,
    setUserCredentials,
    setProfileInformation,
    clearUserCredentials,
  };

  return <UserContext.Provider value={userContextValue}>{children}</UserContext.Provider>;
};
