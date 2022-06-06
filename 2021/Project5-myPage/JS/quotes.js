const quotes = [
  {
    quote: "인생에 있는 큰 비밀은 큰 비밀 따위는 없다는 것이다. 당신의 목표가 무엇이든 열심히 할 의지가 있다면 달성할 수 있다.",
    author: "Oprah Winfrey",
  },
  {
    quote: "비전만 쫓다 보니 방향을 잃었다.",
    author: "Robin Green",
  },
  {
    quote: "행복하게 여행하려면 가볍게 여행해야 한다.",
    author: "생텍쥐페리",
  },
  {
    quote: "20대에는 의지, 30대에는 기지, 40대에는 판단이 지배한다.",
    author: "벤자민 프랭클린",
  },
  {
    quote: "인생은 거짓된 상황의 끝없는 연속이다.",
    author: "소온톤 와일더",
  },
  {
    quote: "이 세상에 보장된 것은 아무것도 없으며 오직 기회만 있을 뿐이다.",
    author: "더글러스 맥아더",
  },
  {
    quote: "우연이 아닌 선택이 운명을 결정한다.",
    author: "진 니데치",
  },
  {
    quote: "실패하는 것은 곧 성공으로 한 발짝 더 나아가는 것이다.",
    author: "메리 케이 애쉬",
  },
  {
    quote: "관찰하는데 있어서는 준비된 자에게만 기회가 온다.",
    author: "루이 파스퇴르",
  },
  {
    quote: "위험은 자신이 무엇을 하는지 모르는 데서 온다.",
    author: "워런 버핏",
  }
]

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

// console.log(quotes[Math.floor(Math.random() * quotes.length)]);
const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];
//Math.random()은 0에서 1 사이의 랜덤한 숫자
// Math.random()에다가 배열의 길이만큼 숫자를 곱해준 것

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;
// 화면에 표시
