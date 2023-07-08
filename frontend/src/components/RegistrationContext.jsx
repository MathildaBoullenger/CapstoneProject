import React, { createContext, useState } from "react";

export const RegistrationContext = createContext();

export const RegistrationProvider = ({ children }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
  
    const handleUsernameChange = (event) => {
      setUsername(event.target.value);
    };
  
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handleConfirmPasswordChange = (event) => {
      setConfirmPassword(event.target.value);
    };

    return (
        <RegistrationContext.Provider  
        value={{
            username,
            email,
            password,
            confirmPassword,
            handleUsernameChange,
            handleEmailChange,
            handlePasswordChange,
            handleConfirmPasswordChange,
          }}
        >
        {children}
        </RegistrationContext.Provider>
    )

}