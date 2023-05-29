<template>
  <header>
    <Logo></Logo>
    <div class="nav nav-pills">
      <div class="nav-item" v-for="nav in navigations" :key="nav">
        <RouterLink class="nav-link" :to="nav.href" active-class="active">
          {{ nav.name }}
        </RouterLink>
      </div>
    </div>

  </header>
</template>

<script>
import Logo from '../components/Logo.vue'

export default {
  data() {
    return {
      //- 경로를 효율적으로 관리하기 위해 navigation이라는 배열을 만들어서 관리한다.
      navigations: [
        {
          name: 'Search',
          href: '/'
        },
        {
          name: 'Movie',
          href: '/movie'
        },
        {
          name: 'About',
          href: '/about'
        },
      ]
    }
  },
  components: {
    Logo
  }

}
</script>

<style lang="scss" scoped>
  header {
    height: 70px;
    padding: 0 40px;
    display: flex;
    align-items: center;
    
    // header 안에 들어있는 logo인 경우에만 스타일 적용됨
    .logo {
      margin-right: 40px;
    }
  }
</style>