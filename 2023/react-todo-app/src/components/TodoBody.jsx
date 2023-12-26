import React, { useState } from "react";
import styles from "./TodoBody.module.css";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function TodoBody({ todoList, onDelete, onUpdate }) {

  const handleChange = (event, item) => {
    const status = event.target.checked ? "completed" : "active";
    // onUpdate({ ...todoList, status: status })
    
    // 업데이트 할 때, 기존의 item에서 status만 변경한 객체를 만들어서 넘겨준다.
    const updateTodo = {
      ...item,
      status: status,
    }
    onUpdate(updateTodo);
  }

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
                  id="todo"
                  checked={item.status === "completed"}
                  onChange={(event) => handleChange(event, item)}
                />
                <label htmlFor="todo" className={styles.li_content}>
                  {item.content}
                </label>
              </div>
              <div className={styles.li_Box2}>
                <button
                  className={styles.li_deleteBtn}
                  onClick={() => onDelete(item)}
                >
                  <RiDeleteBin6Line />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
