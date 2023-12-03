import React, { createContext, useContext, useState } from 'react';
import { loginFromService } from '../services/user-service';

// Kullanıcı bilgilerini içeren tip
type User = {
  username: string;
  email: string;
  token:string;
  // Diğer kullanıcı bilgileri...
};

// AuthContext tipini oluştur
type AuthContextType = {
  user: User | null;
  login: (userData:LoginDataType) => void;
  logout: () => void;
  loggedIn:boolean;
};

// Context oluştur
const AuthContext = createContext<AuthContextType | undefined>({
  user:null,
  login: (userData:LoginDataType) => {},  
  logout:() => {},
  loggedIn:false,
});

// AuthProvider bileşeni
export const AuthProvider = ({ children }:{children:React.ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loggedIn,setLoggedIn]= useState<boolean>(false);

  // Login metodu
  const login = async (userData:LoginDataType) => {
    console.log("USER DATA IN CONTEXT",userData);
    const response = await loginFromService(userData);
    if(response.status === 200){
      console.log("Response",response.data);
      setUser({
        username:"Burak",
        email:"abc.com",
        token:response.data.token
      });
      setLoggedIn(true);
      console.log("user",user);
    }
    else{
      throw new Error("Error from Auth");
    }
  };

  // Logout metodu
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout,loggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// AuthContext'i kullanmak için bir hook oluştur
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth hook must be used within an AuthProvider');
  }
  return context;
};
