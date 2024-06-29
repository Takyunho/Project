import React from 'react';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import { useQuery } from '@tanstack/react-query';

export default function ChannelInfo({ id, name }) {
  console.log(id, name)
  const { youtube } = useYoutubeApi();  // Youtube 클래스 인스턴스를 가져온다. 가져온 인스턴스로 useQuery를 사용하여 데이터를 가져온다.
  const { error, isLoading, data: url } = useQuery({
    queryKey: ['channel', id],
    queryFn: () => {
      return youtube.channelImageURL(id);
    }
  });


  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something is wrong 🌀</p>}
      {url &&
        <div className='flex my-4 mb-8 items-center'>
          <img className='w-10 h-10 rounded-full' src={url} alt={name} />
          <p className='text-lg font-medium ml-2'>{name}</p>
        </div>
      }
    </>
  );
}

