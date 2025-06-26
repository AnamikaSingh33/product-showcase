import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

function Header() {
     const { cartCount } = useCart();
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">
         MyStore
      </Link>
      <nav className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-600">
          Home
        </Link>
        <Link to="/cart" className="text-gray-700 hover:text-blue-600">
          Cart <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{cartCount}</span>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
