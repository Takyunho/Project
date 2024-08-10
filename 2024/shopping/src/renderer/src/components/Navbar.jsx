import { Link } from 'react-router-dom'
import { FaShopify } from 'react-icons/fa'
import { TbPencilPlus } from 'react-icons/tb'
import { login, logout, onUserStateChange } from '@renderer/api/firebase'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [user, setUser] = useState() // null or undefined

  useEffect(() => {
    /**
     * login session이 남아 있거나 login을 하면 유효한 user의 값이 전달될 것이고,
     * 로그인 세션이 남아있지 않으면 null이 전달된다.
     * onUserStateChange의 callback으로 전달된 user의 값으로 setUser를 호출한다.
     */
    onUserStateChange(user => {
      setUser(user)
    })
  }, [])

  const handleLogin = () => {
    login().then(setUser) // user => setUser(user)의 축약형
  }
  const handleLogout = () => {
    logout().then(setUser)
  }
  return (
    <header className="flex justify-between border-b border-gray-300 p-2">
      <Link
        to="/"
        className="flex items-center text-4xl text-brand"
      >
        <FaShopify />
        <h1 className="ml-1">Shoppy</h1>
      </Link>
      <nav className="flex items-center gap-4 font-semibold">
        <Link to="/products">Products</Link>
        <Link to="/carts">Carts</Link>
        <Link
          to="/products/new"
          className="text-2xl"
        >
          <TbPencilPlus />
        </Link>
        {!user && <button onClick={handleLogin}>Login</button>}
        {user && <button onClick={handleLogout}>Logout</button>}
      </nav>
    </header>
  )
}
