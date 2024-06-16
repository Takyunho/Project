import axios from "axios";

//-> 실제 데이터를 받아오는 api (postman 참고)
export default class Youtube {
  //^ 클라이언트 부분을 외부로부터 주입받아서 코드의 중복 줄이기
  //* 외부(여기서는 context)로부터 디펜던시를 주입받는다.
  constructor(apiClient) {
    this.apiClient = apiClient; // YoutubeClient 인스턴스 혹은 FakeYoutubeClient 인스턴스
    // console.log(this.apiClient);
  }

  //* videos.jsx의 useQuery에서 호출하는 함수가 되겠다!
  async search(keyword) {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }

  async #searchByKeyword(keyword) {
    return (
      this.apiClient
        .search({
          params: {
            part: "snippet",
            maxResults: 25,
            type: "video", // 연관된 비디오 검색시 사용
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
    return this.apiClient
      .videos({
        params: {
          part: "snippet",
          maxResults: 25,
          chart: "mostPopular",
        },
      })
      .then((res) => res.data.items);
  }
}
