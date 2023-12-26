import React, { useState } from "react";
import styles from "./TodoBox.module.css";
import TodoHeader from "./TodoHeader";
import TodoBody from "./TodoBody";
import TodoFooter from "./TodoFooter";

// 할 일 목록
const list = [
  {
    id: 1,
    content: "HTML공부",
    status: "active",
  },
  {
    id: 2,
    content: "CSS공부",
    status: "active",
  },
  {
    id: 3,
    content: "JS공부",
    status: "active",
  },
];

export default function TodoBox() {
  // 할 일 목록
  const [todoList, setTodoList] = useState(list);

  // 새로운 todo 추가
  const handleAdd = (todo) => setTodoList([...todoList, todo]);
  // 삭제버튼 클릭시 해당 아이템 삭제
  const handleDelete = (deleteTodo) => {
    setTodoList(todoList.filter((todo) => todo.id !== deleteTodo.id))
  };
  // 체크박스 업데이트
  const handleUpdate = (updateTodo) => {
    setTodoList(todoList.map((todo) => todo.id === updateTodo.id ? updateTodo : todo))
  };

  return (
    <div>
      <div className={styles.todoBox}>
        <TodoHeader />
        <TodoBody
          todoList={todoList}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
        <TodoFooter onAdd={handleAdd} />
      </div>
    </div>
  );
}
