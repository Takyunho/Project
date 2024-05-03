import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import VideoCard from "../components/VideoCard";

export default function Videos() {
  // useParams()를 사용하여 검색 키워드 가져오기
  const { keyword } = useParams();
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery({
    queryKey: ["videos", keyword],
    queryFn: async () => {
      console.log("데이터 통신..");
      return fetch(`/videos/${keyword ? "search" : "popular"}.json`)
        .then((res) => res.json())
        .then((data) => data.items);
    },
  });

  // useEffect(() => {
  //   console.log(videos)
  // }, [videos])

  useEffect(() => {
    console.log(keyword)
  }, [keyword])

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
