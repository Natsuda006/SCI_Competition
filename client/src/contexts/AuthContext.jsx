import { useState, useContext, createContext, useEffect } from "react";
import AuthServices from "../services/auth.service";
import TokenService from "../services/token.service";

const AuthContext = createContext(null);

// ฟังก์ชันดึง user จาก localStorage
function getUser() {
  return TokenService.getUser();
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUser());

const login = async (email, password) => {
  const userData = await AuthServices.login(email, password);
  // เก็บ token ใน localStorage
  localStorage.setItem("accessToken", userData.accessToken);
  // เก็บ user ไว้ใน context state
  setUser(userData.user);
  return userData;
};


  // ฟังก์ชัน logout
  const logout = () => {
    AuthServices.logout();
    setUser(null);
  };

  // sync user state กับ localStorage
  useEffect(() => {
    if (user) {
      TokenService.setUser(user);
    } else {
      TokenService.removeUser();
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// hook สำหรับเรียกใช้ context
export const useAuthContext = () => useContext(AuthContext);