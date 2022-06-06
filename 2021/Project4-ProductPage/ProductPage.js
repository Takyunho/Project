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
      // 데이터 바인딩
      $('.cardGroup').append(초기템플릿);

    })
  })
    .fail(function () {                     // 실패했을경우
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
  var currentObj;
  $('.dragCard').draggable({    // 드래그 가능하게(제이쿼리 css, ui 필요) class도 가능
    revert: true,      //revert를 true로 주면 드래그끝났을 때 원래 제자리로 돌려놓아주고
    
    //드래그를 시작했을때 이벤트 발생
    start: function(event, ui ) {
      currentObj = $(".ui-draggable-dragging"); //현재 드래그 중인 엘리먼트 가져오기 
  },
    
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


      // ✅ 드롭했을 시 그 밑에 상품목록 생성해주기
      var 장바구니 = $(`
      <div id="basket">
        <div class="card h-100 dragCard" id="cardBox">
          <img src="${img.attr('src')}" class="card-img-top h-100 w-auto">
          <div class ="card-body">
          <h5 class ="card-title text-center productName">${productName}</h5>
          <p class ="card-text text-center brandName">${brandName}</p>
          <p class="card-text text-center"><small class="text-muted drop-price">가격 : ${price}</small></p>
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
          <small class="text-muted">가격 : <span class="sum">${price}</span></small>
          </div>
        </div>
      </div>
      `)

      // 데이터 바인딩
      $('#dropTemplate').append(장바구니);
      setTotalSum();    // 처음 총합계 금액 띄우기


      // ❗ 장바구니에 중복상품이 있으면 중복방지
      // var productInBasket = $('#dropTemplate');
      // if (productInBasket.length) {       // 중복되는 상품이 있을 경우
      //   alert('이미 장바구니에 담긴 상품입니다.');
      //   return;
      // }


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

    }
  })
});



// ✅ 구매하기 누르면 성함 연락처를 입력할 수 있는 모달창 띄워주기(위에서 아래로, 최종화면)
$('.btn-buy').click(function () {
  $('#name').val('');     // 인풋 안의 값 비우기
  $('#tel').val('');      // 인풋 안의 값 비우기
  // 미리 그려져 있던 캔버스 지우기
  // const context = canvas.getContext('2d');
  // context.clearRect(0, 0, canvas.width, canvas.height);

  var 장바구니상품 = $('#dropTemplate *');  // 드롭템플릿 안의 모든 요소를 장바구니리스트 변수에 담아

  // 장바구니안에 상품이 없으면
  if (장바구니상품.length == 0) {
    alert('장바구니가 비어있습니다.');                // 장바구니가 비어있다고 알려주기
    return;
  } else {                                            // 장바구니에 상품 있으면
    $('.black-background').addClass('down-slide');    // 모달창 보여주기
  }
});
// 닫기버튼 눌렀을때 모달창 아래서 위로
$('#close').click(function () {
  $('.black-background').removeClass('down-slide');
  $('#name').val('');     // 인풋 안의 값 비우기
  $('#tel').val('');      // 인풋 안의 값 비우기
  $('#name-alert').hide();
  $('#tel-alert').hide();
});



// ✅ 모달창에서 키다운 이벤트 발생시 연락처 검증 (숫자 -> 하이픈)
$(function () {
  $(".phone-number-check").on('change', function (e) {

    var trans_num = $(this).val().replace(/-/gi, '');   // 숫자만 입력받기
    var k = e.keyCode;

    if (trans_num.length >= 11 && ((k >= 48 && k <= 126) || (k >= 12592 && k <= 12687 || k == 32 || k == 229 || (k >= 45032 && k <= 55203)))) {
      e.preventDefault();
    }
  }).on('blur', function () { // 포커스를 잃었을때 실행합니다.
    if ($(this).val() == '') return;

    var trans_num = $(this).val().replace(/-/gi, ''); // 기존 번호에서 - 를 삭제합니다.

    if (trans_num != null && trans_num != '') {               // 입력값이 있을때만 실행합니다.

      if (trans_num.length == 11 || trans_num.length == 10) { // 총 핸드폰 자리수는 11글자이거나, 10자여야 합니다.

        var regExp_ctn = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})([0-9]{3,4})([0-9]{4})$/;  // 유효성 체크

        if (regExp_ctn.test(trans_num)) {
          // 유효성 체크에 성공하면 하이픈을 넣고 값을 바꿔줍니다.
          trans_num = trans_num.replace(/^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?([0-9]{3,4})-?([0-9]{4})$/, "$1-$2-$3");
          $(this).val(trans_num);
        }
        else {
          alert("유효하지 않은 전화번호 입니다.");
          $(this).val("");
          $(this).focus();
        }
      }
      else {
        alert("유효하지 않은 전화번호 입니다.");
        $(this).val("");
        $(this).focus();
      }
    }
  });
});



// ✅ 구매완료 누른 후 폼이 전송될때
$('form').on('submit', function (e) {
  // 입력한 이름 검증하기
  var 입력한이름 = $('#name').val();
  var 이름검증 = /^[가-힣]{2,4}$/;     // 한글 이름 2~4자 이내
  // 입력한 연락처 검증하기
  var 입력한연락처 = $('#tel').val();
  var 연락처검증 = /^\d{2,3}-\d{3,4}-\d{4}$/;   // 일반 전화번호 정규식

  // 연락처와 이름 모두 기재되었다면
  if (이름검증.test(입력한이름) == true && 연락처검증.test(입력한연락처) == true) {
    영수증출력();// ✅ 영수증 출력하는 함수 
  }

  if (입력한이름 == '') {
    e.preventDefault();                               // 만약에 입력한 이름이 공백이면
    $('#name-alert').html('이름을 입력하지 않았습니다.');      // html 변경하고
    $('#name-alert').show();                                  //#name-alert 보여줘(show)
  } else if (이름검증.test(입력한이름) == false) {    // 만약에 입력한 이름이 이름검증과 맞지 않으면
    e.preventDefault();                                       // 폼의 전송을 막는 코드
    $('#name-alert').html('이름이 올바르지 않습니다.');        // html 변경하고
    $('#name-alert').show();                                  //#name-alert 보여줘(show)
  } else {
    e.preventDefault();
    $('#name-alert').hide();
  }

  if (입력한이름.length > 4) {                        // 만약에 입력한이름의 길이가 4글자를 넘어가면
    e.preventDefault();
    $('#name-alert').html('이름은 4글자 이하로 적어주세요.');  // html 변경하고
    $('#name-alert').show();                                  //#name-alert 보여줘(show)
  }
  
  if (입력한연락처 == '') {                           // 만약에 입력한연락처가 공백이면
    e.preventDefault();
    $('#tel-alert').html('연락처를 입력하지 않았습니다.');
    $('#tel-alert').show();
  } else if (연락처검증.test(입력한연락처) == false) {
    e.preventDefault();
    $('#tel-alert').html('연락처가 올바르지 않습니다.');
    $('#tel-alert').show();
  } else {
    e.preventDefault();
    $('#tel-alert').hide();
  }

});



// ✅ 위의 검증을 거쳐 구매완료가 되면 실행할 함수 (클릭 이벤트 줄 필요 XXXX !! )
function 영수증출력() {

  // 먼저 모달창 사라지게 하기
  $('.black-background').removeClass('down-slide');
  $('#name-alert').hide();
  $('#tel-alert').hide();

  // 그리고 나서 영수증 이미지 출력
  // canvas안에 적은 내용들은 전부 이미지처럼 사용가능
  // 0. HTML어딘가에 <canvas id="canvas"></canvas> 이런 태그를 만들어줍니다. 
  var 캔버스 = document.getElementById('canvas'); // canvas 태그를 자바스크립트 셀렉터로 찾음
  var c = 캔버스.getContext('2d');    // getContext('2d') 이걸 붙이면 자유롭게 내용입력이 가능
  var 캔버스길이 = $('#dropTemplate > div').length; // 상품개수에 따른 캔버스 길이

  // 가로세로 높이 지정 
  캔버스.width = 500;
  캔버스.height = 300 * 캔버스길이; // (상품개수에따라 높이값 증가시켜야함)

  // 맨위 영수증
  c.font = 'bold 20px Malgun Gothic';   // .font하면 자유롭게 폰트설정 가능
  c.fillText('영수증', 10, 40);
  // 날짜
  var 날짜 = new Date();
  c.font = 'bold 16px Malgun Gothic';
  c.fillText(날짜, 10, 60);

  // 장바구니에 있는 상품 개수만큼 반복실행
  $('#dropTemplate > div').each(function (i) {
    // 제품이름
    var 상품이름 = $(this).find('.productName').text();    // 각각의 것을 찾기위해 this find 사용
    c.fillText(`품명 : ${상품이름}`, 10, 120 * (i + 1));   // .fillText(내용, x좌표, y좌표) 하면 canvas태그 내의 특정 좌표에 원하는 글씨 입력이 가능
    // 브랜드이름
    var 브랜드이름 = $(this).find('.brandName').text();
    c.fillText(`브랜드명 : ${브랜드이름}`, 10, 120 * (i + 1) + 20);
    // 가격
    var 가격 = $(this).find('.drop-price').text();
    c.fillText(가격, 10, 120 * (i + 1) + 40);
    // 수량
    var 수량 = $(this).find("input[type='number']").val();
    c.fillText(`수량 : ${수량}`, 10, 120 * (i + 1) + 60);
    // 합계
    var 합계 = $(this).find('.sum').text();   // 합
    c.fillText(`합계 : ${합계}`, 10, 120 * (i + 1) + 80);
  });
  // 총합계
  var 총합계 = $('#totalSum').text();   //totalSum
  c.fillText(`총합계 : ${총합계}`, 10, (120 * 캔버스길이) + 150);

  // 닫기버튼 // 위에 그렸던 캔버스를 div박스 안에 넣음으로써 다이얼로그창으로 띄움
  $('#canvas-popup').dialog({   // jQuery 다이얼로그 함수를 실행하는 함수
    width: 500,                 // 다이얼로그 너비
    height: 500,                // 다이얼로그 높이
    modal: true,                // dialog를 modal 창으로 띄울것인지 결정
    // resizeable : false       // 사이즈 조절가능 여부
    buttons: {
      '닫기': function () {         // '닫기' 가 버튼의 이름 (함수명)
        $(this).dialog('close');    // 버튼 누르면 클로즈(다이얼로그 창을 닫는 기능)
      }
    },
    //   , show: {                // 애니메이션 효과 - 보여줄때
    //     effect: "blind",
    //     duration: 1000
    // }
    // , hide: {                // 애니메이션 효과 - 감출때
    //     effect: "explode",
    //     duration: 1000
    // }
    // open: function (event, ui) {
    //   $(event.target).dialog('widget')
    // }
  });
};

