import React, { createContext, useState } from 'react';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [bio, setBio] = useState('');

  const handleProfilePictureChange = (file) => {
    setProfilePicture(file);
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const resetForm = () => {
    setProfilePicture(null);
    setBio('');
  };

  return (
    <ProfileContext.Provider
      value={{
        profilePicture,
        bio,
        handleProfilePictureChange,
        handleBioChange,
        resetForm,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
