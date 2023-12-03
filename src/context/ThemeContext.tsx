import React, { createContext, useContext, useState } from 'react';
import { extendTheme, NativeBaseProvider } from "native-base";
import Theme from '../types/ThemeTypes';
const newColorTheme = {
brand: {
  900: "#2f974d",
  800: "#2b8f4b",
  700: "#349b57",
},
primary: {
  50: "#c1f7d1",
  100: "#a6f2c6",
  200: "#81ebbd",
  300: "#5bd0ae",
  400: "#3dcdae",
  500: "#26c1aa",
  600: "#1eafaa",
  700: "#1696a5",
  800: "#0f7da0",
  900: "#105b8b",
},
};
const theme = extendTheme({ colors: newColorTheme });

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NativeBaseProvider theme={theme}>
      {children}
    </NativeBaseProvider>
  );
};