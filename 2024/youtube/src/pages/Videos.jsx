import React from 'react';
import { useParams } from 'react-router-dom';

export default function Videos() {
  // useParams()를 사용하여 검색 키워드 가져오기
  const { keyword } = useParams();
  
  return <div>Videos {keyword ? `🔎 ${keyword}` : "키워드 없음"}</div>;
}

