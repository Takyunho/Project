import React from 'react';
import styles from './TodoHeader.module.css';
import { IoMoon, IoSunny } from "react-icons/io5";
import { useDarkMode } from '../context/DarkModeContext';

export default function TodoHeader({ filters, filter, onFilterChange }) {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <header className={styles.container}>
      {/* 다크모드 버튼 */}
      <button className={styles.mode_btn} onClick={toggleDarkMode}>
        {/* darkmode가 아니라면 */}
        {!darkMode && <IoMoon></IoMoon>}
        {darkMode && <IoSunny></IoSunny>}
      </button>
      {/* 전체보기 / 할 일 / 완료 */}
      <ul className={styles.list_wrap}>
        {filters.map((value, index) => (
          <li key={index}>
            <button
              className={styles.filter_btn}
              onClick={() => onFilterChange(value)}
            >
              {value}
            </button>
          </li>
        ))}
      </ul>
    </header>
  );
}

