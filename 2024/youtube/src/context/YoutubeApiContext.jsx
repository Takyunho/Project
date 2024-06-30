import { createContext, useContext } from "react";
import Youtube from "../api/youtube";
import YoutubeClient from "../api/youtubeClient"; //^ 실제 데이터용
// import FakeYoutubeClient from "../api/fakeYoutubeClient"; //^ 테스트용 

export const YoutubeApiContext = createContext();

const client = new YoutubeClient(); //^ 실제 데이터를 받아오는 인스턴스
// const client = new FakeYoutubeClient(); //^ 테스트용 데이터를 받아오는 인스턴스
const youtube = new Youtube(client);

export function YoutubeApiProvider({ children }) {
  return <YoutubeApiContext.Provider value={{youtube}}>
    {children}
  </YoutubeApiContext.Provider>
}

export const useYoutubeApi = () => useContext(YoutubeApiContext);