import React, { createContext, useContext, useState } from 'react';
import { extendTheme, NativeBaseProvider } from "native-base";
import Theme from '../types/ThemeTypes';
const fonts = {
  body: require('../assests/fonts/NunitoSansRegular.ttf'),
  heading: require('../assests/fonts/NunitoSansBold.ttf'),
  body_italic:require('../assests/fonts/NunitoSansItalic.ttf')
};
const newColorTheme = {
brand: {
  900: "#ffbe98",
  800: "#ff904f",
  700: "#d44e00",
},
primary: {
  50: "#FFA9D6",
  100: "#AB9113",
  200: "#C89403",
  300: "#FAE484",
  400: "#FFB098",
  500: "#F9DE8D",
  600: "#98a5ff",
  700: "#98fff1",
  800: "#0f7da0",
  900: "#105b8b",
},
};
const newFontTheme = {
  fontFamily: {
    body: fonts.body, // Varsayılan olarak kullanılacak font
    heading: fonts.heading, // Başlık için kullanılacak font
    body_italic:fonts.body_italic
    // Diğer font türleri burada
  },
};
const theme = extendTheme({ colors: newColorTheme,fonts:newFontTheme });
const ThemeContext = createContext(theme);
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NativeBaseProvider theme={theme}>
      {children}
    </NativeBaseProvider>
  );
};
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme hook must be used within an Provider');
  }
  return context;
};