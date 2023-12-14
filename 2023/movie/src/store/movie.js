import axios from "axios";

export default {
  namespaced: true,
  state: () => ({
    movies: [],
    message: '',
    loading: false
  }),
  getters: {},
  mutations: {
    updateState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    resetMovies(state) {
      state.movies = [];
    },
  },
  actions: {
    async searchMovies({ commit }, payload) {
      const { title, type, number, year } = payload;
      const OMDB_API_KEY = "a8603ac4";
      const OMDB_API = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`;

      const res = await axios.get(OMDB_API);
      const { Search, totalResults } = res.data;
      commit('updateState', {
        movies: Search,
      })

      console.log(number, totalResults);
    },
  },
};
