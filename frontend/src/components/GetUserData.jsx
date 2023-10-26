import React, { useEffect, useState } from "react";
import axios from "axios";

const GetUserData = (property) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/get-user-data`
        );
        const userDataArray = response.data;

        // Convert the array to an object using a specific property (e.g., "id") as the key
        const userDataObject = userDataArray.reduce((acc, item) => {
          acc[item.id] = item;
          return acc;
        }, {});

        console.log("userData from GetUserData component", userDataObject);

        // Assuming user data is an object with properties like "user_id", "username", etc.
        setUserData(userDataObject[property]);
      } catch (error) {
        console.error(`Error fetching user data for ${property}:`, error);
      }
    };

    fetchData();
  }, [property]);

  return userData;
};

export default GetUserData;
