<template>
  <Header></Header>
  <RouterView></RouterView>
</template>

<script>
  import Header from './components/Header'

  export default {
  components: {
      Header
    }
  }
</script>

<style lang="scss">
// scoped를 제거해야 하위컴포넌트에 스타일이 적용된다.
@import "./styles/main.scss";

//=> 1. npm i bootstrap으로 부트스트랩 설치
//=> 2. main.scss에서 @import "../../node_modules/bootstrap/scss/bootstrap" 추가
//=> 3. App.vue에서 @import "./styles/main.scss"; 추가

body {
  line-height: 1.4;
  font-family: 'Roboto', sans-serif;
}

</style>