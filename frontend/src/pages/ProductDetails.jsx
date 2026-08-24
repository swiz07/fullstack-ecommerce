import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function ProductDetails() {
    const { id } = useParams();
    const BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {addToCart}=useCart();

    useEffect(() => {
        fetch(`${BASE_URL}/store/products/${id}/`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch product details');
                }
                return response.json();
            })
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id, BASE_URL]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!product) {
        return <p>Product not found.</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">

                <h1 className="text-3xl font-bold mb-4">
                    {product.name}
                </h1>

                <p className="text-gray-600 mb-4">
                    {product.description}
                </p>

                <p className="text-2xl font-bold text-green-600 mb-6">
                    ${product.price}
                </p>

                <button
                    onClick={()=> addToCart(product.id)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer"
                >
                    Add to Cart
                </button>
                {/*Home button*/}
                <div className='mt-4'>
                    <a href='/' className='text-blue-600 hover:underline'>
                        &larr; Back to Home
                    </a>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;