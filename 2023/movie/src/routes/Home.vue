<template>
  <HeadLine></HeadLine>
  <Search></Search>
  <MovieList></MovieList>
</template>

<script>
import HeadLine from '../components/HeadLine.vue';
import Search from '../components/Search.vue';
import MovieList from '@/components/MovieList.vue';

export default {
  components: {
    HeadLine,
    Search,
    MovieList
  }

}
</script>

<style lang="scss"></style>