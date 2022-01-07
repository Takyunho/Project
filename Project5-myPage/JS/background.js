// const body = document.body;


const images = ["h1.jpeg", "h2.jpeg", "h3.jpeg", "h4.jpeg", "0.jpeg", "1.jpeg", "2.jpeg"];
const chosenImage = images[Math.floor(Math.random() * images.length)];
const bgImage = document.createElement("img");

const BACKGROUNDIMAGE = "backgroundImage";


bgImage.src = `../img/${chosenImage}`;             // 이미지를 만들고 몇가지 프로퍼티들을 넣어줌 // 경로 주의하자.
bgImage.classList.add(BACKGROUNDIMAGE);
document.body.appendChild(bgImage);

// body에 html을 추가
//append말고도 prepend를 사용할 수도 있음
// append는 가장 뒤에, prepend는 가장 위에 오게 하는 것.
