"use client";
import axios from "axios";
import React, { useEffect } from "react";
import { Provider } from "react-redux";

interface AuthProps {
  children: React.ReactNode;
}

const AuthStore: React.FC<AuthProps> = ({ children }) => {
  useEffect(() => {
    const fetchUserData = async () => {
      const userDataLogin = localStorage.getItem("userDataLogin");

      if (userDataLogin) {
        const userData = JSON.parse(userDataLogin);
        const userId = userData.id;

        try {
          const response = await axios.get(
            `https://liquors-project.onrender.com/users/${userId}`
          );
          const newUserData = response.data;

          if (JSON.stringify(newUserData) !== JSON.stringify(userData)) {
            console.log("datos cambiados", newUserData);
            localStorage.setItem("userDataLogin", JSON.stringify(newUserData));
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [Provider]);

  return <div>{children}</div>;
};

export default AuthStore;
