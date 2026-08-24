import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
    const BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;
    const { addToCart } = useCart();

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">

            <Link to={`/product/${product.id}`}>
                <img
                    src={`${BASE_URL}${product.image}`}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                />

                <div className="p-4">
                    <h2 className="text-xl font-bold text-gray-800">
                        {product.name}
                    </h2>

                    <p className="text-gray-600 font-medium">
                        ${product.price}
                    </p>
                </div>
            </Link>

        </div>
    );
}

export default ProductCard;