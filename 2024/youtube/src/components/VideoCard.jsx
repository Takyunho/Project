import React from "react";
import { formatAgo } from "../util/date";
import { useNavigate } from "react-router-dom";

export default function VideoCard({ video, type }) {
  const { title, thumbnails, channelTitle, publishedAt } = video.snippet;
  const navigate = useNavigate();
  const isList = type === "list";
  return (
    <>
      {/* 첫번째 인자에서 /videos로 해야 함(절대 경로로 해야 함) videos로 하게 되면 현재 경로에서 경로가 추가되어, 경로가 이상해지면서 Not found 뜸 */}
      {/* navigate의 두번째 인자로  */}
      <li
        className={isList ? "flex gap-2 m-2" : ""}
        onClick={() =>
          navigate(`/videos/watch/${video.id}`, { state: { video } })
        }
      >
        <img
          className={isList ? "w-60 mr-2" : "w-full"}
          src={thumbnails.medium.url}
          alt={title}
        />
        <div>
          <p className="font-semibold my-2 line-clamp-2">{title}</p>
          <p className="text-sm opacity-80">{channelTitle}</p>
          {/* timeago.js 를 이용해서 쉽게 구현 가능 */}
          <p className="text-sm opacity-80">{formatAgo(publishedAt, "ko")}</p>
        </div>
      </li>
    </>
  );
}
