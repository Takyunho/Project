import React, { useState } from "react";
import styles from "./TodoFooter.module.css";

export default function TodoFooter({ todoList, onAdd }) {
  // 새로운 할 일(input 값)
  const [newTodo, setNewTodo] = useState("");

  // input에 입력된 값 다루는 함수
  const handleChange = (e) => {
    // console.log(e.target.value);
    setNewTodo(e.target.value);
  };

  // todoList에 새로운 할 일 추가
  const addTodo = () => {
    // newTodo가 빈 문자열이면 추가하지 않음
    if (newTodo.trim() === "") {
      return;
    }

    const todo = {
      id: todoList.length + 1,
      content: newTodo,
      status: "disabled",
    };

    onAdd(todo);
    setNewTodo(""); // input 초기화
  };

  const handleKeyDown = (e) => {
    // console.log(e.key);
    // console.log(e.keyCode);
    if (e.key === "Enter") {
      if (e.nativeEvent.isComposing) return;  // 한글 입력시 이벤트가 두번 호출되는 현상 막기
      addTodo();
    }
  };

  return (
    <div>
      <div className={styles.footer_wrap}>
        <input
          type="text"
          placeholder="할일을 입력하세요"
          className={styles.input}
          value={newTodo}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        {/* addTodo */}
        <button className={styles.add_btn} onClick={addTodo}>
          Add
        </button>
      </div>
    </div>
  );
}
