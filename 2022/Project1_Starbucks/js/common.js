//! header 
const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');

searchEl.addEventListener('click', function () {
  searchInputEl.focus();    // js를 통해 focus가 가능한 부분에 focus를 강제 적용해주는 명령
});

// input이 focus 되어 있을 때
searchInputEl.addEventListener('focus', function () {
  searchEl.classList.add('focused');    // classList.add = 클래스를 추가하는 명령
  searchInputEl.setAttribute('placeholder', '통합검색');   //# setAttribute('속성이름', 실제 들어갈 값) = 어떤 html 속성을 지정할 때 사용하는 메소드
});

// input에 focus가 blur처리 되었을 때(focus가 해제 되었을 때)
searchInputEl.addEventListener('blur', function () {
  searchEl.classList.remove('focused');    // classList.remove = 클래스를 제거하는 명령
  searchInputEl.setAttribute('placeholder', '');   // 빈값을 할당해서 placeholder 지우기
});



//! footer부분의 span태그에 날짜 올해로 지정하기
const thisYear = document.querySelector(".this-year");
thisYear.textContent = new Date().getFullYear();  // 2023