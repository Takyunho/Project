import axios from "axios";

//-> 실제 데이터를 받아오는 api (postman 참고)
export default class Youtube {
  /** Axios 인스턴스 활용하기
   * 리퀘스트를 보낼 때 공통으로 사용하는 주소나 헤더가 있음.
   * 이럴 때는 인스턴스를 만들어서 반복되는 코드를 줄일 수 있음.
   * 아래와 같이 constructor에서 axios.create() 함수를 사용해서 Axios 인스턴스(this.httpClient)를 만들 수 있음
   */
  constructor() {
    this.httpClient = axios.create({
      baseURL: "https://youtube.googleapis.com/youtube/v3",
      //@ params는 어떤 api든 key를 명시해줘야 한다.
      params: {
        key: process.env.REACT_APP_YOUTUBE_API_KEY,
      },
    });
  }

  async search(keyword) {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }

  async #searchByKeyword(keyword) {
    return (
      // -> get 요청시 두번째 인자로 { params: {}}를 넣어서 요청할 수 있다.
      this.httpClient
        .get("search", {
          params: {
            part: "snippet",
            maxResults: 25,
            type: "video",  // 연관된 비디오 검색시 사용
            q: keyword,
          },
        })
        .then((res) => res.data.items)
        // keyword로 검색한 경우에는 id 포맷을 바꿔줘야 함
        .then((items) =>
          items.map((item) => ({ ...item, id: item.id.videoId }))
        )
    );
  }

  async #mostPopular() {
    return this.httpClient
      .get("videos", {
        params: {
          part: "snippet",
          maxResults: 25,
          chart: "mostPopular",
        },
      })
      .then((res) => res.data.items);
  }
}
