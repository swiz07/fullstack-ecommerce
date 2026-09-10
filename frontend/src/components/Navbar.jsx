import {Link, useNavigate} from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import {clearToken, getAccessToken} from '../utils/auth.js'

function Navbar() {
    const navigate = useNavigate();
    const { cartItems } = useCart();
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    const isLoggedIn = !!getAccessToken();

    const handleLogout = () => {
        clearToken();
        navigate("/login");
    };

    return (
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
                Cartora
            </Link> 

            <div className="flex space-x-4 gap-6">
             {/*Login/Sign or logout*/}
             {!isLoggedIn ? (
                <>
                    <Link to="/login" className="text-gray-800 hover:text-gray-600 font-medium">
                        Login
                    </Link>
                    <Link to="/signup" className="text-gray-800 hover:text-gray-600 font-medium">
                        Signup
                    </Link>
                </>
            ) : (
                <button onClick={handleLogout} className="text-gray-800 hover:text-gray-600 font-medium">
                    Logout
                </button>
            )}
            </div>

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