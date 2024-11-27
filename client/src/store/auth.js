import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

  const initialToken = localStorage.getItem("usersdatatoken");

  const [authToken, setAuthToken] = useState(initialToken);

  useEffect(() => {
    if (authToken) {
      localStorage.setItem("usersdatatoken", authToken);
    } else {
      localStorage.removeItem("usersdatatoken");
    }
  }, [authToken]);

  const login = (token) => {
    setAuthToken(token);
  };

 

  return (
    <AuthContext.Provider value={{ authToken, login}}>
      {children}
    </AuthContext.Provider>
  );
};
