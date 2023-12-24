import React, { useState } from "react";

export default function TodoFooter({ todoList, setTodoList }) {
  // 새로운 할 일(input 값)
  const [newTodo, setNewTodo] = useState("");

  // input에 입력된 값 다루는 함수
  const handleChange = (e) => {
    // console.log(e.target.value);
    setNewTodo(e.target.value);
  };

  // todoList에 새로운 할 일 추가
  const addTodo = () => {
    setTodoList([
      ...todoList,
      {
        id: todoList.length + 1,
        content: newTodo,
        status: "disabled",
      },
    ]);
    setNewTodo(""); // input 초기화 
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="할일을 입력하세요"
          value={newTodo}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        {/* addTodo */}
        <button onClick={addTodo}>Add</button>
      </div>
    </div>
  );
}
