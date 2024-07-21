import { Link } from 'react-router-dom'
import { FaShopify } from 'react-icons/fa'
import { TbPencilPlus } from 'react-icons/tb'

export default function Navbar() {
  return (
    <header>
      <Link to="/">
        <FaShopify />
        <h1>Shoppy</h1>
      </Link>
      <nav>
        <Link to="/products">Products</Link>
        <Link to="/carts">Carts</Link>
        <Link to="/products/new">
          <TbPencilPlus />
        </Link>
      </nav>
      <button>Login</button>
    </header>
  )
}
