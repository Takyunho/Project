<template>
  <RouterLink to="/" class="logo">
    <span>Movie</span> App
  </RouterLink>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
@import "../styles/main.scss";
.logo {
  font-family: "Oswald", sans-serif;
  font-size: 20px;
  color: $black;  //bootstrap에 정의된 변수
  text-decoration: none;
  &:hover {
    color: $black;
  }
  span {
    color: $primary;
  }
}
</style>