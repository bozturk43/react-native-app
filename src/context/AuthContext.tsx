import React, { createContext, useContext, useEffect, useState } from 'react';
import { loginFromService ,getUser} from '../services/user-service';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Kullanıcı bilgilerini içeren tip
export type User = {
  username: string;
  img_url:string;
  email: string;
  token:string;
};

// AuthContext tipini oluştur
type AuthContextType = {
  user: User | null;
  login: (userData:any) => void;
  logout: () => void;
  updateUser:(updatedUser:User)=>void;
  loggedIn:boolean;
};

// Context oluştur
const AuthContext = createContext<AuthContextType | undefined>({
  user:null,
  login: (userData:any) => {},  
  logout:() => {},
  updateUser:(updatedUser:User)=>{},
  loggedIn:false,
  
});

// AuthProvider bileşeni
export const AuthProvider = ({ children }:{children:React.ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loggedIn,setLoggedIn]= useState<boolean>(false);

  const updateUser = (updatedUser:User) => {
    setUser(prevUser => ({
      ...prevUser,
      ...updatedUser,
    }));
  };


  // Login metodu
  const login = async (userData:any) => {
    const response = await loginFromService(userData);

    if(response.status === 200){
      await AsyncStorage.setItem("user",JSON.stringify({
        username:response.data.user.name,
        img_url : response.data.user.img_url,
        email:response.data.user.email,
        token:response.data.token
      }));
      const userObject =await AsyncStorage.getItem("user");
      const storagedUser: User = userObject && JSON.parse(userObject);
      setUser(storagedUser)
      setLoggedIn(true);
    }
    else{
      throw new Error("Error from Auth");
    }
  };

  // Logout metodu
  const logout = async () => {
    // AsyncStorage'dan kullanıcı bilgisini kaldır
    await AsyncStorage.removeItem("user");
    setUser(null); // Kullanıcı state'ini sıfırla
    setLoggedIn(false); // Giriş durumunu güncelle
  };

  useEffect(() => {
    const fetchUser = async () => {
        const fetchedUser = await AsyncStorage.getItem("user"); // getUser fonksiyonunu await ile çağırın
        console.log("FetchedUser",fetchedUser);
        fetchedUser && setUser(JSON.parse(fetchedUser)); // user state'ini güncelleyin
    };

    fetchUser(); // useEffect içinde getUser fonksiyonunu çağırın
}, []);

  return (
    <AuthContext.Provider value={{ user, login, logout,loggedIn,updateUser }}>
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
