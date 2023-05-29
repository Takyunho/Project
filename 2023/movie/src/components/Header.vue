<template>
  <header>
    <div class="nav nav-pills">
      <div 
        class="nav-item" 
        v-for="nav in navigations" 
        :key="nav"
      >
        <RouterLink 
          class="nav-link" 
          :to="nav.href"
          active-class="active"
        >
          {{ nav.name }}
        </RouterLink>
      </div>
    </div>

  </header>
</template>

<script>
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
    }
  }
</script>

<style lang="scss" scoped>

</style>