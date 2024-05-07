import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import VideoCard from "../components/VideoCard";
import { search } from "../api/youtube";
import FakeYoutube from "../api/fakeYoutube";

export default function Videos() {
  // useParams()를 사용하여 검색 키워드 가져오기
  const { keyword } = useParams();
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery({
    queryKey: ["videos", keyword],
    queryFn: () => { 
      const youtube = new FakeYoutube();
      return youtube.search(keyword);
    }
  });


  return (
    <>
      <div>Videos {keyword ? `🔎 ${keyword}` : "키워드 없음"}</div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something is wrong 🌀</p>}
      {videos && <ul>
        {
          videos.map((video, _) => (
            <VideoCard key={video.id} video={video}></VideoCard>
          ))
        }
      </ul>}
    </>
  );
}
