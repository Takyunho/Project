import { createContext, useContext, useState } from "react";


const DarkModeContext = createContext()

export function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)  // dark mode의 상태를 바꾸기
    updateDarkMode(!darkMode) // dark mode의 스타일을 변경하기
  }

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}

//@ html의 class를 변경하는 함수  
function updateDarkMode(darkMode) {
  if (darkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}


export const useDarkMode = () => useContext(DarkModeContext);