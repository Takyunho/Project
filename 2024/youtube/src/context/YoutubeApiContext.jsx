import { createContext, useContext } from "react";
import Youtube from "../api/youtube";
import FakeYoutube from "../api/fakeYoutube";

export const YoutubeApiContext = createContext();

const youtube = new Youtube() // Youtube 클래스 인스턴스 생성
// const youtube = new FakeYoutube();

export function YoutubeApiProvider({ children }) {
  return <YoutubeApiContext.Provider value={{youtube}}>
    {children}
  </YoutubeApiContext.Provider>
}

export const useYoutubeApi = () => useContext(YoutubeApiContext);