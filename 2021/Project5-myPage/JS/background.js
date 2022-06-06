// // const body = document.body;
// const images = ["h1.jpeg", "h2.jpeg", "h3.jpeg", "h4.jpeg", "0.jpeg", "1.jpeg", "2.jpeg"];
// const chosenImage = images[Math.floor(Math.random() * images.length)];
// const bgImage = document.createElement("img");

// const BACKGROUNDIMAGE = "backgroundImage";

// bgImage.src = `../img/${chosenImage}`;             // 이미지를 만들고 몇가지 프로퍼티들을 넣어줌 // 경로 주의하자.
// console.log(bgImage.src);

// bgImage.classList.add(BACKGROUNDIMAGE);
// document.body.appendChild(bgImage);
// body에 html을 추가
//append말고도 prepend를 사용할 수도 있음
// append는 가장 뒤에, prepend는 가장 위에 오게 하는 것.

// ------------------------------------------------------------

// 윈도우가 로드될때 함수실행
window.onload = function(){

  // var background_src = "../IMG/";

  var body = document.querySelector(".body");
  // var background = document.querySelector(".background");
  var number = Math.floor(Math.random() * 7) + 1; // 8은 이미지의 개수


  // background_src = background_src + number + ".jpeg";

  // background.style.backgroundImage = "url(../IMG/" + number + ".jpeg)";
  body.style.backgroundImage = "url(../IMG/" + number + ".jpeg)";

}