// var ajaxData = '';              // 전역변수 선언
// 전역변수 선언하지 말고 아래처럼 데이터를 받을 빈 어레이 만들자
var 상품어레이 = [];

getProducts();                  //데이터 가져와서 박아넣는기능

function getProducts() {
  // ✅ json 데이터 ajax로 가져오고 데이터바인딩
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
      <small class="text-muted">가격 : <span class="price">${상품.price}</span></small>
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




// ✅ 검색어 필터기능
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




// ✅ 드래그 앤 드롭
// 드래그
$(function () {
  $('.dragCard').draggable({    // 드래그 가능하게(제이쿼리 css, ui 필요) class도 가능
    revert: true      //revert를 true로 주면 드래그끝났을 때 원래 제자리로 돌려놓아주고
    // containment: '#요소셀렉터',
    // snap : '#요소셀렉터'     // snap은 드래그중에 어떤 요소에 달라붙게 할건지 정할 수 있음
  });
});
// 드롭
$(function () {
  $('#dropBox').droppable({
    drop: function (event, ui) {
      var item = $(ui.draggable);
      console.log(item);

      // var index = item.attr('data-index');      // item요소의 data-index 속성을 가져옴
      var img = item.find('img');
      var productName = item.find('.card-title').text();
      var brandName = item.find('.card-text').text();
      var price = item.find('.price').text();       // 초기템플릿에서 price라는 클래스의 텍스트값을 가져와 price라고 선언
      console.log(price);


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
          <div class ="input-group-prepend col-3">
          <span class ="input-group-text">수량</span>
          </div>
          <input type ="number" id="amount" min="1" value="1" class ="form-control number col-3">
          <button type ="button" class ="col-2 btn-delete">X</button>
          </div>
          </div>
          </div>

          <div class ="card-footer text-right">
          <small class="text-muted">가격 : <span class="price sum">${price}</span></small>
          </div>
        </div>
      </div>
      `)

      // 데이터 바인딩
      $('#dropTemplate').append(장바구니);
      setTotalSum();    // 처음 총합계 금액 띄우기



      // 장바구니 항목에 있는 것들의 합계
      // id가 amount인 요소의 값이 바뀔때마다 안의 함수 실행
      // ❗ find 함수를 안쓰고 아래처럼 하면 금액이 이상해짐.... 
      // $('.amount').on('input', function () {
      //   // 합계는 수량 X 가격
      //   var 합계 = parseInt(price, 10) * $('.amount').val();  
      //   $('.sum').text(합계);
      //   // 셋토탈함수썸() 실행
      //   setTotalSum();
      // })

      // ✅ 장바구니 항목에 있는 것들의 합계
      장바구니.find("input[type='number']").on('input', function () {
        var 합 = parseInt(price, 10) * $(this).val(); // price값을 10진수 정수로 변환
        장바구니.find('.sum').text(합); // ❗ sum은 클래스로 해야됨. id로하면 중복 허용이 안돼서 적용이 안돼
        
        setTotalSum();
      });



      // ✅ 버튼 누르면 장바구니 안의 상품 지우기
      장바구니.find("button.btn-delete").click(function () { // ❗ 하위 선택자를 이용 button.btn-delete로 작성해야함
        장바구니.remove();
        // 총합계금액(셋토탈함수썸()) 함수실행
        setTotalSum();
      })
      // $('.btn-delete').click(function () {});



      
      // ✅ 총합계
      // 셋 토탈썸 함수는 장바구니가 변동될 때마다 총 금액을 계산해주는 기능 
      function setTotalSum() {
        var totalSum = 0;

        $('.sum').each(function () {
          totalSum = totalSum + parseInt($(this).text(), 10); // 내부적으로 function을 호출할 때 this가 바뀐다.
          // 즉 여기서 this는 #sum이 되는 것
        });
        $('#totalSum').text(totalSum);
      }








      // 2. 구매하기 누르면 성함 연락처를 입력할 수 있는 모달창 띄워주기

    }
  })
});
