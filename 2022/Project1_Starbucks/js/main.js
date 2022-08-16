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



//! 일정 높이만큼 스크롤하면 뱃지 사라지게 하기
const badgeEl = document.querySelector('.badges');
// 화면이 스크롤 될 때마다 콜백함수가 실행된다.
// window.addEventListener('scroll', function () {
//   console.log("scroll!");
// });

/* 
# 웹사이트에서 스크롤을 하면 스크롤을 할 때마다 스크롤 함수가 계속해서 실행된다.
# 이에 따라, 프로젝트 크기가 커질수록 웹 사이트에 심한 부하가 생길 수 있음.
# 따라서 스크롤시 시간제한을 걸어주는 lodash 라이브러리를 사용
@ lodash 라이브러리 사용법
@ _.throttle(함수, 시간)
*/
window.addEventListener('scroll', _.throttle(function () {
  // console.log(window.scrollY);  //# winow.scrollY => 화면 스크롤시 높이값을 출력해줌
  
  if (window.scrollY > 500) {
    // 뱃지 숨기기
    // badgeEl.style.display = "none";
    /*
    # gsap 라이브러리(애니메이션을 처리해주는 라이브러리)를 이용해서 뱃지를 자연스럽게 숨길 수 있다.
    @ gsap 라이브러리 사용법 
    @ gsap.to(요소, 지속시간(초 단위), 옵션(중괄호 안에 속성기입));
    # cf) 옵션은 오브젝트({})안에 opacity나 display등 속성을 적을 수 있음.
    # opacity: 1처럼 숫자는 그냥 숫자로 적고, display: 'none'처럼 string타입은 따옴표를 쳐줘야 함.
    */
    gsap.to(badgeEl, .6, {
      opacity: 0,
      display: 'none'
    });
    // opacity는 시각적으로만 없애는 것이므로, display를 none으로 입력해야 뱃지가 완전히 사라진다.
  } else {
    // 뱃지 보이기
    // badgeEl.style.display = "block";
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
    })
  }
}, 300));



//! 홈페이지 로드시 이미지 하나씩 띄우기 (첫 section)
const fadeEls = document.querySelectorAll('.visual .fade-in');
// gsap.to(요소, 지속시간(초 단위), 옵션(중괄호 안에 속성기입))
fadeEls.forEach((fadeEl, index) => {
  gsap.to(fadeEl, 1, {
    opacity: 1,
    // 순차적으로 화면에 하나씩 보여주기 위해 delay옵션 적용
    // 그러나 delay를 .7로 적용하면 fade-in이 한번에 0.7초 뒤에 실행됨
    // 따라서 반복실행 될 때마다 delay의 시간을 차례대로 줘야하므로, 아래처럼 구현
    delay: (index + 1) * .7  // 처음 fadeEl은 0.7s 그 다음은 1.4s .. 2.8s    
  }) 
})



//! swiperjs 라이브러리를 이용해서 공지사항 슬라이드 하기
//@ 사용법 : new Swiper(선택자, 옵션) 
new Swiper('.inner__left .swiper', {
  direction: 'vertical',
  autoplay: true,   // 슬라이드 자동재생
  loop: true        // 반복재생 여부(슬라이드를 계속 반복)
});
new Swiper('.promotion .swiper', {
  slidesPerView: 3, // 한번에 보여줄 슬라이드 개수 (default는 1)
  spaceBetween: 10, // 슬라이드 사이의 여백
  centeredSlides: true, // 1번 슬라이드가 가운데 보이기
  loop: true,
  autoplay: {
    // {}안에 추가적인 옵션 부여가능
    delay: 5000  // ms단위로 기재(기본값 3000) => 5s마다 자동으로 슬라이드가 됨    
  },
  pagination: {
    el: '.promotion .swiper-pagination',  // 페이지 번호 요소의 선택자를 넣음
    clickable: true,   // ...을 클릭 가능하도록 (사용자의 페이지 번호 요소 제어)
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',   //이전버튼
    nextEl: '.promotion .swiper-next'    //다음버튼
  }
});



//! 스타벅스 프로모션옆의 버튼 클릭시 캐러셀을 수직으로 토글되도록 하기
const promotionToggleBtn = document.querySelector('.toggle-promotion')
const promotionEl = document.querySelector('.promotion');
let isHidePromotion = false;

promotionToggleBtn.addEventListener('click', function () {
  isHidePromotion = !isHidePromotion    //@ 어떤 특정 변수의 값을 지속적으로 반대값으로 변환시킬 때 ! 사용 
  if (isHidePromotion) {
    // true이면 숨김 처리!
    promotionEl.classList.add('hide');    // hide라는 클래스 추가
  } else {
    // false이면 보임 처리!
    promotionEl.classList.remove('hide');   // hide라는 클래스 제거
  }
})