import React, { useEffect, useState } from "react";
import styles from "./TodoBox.module.css";
import TodoHeader from "./TodoHeader";
import TodoBody from "./TodoBody";
import TodoFooter from "./TodoFooter";

// 할 일 목록
const list = [
  // {
  //   id: 1,
  //   content: "HTML공부",
  //   status: "active",
  // },
  // {
  //   id: 2,
  //   content: "CSS공부",
  //   status: "active",
  // },
];

// header에서 filter 하기위한 목록
const filters = ["all", "active", "completed"];

export default function TodoBox() {
  //@ 할 일 목록 (localStorage에서 가져오기)
  const [todoList, setTodoList] = useState(() => readTodoListFromLocalStorage);
  //- 초기화된 값을 불러오는 경우 콜백함수를 이용해야 불필요한 렌더링을 피할 수 있다. readTodoListFromLocalStorage() 처럼 호출해서 값을 리턴받는 경우 useState가 렌더링될 때마다 호출되어 불필요한 렌더링이 발생한다. 비록 useState 훅 내에서 초기값이 들어오더라도 내부적으로 사용하고 있는 값을 사용하긴 하지만 렌더링이 발생하므로 콜백함수를 사용하는 것이 좋다.

  //@ 새로운 todo 추가
  const handleAdd = (todo) => setTodoList([...todoList, todo]);

  //@ 삭제버튼 클릭시 해당 아이템 삭제
  const handleDelete = (deleteTodo) => {
    setTodoList(todoList.filter((todo) => todo.id !== deleteTodo.id));
  };

  //@ 체크박스 업데이트
  const handleUpdate = (updateTodo) => {
    setTodoList(
      todoList.map((todo) => (todo.id === updateTodo.id ? updateTodo : todo))
    );
  };

  //@ 공통적으로 알아야 되는 부분이므로 header와 body위인 TodoBox 컴포넌트에서 필터링을 한다.
  const [filter, setFilter] = useState(filters[0]); // 초기값은 all

  //@ todoList가 바뀔때마다 todoList json 형태로 localstorage에 저장
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div>
      <div className={styles.todoBox}>
        {/* header에 사용하고 있는 모든 필터의 정보, 선택된 필터의 정보, 필터 변경을 위한 함수를 전달 */}
        <TodoHeader
          filters={filters}
          filter={filter}
          onFilterChange={setFilter}
        />
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

const readTodoListFromLocalStorage = () => {
  const todoList = localStorage.getItem("todoList");
  return todoList ? JSON.parse(todoList) : [];  // todoList가 없다면 빈 배열 반환
}