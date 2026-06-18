"use client";
import { ThemeProvider } from "next-themes";

const HeroUiThemeProvider = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      {children}
    </ThemeProvider>
  );
};

export default HeroUiThemeProvider;
