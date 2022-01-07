const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
// 이미 처음에 toDoForm을 찾아놨기 때문에 그 안에서 input을 찾을 수 있음.
const toDoList = document.getElementById("todo-list");

// 8️
const TODOS_KEY = "todos";

// 5️
let toDos = []; // 아래 paintToDo함수에서 newToDo가 만들어질(그려질) 때마다 그 텍스트를 배열에 푸쉬하기 위한 변수(toDos)를 선언
/* 그러나 빈값으로 시작하면 로컬저장소에 새로운 값만 저장되는 문제점이 있으므로,
애플리케이션이 시작될 때 toDos array를 빈 값으로 시작하는 대신에,
const를 let으로 바꿔서 업데이트가 가능하도록 만들고,
localStorage에 toDo 들이 있으면 toDos array를 가지고 와서 toDos array에 복원시켜줌(아래 if문)
*/

// 7️
function saveToDos() {                          // toDos array의 내용을 localStorage에 넣기 위한 함수
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));         // "toDos"라는 키에 toDos 변수값 저장
  // JSON.stringify() ==> JavaScript object나 array나 어떤 것이든 string으로 바꿔주는 기능
  // localStorage 에는 배열을 저장할 수 없음. 오직 텍스트만 저장가능
}


// 4️  
function deleteToDo(event) {                    // 세번째로 만든 함수 (버튼 클릭시 리스트를 지우기 위한 함수)
  // console.log(event.target.parentElement);
  // target은 클릭된 HTML element 즉, 버튼을 의미 / parentElement는 클릭된 element의 부모 즉, li를 의미
  const li = event.target.parentElement;        // 지워야 할 li
  li.remove();  // li 지우기!!!
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id)); // toDo의 id가 li의 id와 다른 걸 남김
  saveToDos();                  // toDos DB에서 todo를 지운 뒤에 saveToDos()를 한 번 더 불러야 함
}


// 3️
function paintToDo(newToDo) {                   //두 번째로 만든 함수(toDo를 그리는 역할을 담당하는 함수)
  const li = document.createElement("li");      // li를 만들어서 HTML에 추가
  li.id = newToDo.id;
  const span = document.createElement("span");  // span을 만들어서 HTML에 추가
  span.innerText = newToDo.text;                     // handleToDoSubmit에서 전달된 newToDo값을 스팬에 텍스트로 입력(텍스트를 span 내부에 넣음)
  const btn = document.createElement("button"); // 투두리스트를 삭제할 button -> button을 만들어서 추가
  btn.innerText = "❌";                        // 버튼에 X 이모지 추가
  btn.addEventListener("click", deleteToDo);    // 버튼을 눌렀을 때 함수(4️ deleteToDo) 실행 
  li.appendChild(span);                         // span을 li 내부에 집어넣음 (즉, li가 span이라는 자식을 갖도록 함)
  li.appendChild(btn);                          // span 추가 후 버튼을 추가 (li에 집어넣은 것임)
  toDoList.appendChild(li);                     // ul 내부 에다가 li 집어넣음

  // !!! append는 맨 마지막에 놓여져야 함 !!!
}


// 2️
function handleToDoSubmit(event) {              // 맨처음 만든 함수
  event.preventDefault();
  const newToDo = toDoInput.value;              // input value를 비우기 전에 그 값을 저장
  toDoInput.value = "";
  /* 엔터를 누를때 마다 모든 입력값이 사라지도록
  toDoInput.value를 비웠다고 해서 위의 newToDo의 값이 비워지는 것은 아님.
  위의 newToDo는 toDoInput의 value를 새로운 변수(newToDo)에 복사하는 것이기 때문.
  */
  const newToDoObject = {
    text: newToDo,
    id: Date.now(),
  };
  toDos.push(newToDoObject);                    // text 대신 Object 푸쉬
  // 6 toDos.push(newToDo); === newToDo를 그리기 전에 toDos array를 가지고 와서 newTodo를 푸쉬(추가)
  paintToDo(newToDoObject);
  saveToDos();                                  // newToDo의 값을 배열로 만들어 저장하고, 화면에 그린 후 localStorage에 값들을 저장
}


// 1
toDoForm.addEventListener("submit", handleToDoSubmit);


// 9️ 단순한 문자열을 살아있는 배열로 변환하기 위해
const savedToDos = localStorage.getItem(TODOS_KEY);

// savedToDos가 null이 될 때도 있음. localStorage를 지우고서 savedToDos를 console.log 해보면 null이 나옴(localStorage에 아무 것도 없기 때문)
if (savedToDos !== null) {                  // 따라서 만약 savedToDos가 localStorage에 존재하면 
  const parsedToDos = JSON.parse(savedToDos);            //단순한 문자열을 살아있는 배열로 변환
  toDos = parsedToDos;        //toDos 배열을 가지고 와서 toDos 배열에 복원하기
  parsedToDos.forEach(paintToDo);                   // forEach는 배열 각각의 item에 대해서 함수를 실행해줌. 즉, forEach 함수는 paintToDo를 parsedToDos 배열의 요소마다 실행함
  // item들은 사실상 우리가 보내기 원하는 텍스트이므로, 페인트투두 함수를 호출하게 되면 새로고침해도 화면에 남아있게됨
  /* 
  function sayHello(item) {
  console.log("이 문자는", item);
  } 은 
  parsedToDos.forEach((item) => console.log("이 문자는", item)); 과 같음
  위처럼 => 함수를 화살표 함수라고 함
  */
}


// .filter === 지우고 싶은 item을 제외하고 새 배열을 만들기 위한 함수 / 지우고 싶은 item을 제외한다.




/*

SON.parse() = 단순한 문자열을 살아있는 자바스크립트 객체로 만들어줄 때 사용
즉, 일반 배열을 가지고 단순한 문자열로 바꿀 수 있음 -> JSON.srtingify()
그리고 단순한 문자열을 자바 스크립트가 이해할 수 있는 살아있는 배열로 만들 수 있음 -> JSON.parse()

정리하면 처음 우리가 지역저장소(localStorage)에 갖고 있던 단순한 문자열을,
JSON.parse안에 넣으면
실제로 무언가를 할 수 있는 배열을 얻게 된다. (아래 참조)

ex.
JSON.parse(localStorage.getItem("toDos"));
(3) ['a', 'b', 'c']   // 무언가를 할 수 있는 배열

localStorage.getItem("toDos");
'["a","b","c"]' // 문자열

*/

/*

const aa = ["a", "b"]
function sexyfilter(it) {return it !== "a" }
aa.filter(sexyilter)

*/