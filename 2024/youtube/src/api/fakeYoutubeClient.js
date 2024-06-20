import axios from "axios";

// Mock data
export default class FakeYoutubeClient {
  constructor() {}

  async search() {
    return axios.get('/videos/search.json');
  }

  async videos() {
    return axios.get('/videos/popular.json');
  }


  // async search(keyword) {
  //   return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  // }

  // async #searchByKeyword() {
  //   return axios
  //     .get(`/videos/search.json`)
  //     .then((res) => res.data.items)
  //   // keyword로 검색한 경우에는 id 포맷을 바꿔줘야 함
  //     .then((items) => items.map((item) => ({...item, id: item.id.videoId})))
  // }

  // async #mostPopular() {
  //   return axios
  //     .get(`/videos/popular.json`)
  //     .then((res) => res.data.items);
  // }

}