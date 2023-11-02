// PrivateRoute.js
import React, { useEffect, useState } from "react";
import { Navigate, Route, Outlet } from "react-router-dom";
import axios from "axios";

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const authToken = sessionStorage.getItem("authToken");
  console.log("auth token private route", authToken);

  useEffect(() => {
    const verifyToken = async () => {
      if (authToken) {
        try {
          // Send the token to the backend for verification
          const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/verify-token`,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );

          if (response.data.valid) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    verifyToken();
  }, [authToken]);

  if (!isAuthenticated) {
    return <Navigate to="/hobbies" ></Navigate>
    
  }

  return <Outlet /> ;
};

export default PrivateRoute;
