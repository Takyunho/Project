import React, { useState } from "react";
import styles from "./TodoFooter.module.css";
//uuid
import { v4 as uuidv4 } from "uuid";

export default function TodoFooter({ onAdd }) {
  // 새로운 할 일(input 값)
  const [newTodo, setNewTodo] = useState("");

  // input에 입력된 값 다루는 함수
  const handleChange = (e) => setNewTodo(e.target.value)

  // todoList에 새로운 할 일 추가
  const addTodo = () => {
    // newTodo가 빈 문자열이면 추가하지 않음
    if (newTodo.trim() === "") {
      return;
    }

    const todo = {
      // uuid 라이브러리 사용하기
      id: uuidv4(),
      content: newTodo,
      status: "active",
    };

    onAdd(todo);  //* TodoBox.jsx의 handleAdd 함수 호출(인자로 todo 전달)
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
