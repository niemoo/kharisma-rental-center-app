'use client';

import React, { createContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';

// Define the context type
type LoginContextType = {
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
};

// Provide a default value for the context
const defaultValue: LoginContextType = {
  isLogin: false,
  setIsLogin: () => {},
};

// Create the context with the default value
const LoginContext = createContext<LoginContextType>(defaultValue);

// Define the props type for the provider component
interface LoginContextProviderProps {
  children: ReactNode;
}

// Create the context provider component
const LoginContextProvider: React.FC<LoginContextProviderProps> = ({ children }) => {
  // const [isLogin, setIsLogin] = useState<boolean>(false);

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const storedValue = localStorage.getItem('isLogin');
  //     const parsedValue = storedValue !== null ? JSON.parse(storedValue) : false;
  //     setIsLogin(parsedValue);
  //   }
  // }, []);

  const storedValue = localStorage.getItem('isLogin');
  const parsedValue = storedValue !== null ? JSON.parse(storedValue) : false;
  const [isLogin, setIsLogin] = useState<boolean>(parsedValue);

  return <LoginContext.Provider value={{ isLogin, setIsLogin }}>{children}</LoginContext.Provider>;
};

export { LoginContext };
export default LoginContextProvider;
