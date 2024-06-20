import axios from "axios";

// Mock data
export default class FakeYoutubeClient {
  constructor() {}

  async search({ params }) {
    // 1. 삼항연산자 사용
    // return params.channelId
    //   ? axios.get("/videos/related.json")
    //   : axios.get("/videos/search.json");

    // 2. 삼항연산자로 json 파일이름만 바꾸기
    return axios.get(`/videos/${params.channelId ? 'related' : 'search'}.json`);
  }

  async videos() {
    return axios.get('/videos/popular.json');
  }

  async channels() {
    return axios.get('/videos/channel.json');
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
