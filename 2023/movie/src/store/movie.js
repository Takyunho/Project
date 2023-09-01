export default {
	// module 
  namespaced: true,   // 하나의 스토어에서 모듈로 사용될 수 있다는 것을 명시하는 속성
	// data
  state: () => ({     // 데이터를 의미함
      movies: []
    }),      
	// computed 
  getters: {          // computed와 비슷한 역할 -> 계산된 상태를 만드는 역할
    movieIds(state) {
      return state.movies.map(m => m.imdbID)
    }
  },      
	// methods
  // 변이
  mutations: {    // methods와 비슷한 역할 -> 함수를 만들어서 데이터를 활용
    //^ mutations에서만 데이터를 변경할 수 있다. (데이터를 변경하기 위한 함수는 mutations에 작성한다.)
    resetMovies(state) {
      state.movies = []
    }
  },
  // actions안의 메소드들은 비동기로 동작함
  actions: {
    // searchMovies(context) {
    //   context.state
    //   context.getters
    //   context.commit
    // }
    // 객체 구조분해 할당으로 간소화
    searchMovies({ state, getters, commit }) {
      console.log(state, getters, commit) 
    }
  }
}