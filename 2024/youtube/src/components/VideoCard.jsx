import React from 'react';

export default function VideoCard({ video }) {
  return (
    <>
      <li>{video.snippet.title}</li>
    </>
  );
}

