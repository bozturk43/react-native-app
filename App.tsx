import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './src/context/ThemeContext'; // Buradaki yolunuza göre düzenleyin
import { AuthProvider } from './src/context/AuthContext'; // Buradaki yolunuza göre düzenleyin
import MainNavigation from './src/MainNav';

const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <MainNavigation />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>

  );
};

export default App;
