import React from 'react';
import styles from './TodoHeader.module.css';
import { IoSunny } from "react-icons/io5";

export default function TodoHeader() {
  return (
    <div className={styles.container}>
      {/* 다크모드 버튼 */}
      <button className={styles.mode_btn}>
        <span>
          <IoSunny></IoSunny>
        </span>
      </button>
      {/* 전체보기 / 할 일 / 완료 */}
    </div>
  );
}

