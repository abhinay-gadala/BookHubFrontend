import { useState, useContext, createContext, useEffect } from "react";

const DarkMode = createContext();

export const useDarkContext = () => useContext(DarkMode);

export const DarkContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // check localStorage first (default false if nothing saved)
    return localStorage.getItem("darkMode") === "true";
  });

  function toggleDarkMode() {
    setDarkMode((prev) => {
      const newValue = !prev;
      localStorage.setItem("darkMode", newValue); // save in localStorage
      return newValue;
    });
  }

  // sync with <html> tag
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <DarkMode.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkMode.Provider>
  );
};
