import React, { useState } from "react";
import styles from './TodoBox.module.css'
import TodoHeader from './TodoHeader';
import TodoBody from './TodoBody';
import TodoFooter from './TodoFooter';

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
    status: "disabled",
  },
];

export default function TodoBox() {
  // 할 일 목록
  const [todoList, setTodoList] = useState(list);

  // 삭제버튼 클릭시 해당 아이템 삭제
  const handleDelete = (e) => {
    console.log(e)
    console.log(e.target)
    
  };

  // 새로운 todo 추가
  const handleAdd = (todo) => setTodoList([...todoList, todo])

  return (
    <div>
      <div className={styles.todoBox}>
        <TodoHeader />
        <TodoBody todoList={todoList} handleDelete={handleDelete} />
        <TodoFooter todoList={todoList} onAdd={handleAdd} />
      </div>
    </div>
  );
}

