import React, { useEffect, useState } from 'react';
import { BsYoutube, BsSearch } from "react-icons/bs";
import { useNavigate, Link, useParams } from 'react-router-dom';

export default function SearchHeader() {
  const { keyword } = useParams();  // keyword는 index.js에서 설정한 path의 파라미터
  const navigate = useNavigate();
  const [text, setText] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setText(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/videos/${text}`); // 검색한 경로로 이동
  }

  //@ keyword가 변경될 때마다 text에 keyword를 설정
  useEffect(() => {
    setText(keyword || ''); // keyword가 있으면 text에 keyword를 설정, 없으면 빈 값
    
  }, [keyword])
  
  return (
    <header>
      <Link to='/'>
        <BsYoutube />
        <h1>Youtube</h1>
      </Link>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Search...' value={text} onChange={handleSearch} />
        <button>
          <BsSearch />
        </button>
      </form>
    </header>
  );
}

