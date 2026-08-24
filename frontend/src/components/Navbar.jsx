import {Link} from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

function Navbar() {
    const { cartItems } = useCart();
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
                My Store
            </Link> 
            <Link to="/cart" className="text-gray-800 hover:text-gray-600 font-medium">
                Cart 
                {cartCount >0 &&(
                    <span className="ml-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                        {cartCount}
                    </span>
                )}
            </Link>
        </nav>
    )
}
export default Navbar