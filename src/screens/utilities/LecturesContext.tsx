/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState, createContext } from 'react';
import AxiosInstance from '../../axiosClient/AxiosInstance';

// Tạo interface cho context
interface User {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
}

interface LecturesContextProps {
  isLoggedIn: boolean;
  login: (email: string, password: string) => void
  // Các phương thức khác
  user: User;
}


export const LecturesContext = createContext<LecturesContextProps>({} as LecturesContextProps);

export const LectureProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User>({ email: '', password: '', name: '', phoneNumber: '' });


  const login = async (email: string, password: string) => {
    try {
      // Gọi API để xác thực người dùng
      const response = await AxiosInstance().post('/users/login', { email, password });
      // Nếu xác thực thành công, cập nhật trạng thái
      if (response.data.success) {
        setIsLoggedIn(true);
        setUser(response.data.user);
        return true; // Trả về true nếu đăng nhập thành công
      } else {
        return false; // Trả về false nếu đăng nhập thất bại
      }
    } catch (error) {
      console.log(error);
      return false; //
    }
  };

  return (
    <LecturesContext.Provider value={{ isLoggedIn, login, user }}>
      {children}
    </LecturesContext.Provider>
  );
};