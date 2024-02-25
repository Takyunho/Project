import { createContext, useContext, useEffect, useState } from "react";


const DarkModeContext = createContext()

export function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)  // dark mode의 상태를 바꾸기
    updateDarkMode(!darkMode) // dark mode의 스타일을 변경하기
  }

  useEffect(() => {
    //- 처음 mount될 때, 로컬 스토리지와 사용자의 브라우저 설정을 확인하여 다크모드인지 판단
    const isDark = localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    setDarkMode(isDark)
    updateDarkMode(isDark)
  }, [])

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
    localStorage.theme = 'dark'
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light'
  }
}


export const useDarkMode = () => useContext(DarkModeContext);