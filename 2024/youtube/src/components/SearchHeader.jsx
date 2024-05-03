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
    <header className='w-full flex p-4 text-2xl border-b border-zinc-600 mb-4'>
      <Link to='/' className='flex items-center mr-2'>
        <BsYoutube className='text-4xl text-brand'/>
        <h1 className='font-bold ml-2 text-3xl'>Youtube</h1>
      </Link>
      <form className='w-full flex justify-center' onSubmit={handleSubmit}>
        <input className='w-7/12 p-2 outline-none bg-black text-gray-50' type="text" placeholder='Search...' value={text} onChange={handleSearch} />
        <button className='bg-zinc-600 px-4'>
          <BsSearch />
        </button>
      </form>
    </header>
  );
}

