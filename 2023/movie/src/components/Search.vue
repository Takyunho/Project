<template>
  <div class="container">
    <input class="form-control" type="text" v-model="title" placeholder="찾고자 하는 영화를 입력해주세요!" @keyup.enter="apply">
    <div class="selects">
      <select v-for="filter in filters" :key="filter.name" class="form-select" v-model="$data[filter.name]">
        <!-- filter.name이 year인 경우 즉, 세번째 option에만 적용되도록 함 -->
        <option value="" v-if="filter.name === 'year'">
          All Years
        </option>
        <option v-for="item in filter.items" :key="item">{{ item }}</option>
      </select>
    </div>
    <button class="btn btn-primary" @click="apply">Apply</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: "",
        type: "movie",
        number: 10,
        year: "",
        filters: [
          {
            name: "type",
            items: ['movie', 'series', 'episode']
          },
          {
            name: "number",
            items: [10, 20, 30]
          },
          {
            name: "year",
            items: (() => { // 즉시 실행 함수의 결과를 return하는 식으로도 가능하구나
              // 가장 최신년도부터 1985년까지
              const currentYear = new Date().getFullYear();
              const years = [];
              for (let i = currentYear; i >= 1985; i--) {
                years.push(i);
              }
              return years
            })() 
          }
        ],
      }
  },
  methods: {
    async apply() {
      this.$store.dispatch('movie/searchMovies', {
        title: this.title,
        type: this.type,
        number: this.number,
        year: this.year, 
      })
      // store의 mutations를 실행할 때는 commit 메소드를 사용하고,
      // actions를 실행할 때는 dispatch 메소드를 사용한다.
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  > * { // container 선택자의 모든 자식 요소들에 대한 스타일 지정
    margin-right: 10px;
    font-size: 15px;
    &:last-child {
      margin-right: 0;  // .selects는 margin-right: 0;
    }
  }
  .selects {
    display: flex;
    select {
      width: 120px;
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .btn {
    width: 120px;
    height: 50px;
    font-weight: 700;
    flex-shrink: 0; // flex item의 크기를 줄이지 않음
  }
}
</style>