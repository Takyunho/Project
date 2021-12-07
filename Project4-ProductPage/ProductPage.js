// var ajaxData = '';              // 전역변수 선언
// 전역변수 선언하지 말고 아래처럼 데이터를 받을 빈 어레이 만들자
var 상품어레이 = [];

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
    // ajaxData = 데이터;                        // 전역변수에 data담음
    상품어레이 = 데이터.products;     // 전역변수말고 상품어레이 = 받은 데이터라고 재할당

    상품어레이.forEach(function (상품) {         // 파라미터.json데이터
      // console.log(상품);
      var 초기템플릿 = `<div class="col-lg-3 mt-3">
  <div class="card h-100 dragCard" id="cardBox">
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

    })
  })
    .fail(function () {
      console.log('데이터를 불러오는데 실패');
    })
}




// 검색어 필터기능
$('#searchInput').keyup(function () {    // keyup 이벤트 = 키보드의 키를 눌렀다 뗄 때 요소에 이벤트를 발생
  var 입력값 = $('#searchInput').val();                     // searchInput에 입력한 값
  var 상품박스 = document.querySelectorAll('#cardBox');    // 노드리스트
  var 상품제목 = $('.card-title');


  for (let i = 0; i < 상품박스.length; i++) {

    // 만약에 searchInput에 입력한 값(입력값)이 상품.product_name에 들어있으면
    if (상품제목[i].innerText.indexOf(입력값) > -1) {

      // 검색어에 하이라이트주기
      var 글씨하이라이트 = 상품제목[i].innerText.replace(입력값, `<span class='highlight'>${입력값}</span>`);
      $('.card-title').eq(i).html(글씨하이라이트);

      // 검색된 부분만 보여주기
      상품박스[i].style.display = 'flex';     // block으로 하면 카드 푸터부분이 이상해지네..
    } else {
      // 검색 안된거 숨기기
      상품박스[i].style.display = 'none';
    }
  }
});




// 드래그 앤 드롭
$(function () {
  $('.dragCard').draggable({    // 드래그 가능하게(제이쿼리 css, ui 필요) class도 가능
    revert: true      //revert를 true로 주면 드래그끝났을 때 원래 제자리로 돌려놓아주고
    // containment: '#요소셀렉터',
    // snap : '#요소셀렉터'     // snap은 드래그중에 어떤 요소에 달라붙게 할건지 정할 수 있음
  });
});
$(function () {
  $('#dropBox').droppable({
    drop: function (event, ui) {
      var item = $(ui.draggable);
      console.log(item);

      // ❗ var index = item.attr('data-index');

      var img = item.find('img');
      // console.log(img);
      var productName = item.find('.card-title').text();
      // console.log(productName);
      var brandName = item.find('.card-text').text();
      // console.log(brandName);
      var price = item.find('.price').text();
      // ❗console.log(price);

      // ❗
      // 장바구니에 중복으로 상품이 담기는 것을 방지
      // var productInBasket = $(`#basket-list [data-index=${index}]`);
      // if (productInBasket.length) {
      //   // 중복되는 상품이 있을 경우
      //   alert('이미 장바구니에 담긴 상품입니다.');
      //   return;
      // }
      
      
      //드롭했을 시 그 밑에 상품목록 생성해주기
      var 장바구니 = $(`
      <div id="basket">
        <div class="card h-100 dragCard" id="cardBox">
          <img src="${img.attr('src')}" class="card-img-top h-100 w-auto">
          <div class ="card-body">
          <h5 class ="card-title text-center">${productName}</h5>
          <p class ="card-text text-center">${brandName}</p>

          <div class ="input-group input-group-sm mb-3">
          <div class ="row">
          <div class ="input-group-prepend col-4">
          <span class ="input-group-text">수량</span>
          </div>
          <input type ="number" min="1" value="1" class ="form-control number col-6">
          <button type ="button" class ="col-2 btn-delete">X</button>
          </div>
          </div>
          </div>

          <div class ="card-footer text-right">
          <small class ="text-muted price">가격: ${price}</small>
          </div>
        </div>
      </div>
      `)
        // ❗ id="inputGroup-sizing-sm-${index}"

      $('#dropTemplate').append(장바구니);
      


      // ❗
      $('.btn-delete').click(function () {
        장바구니.remove();
      })
      
    },
  });
})


// ❗
var 장바구니상품 = $(`
            <div class="card-deck">
                <div class="card mb-3" style="max-width: 540px;" data-index="${index}">
                    <div class="row no-gutters">
                        <div class="col-md-4 overflow-hidden">
                            <img src="${img.attr('src')}" class="card-img h-100 w-auto" alt="${productName}" title="${productName}">
                        </div>
                        <div class="col-md-7">
                            <div class="card-body">
                            <h5 class="card-title product-name">${productName}</h5>
                            <p class="card-text brand-name">${brandName}</p>
                            <p class="card-text"><small class="text-muted price">${price}</small></p>
                            <p class="card-text">
                                <div class="input-group input-group-sm mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="inputGroup-sizing-sm-${index}">수량</span>
                                    </div>
                                    <input type="number" min="1" value="1" class="form-control number" >
                                </div>
                            </p>
                            <p class="card-text">합계 <span class="sum">${price}</span>원</p>
                            </div>
                        </div>
                        <button type="button" class="col-md-1 btn-delete">X</button>
                    </div>
                </div>
            </div>
            `);