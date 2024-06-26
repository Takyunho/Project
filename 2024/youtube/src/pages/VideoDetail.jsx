import React from 'react';
import { useLocation } from 'react-router-dom';
import ChannelInfo from '../components/ChannelInfo';
import RelatedVideos from '../components/RelatedVideos';

export default function VideoDetail() {
  //* VideoCard에서 넘겨준 state를 받아서 사용하기
  const { state: { video } } = useLocation();
  console.log(video)
  const { title, channelId, channelTitle, description } = video.snippet;

  // 채널 썸네일 받아오기

  return (
    <section className='flex flex-col lg:flex-row'>
      <article className='basis-4/6'>
        <iframe
          id="player"
          type="text/html"
          width="100%"
          height="640"
          src={`https://www.youtube.com/embed/${video.id}`}
          title={title}
          // frameBorder="0"  // HTML5에서는 iframe의 frameBorder속성값은 더이상 지원하지 않는다고 한다
        ></iframe>
        <div className='p-4'>
          <h2 className='text-xl font-bold'>{title}</h2>
          <ChannelInfo id={channelId} name={channelTitle}></ChannelInfo>
          {/* pre 태그를 이용해서 여백이나 공백, 스페이스, 엔터가 적절히 렌더링 되도록 한다. */}
          <pre className='whitespace-pre-wrap'>{description}</pre>
        </div>
      </article>
      <section className='basis-2/6'>
        <RelatedVideos id={channelId} />
      </section>
    </section>
  );
}

