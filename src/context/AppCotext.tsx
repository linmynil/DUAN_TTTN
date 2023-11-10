import React, { createContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

interface AppContextType {
  isLogin: boolean;
  setisLogin: Dispatch<SetStateAction<boolean>>;
  isLogout: boolean;
  setisLogout: Dispatch<SetStateAction<boolean>>;
  infoUser: Record<string, any>;
  setinfoUser: Dispatch<SetStateAction<Record<string, any>>>;
  infoReport: Record<string, any>;
  setinfoReport: Dispatch<SetStateAction<Record<string, any>>>;
  isUpdate: boolean;
  setisUpdate: Dispatch<SetStateAction<boolean>>;
  isReload: boolean;
  setisReload: Dispatch<SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Data sử dụng chung
  const [isLogin, setisLogin] = useState<boolean>(false);
  const [isLogout, setisLogout] = useState<boolean>(false);
  const [infoUser, setinfoUser] = useState<Record<string, any>>({});
  const [infoReport, setinfoReport] = useState<Record<string, any>>({});
  const [isUpdate, setisUpdate] = useState<boolean>(false);
  const [isReload, setisReload] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        isLogin,
        setisLogin,
        isLogout,
        setisLogout,
        infoUser,
        setinfoUser,
        infoReport,
        setinfoReport,
        isUpdate,
        setisUpdate,
        isReload,
        setisReload,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};