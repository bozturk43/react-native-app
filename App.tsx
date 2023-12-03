import React from 'react';
import { ThemeProvider } from './src/context/ThemeContext'; // Buradaki yolunuza göre düzenleyin
import { AuthProvider } from './src/context/AuthContext'; // Buradaki yolunuza göre düzenleyin
import MainNavigation from './src/MainNav';

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MainNavigation/>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
