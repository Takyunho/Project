import React from 'react';
import { useYoutubeApi } from "../context/YoutubeApiContext";
import { useQuery } from "@tanstack/react-query";
import VideoCard from './VideoCard';

export default function RelatedVideos({ id }) {
  const { youtube } = useYoutubeApi();
  const { error, isLoading, data: relatedVideos } = useQuery({
    queryKey: ['relatedVideos', id],
    queryFn: () => {
      return youtube.relatedVideos(id);
    }
  })


  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something is wrong 🌀</p>}
      {relatedVideos && (
        <ul className="">
          {relatedVideos.map((video, _) => (
            <VideoCard key={video.id} video={video} type={'list'}></VideoCard>
          ))}
        </ul>
      )}
    </>
  );
}

