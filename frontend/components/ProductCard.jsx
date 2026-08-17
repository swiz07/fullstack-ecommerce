function ProductCard({ product }) {
    const BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
                src={`${BASE_URL}${product.image}`}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
            />

            <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
            <p className="text-gray-600 font-medium">${product.price}</p>

        </div>
    )
}

export default ProductCard;