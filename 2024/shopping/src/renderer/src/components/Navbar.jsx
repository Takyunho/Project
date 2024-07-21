import { Link } from 'react-router-dom'
import { FaShopify } from 'react-icons/fa'
import { TbPencilPlus } from 'react-icons/tb'

export default function Navbar() {
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
        <button>Login</button>
      </nav>
    </header>
  )
}
