var ajaxData = '';              // 전역변수 선언

getProducts();                  //데이터 가져와서 박아넣는기능

function getProducts() {
  //json 데이터 ajax로 가져오고 데이터바인딩
  $.ajax({
    type: "GET",
    url: "store.json",  // ajax get 요청으로도 로컬 json파일에 있는 데이터를 가져올 수 있다!
    // data: "data",
    // dataType: "json",
  }).done(function (데이터) {
    console.log(데이터);
    데이터.products.forEach(function (상품) {         // 파라미터.json데이터
      var 초기템플릿 = `<div class="col-lg-3 mt-3">
  <div class="card h-100" id="cardFind">
    <img src="IMG/${상품.photo}"class="card-img-top">
    <div class="card-body">
      <h5 class="card-title">${상품.product_name}</h5>
      <p class="card-text">${상품.brand_name}</p>
    </div>
    <div class="card-footer">
      <small class="text-muted">가격 : ${상품.price}</small>
    </div>
  </div>
</div>`
      $('.cardGroup').append(초기템플릿);
      ajaxData = 데이터;                        // 전역변수에 data담음
    })
  })
    .fail(function () {
      console.log('데이터를 불러오는데 실패');
    })
}


// 검색어 필터기능
$('#searchInput').keyup(function () {    // keyup 이벤트 = 키보드의 키를 눌렀다 뗄 때 요소에 이벤트를 발생
  var 입력값 = $('#searchInput').val();                     // searchInput에 입력한 값
  var 상품박스 = document.querySelectorAll('#cardFind');    // 노드리스트
  var 상품제목 = $('.card-title');


  for (let i = 0; i < 상품박스.length; i++) {

    // 만약에 searchInput에 입력한 값(입력값)이 상품.product_name에 들어있으면
    if (상품제목[i].innerText.indexOf(입력값) > -1) {

      // 검색어에 하이라이트주기
      var 글씨하이라이트 = 상품제목[i].innerText.replace(입력값, `<span class='highlight'>${입력값}</span>`);
      $('.card-title').eq(i).html(글씨하이라이트);

      상품박스[i].style.display = 'flex';     // block으로 하면 카드 푸터부분이 이상해지네..
    } else {
      상품박스[i].style.display = 'none';
    }
  }
});