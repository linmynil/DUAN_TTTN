/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState, createContext } from 'react';
import AxiosInstance from '../../axiosClient/AxiosInstance';

interface User {
  // Định nghĩa các thuộc tính của đối tượng User
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
}

interface LecturesContextProps {
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, phoneNumber: string, name: string) => Promise<boolean>;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  addNew_reports: (room: string, category: string, description: string) => Promise<boolean>;
  getAllReport:() => Promise<boolean>;
}

export const LecturesContext = createContext<LecturesContextProps>({} as LecturesContextProps);

export const LectureProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggerIn] = useState(false);
  const [user, setUser] = useState<User>({ email: '', password: '', name: '', phoneNumber: '' });

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const body = {
        email: email,
        password: password,
      };
      console.log(">>>", body);
      
      const res = await AxiosInstance().post('/users/login', body);
      setUser(res.data.user);
      setIsLoggerIn(true);
      return true;
    } catch (error) {
      console.log('Login error', error);
    }
    return false;
  };

  const register = async (email: string, password: string, phone: string, name: string): Promise<boolean> => {
    console.log(email, password);
    try {
      const body = {
        email: email,
        password: password,
        phoneNumber: phone,
        name: name,
      };
      const res = await AxiosInstance().post('/users/register', body);
      console.log("Responsive: ", res);
      return true;
    } catch (error) {
      console.log('Register error', error);
    }
    return false;
  };

  const addNew_reports = async (room: string, description: string, category: string) => {
    try {
      const body = { room, description, category };
      await AxiosInstance().post('/report/add_report', body);
      return true;
    } catch (error) {
      console.log('addNews error', error);
    }
    return false;
  };
  const getAllReport = async () => {
    try {
      const res = await AxiosInstance().get('/report/getALL_reportsApp');
      return res.data;
    } catch (error) {
      console.log(error);

    }
    return [];
  };

  return (
    <LecturesContext.Provider value={{ isLoggedIn,  login, register, user, setUser, addNew_reports , getAllReport}}>
      {children}
    </LecturesContext.Provider>
  );
};