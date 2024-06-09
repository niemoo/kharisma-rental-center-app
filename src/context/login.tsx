import React, { createContext, useState, ReactNode } from 'react';

interface IsLoginContextType {
  isLogin: { [key: string]: any };
  setIsLogin: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
}

const IsLoginContext = createContext<IsLoginContextType | null>(null);

interface IsLoginContextProviderProps {
  children: ReactNode;
}

const IsLoginContextProvider = ({ children }: IsLoginContextProviderProps) => {
  const [isLogin, setIsLogin] = useState<{ [key: string]: any }>({});

  return <IsLoginContext.Provider value={{ isLogin, setIsLogin }}>{children}</IsLoginContext.Provider>;
};

export { IsLoginContext, IsLoginContextProvider };
export default IsLoginContextProvider;

// const IsLoginContext = createContext();

// const IsLoginContextProvider = ({ children }) => {
//   const [isLogin, setIsLogin] = useState({});

//   return <IsLoginContext.Provider value={{ isLogin, setIsLogin }}>{children}</IsLoginContext.Provider>;
// };

// // Export the context and the provider
// export { IsLoginContext };
// export default IsLoginContextProvider;
