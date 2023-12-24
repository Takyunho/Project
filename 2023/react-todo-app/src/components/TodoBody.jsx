import React, { useState } from "react";
import styles from "./TodoBody.module.css";

export default function TodoBody({ todoList, handleDelete }) {
  
  

  return (
    <div>
      {/* 체크박스 + list + 삭제버튼 */}
      <ul className={styles.ul}>
        {todoList.map((item) => {
          return (
            <li key={item.id} className={styles.li}>
              <div className={styles.li_Box1}>
                <input
                  className={styles.li_checkbox}
                  type="checkbox"
                  name="todo"
                />
                <label htmlFor="todo" className={styles.li_content}>
                  {item.content}
                </label>
              </div>
              <div className={styles.li_Box2}>
                <button
                  className={styles.li_deleteBtn}
                  onClick={handleDelete}
                >
                  삭제
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
