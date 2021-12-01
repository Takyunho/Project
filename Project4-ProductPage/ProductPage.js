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





