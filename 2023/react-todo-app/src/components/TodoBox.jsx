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

// header에서 filter 하기위한 목록
const filters = ['all', 'active', 'completed']

export default function TodoBox() {
  // 할 일 목록
  const [todoList, setTodoList] = useState(list);
  // 새로운 todo 추가
  const handleAdd = (todo) => setTodoList([...todoList, todo]);
  // 삭제버튼 클릭시 해당 아이템 삭제
  const handleDelete = (deleteTodo) => {
    setTodoList(todoList.filter((todo) => todo.id !== deleteTodo.id));
  };
  // 체크박스 업데이트
  const handleUpdate = (updateTodo) => {
    setTodoList(
      todoList.map((todo) => (todo.id === updateTodo.id ? updateTodo : todo))
    );
  };

  // 공통적으로 알아야 되는 부분이므로 header와 body위인 TodoBox 컴포넌트에서 필터링을 한다.
  const [filter, setFilter] = useState(filters[0]); // 초기값은 all

  return (
    <div>
      <div className={styles.todoBox}>
        {/* header에 사용하고 있는 모든 필터의 정보, 선택된 필터의 정보, 필터 변경을 위한 함수를 전달 */}
        <TodoHeader filters={filters} filter={filter} onFilterChange={setFilter} />
        {/*idea: 강의에서는 todoBody 부분에서 ul태그를 반복문으로 돌리고, li 태그만 todo라는 컴포넌트로 따로 빼서 작성함 */}
        <TodoBody
          todoList={todoList}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          filter={filter}
        />
        <TodoFooter onAdd={handleAdd} />
      </div>
    </div>
  );
}
