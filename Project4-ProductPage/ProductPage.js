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
  <div class="card h-100">
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


// 상품 검색 기능

var 입력값 = $('#searchInput').val() // searchInput에 입력한 값

// if(입력값 == )


// 만약에 searchInput에 입력한 값(입력값)이 상품.product_name에 들어있으면



// 만약 상품 제목에서 input에 입력한 글자가 들어 있으면
// 
// 검색창에 입력된 값이 상품.product_name과 같으면
// 그 상품만 보여줘(노란색 배경을 입혀서 보여줘)
// 그렇지 않으면 안보여줘




// console.log(데이터.product_name.indexOf('입력값'))