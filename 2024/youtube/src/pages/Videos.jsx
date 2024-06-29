import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import VideoCard from "../components/VideoCard";
import { useYoutubeApi } from "../context/YoutubeApiContext";

export default function Videos() {
  // useParams()를 사용하여 검색 키워드 가져오기
  const { keyword } = useParams();
  //* context를 이용하여 Youtube 클래스 인스턴스를 한번만 생성하고, 가져와서 사용하기
  const { youtube } = useYoutubeApi();
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery({
    queryKey: ["videos", keyword],
    queryFn: () => {
      return youtube.search(keyword);
    },
    staleTime: 1000 * 60 * 1
  });


  return (
    <>
      {/* 단순하게 이미지만 뿌려주는 경우에는 아래와 같이 loading, error처리 필요 없어서 안써도 됨 */}
      {isLoading && <p>Loading...</p>}
      {error && <p>Something is wrong 🌀</p>}
      {videos && <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 gap-y-4 p-2">
        {
          videos.map((video, _) => (
            <VideoCard key={video.id} video={video}></VideoCard>
          ))
        }
      </ul>}
    </>
  );
}
