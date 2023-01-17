// 2. This code loads the IFrame Player API code asynchronously.
// ^ == Youtube IFrame API를 비동기로 로드한다.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api"; // 외부 자바스크립트가 할당되는 부분
var firstScriptTag = document.getElementsByTagName('script')[0];  // 스크립트라는 태그를 갖고 있는 요소 중에 가장 첫번째 태그를 변수에 할당
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);  // head태그 안에 추가하기


// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
function onYouTubeIframeAPIReady() {  // ^ 함수 이름은 Youtube IFrame Player API에서 사용하는 이름이기 때문에 다르게 지정하면 동작하지 않는다. 그리고 함수는 전역(Global) 등록해야 한다.
  //# 여기서 'player'인수는 <div id="player"></div> 의 player임
  new YT.Player('player', {
    // height: '360',
    // width: '640',
    videoId: 'An6LvWQuj_8',   //# 최초 재생할 유튜브 영상 ID
    playerVars: {
      autoplay: 1,  //# 자동 재생 유무
      loop: true,   //# 반복 재생 유무
      playlist: 'An6LvWQuj_8' //# loop가 true인 경우, 반복 재생할 유튜브 영상 ID 목록을 다시 기재해야 한다.
    },
    events: {
      // 영상이 준비되었을 때,
      onReady: function (event) {   //^ 객체 데이터 내부에 함수 데이터가 할당되어 있는 속성을 메소드라고 한다.!!  
        event.target.mute() //# 음소거
      }
    }
    // events: {
    //   'onReady': onPlayerReady,
    //   'onStateChange': onPlayerStateChange
    // }
  });
}