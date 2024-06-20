import axios from "axios";

//-> 실제 데이터를 받아오는 api (postman 참고)
export default class YoutubeClient {
  constructor() {
    this.httpClient = axios.create({
      baseURL: "https://youtube.googleapis.com/youtube/v3",
      //@ params는 어떤 api든 key를 명시해줘야 한다.
      params: {
        key: process.env.REACT_APP_YOUTUBE_API_KEY,
      },
    });
  }

  async search(params) {
    return this.httpClient.get('search', params);
  }

  async videos(params) {
    return this.httpClient.get('videos', params);
  }

  async channels(params) {
    return this.httpClient.get('channels', params);
  }

}
