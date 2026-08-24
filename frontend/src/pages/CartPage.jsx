import { useCart } from "../context/CartContext";

function CartPage() {
    const {
        cartItems,
        total,
        removeFromCart,
        updateQuantity,
    } = useCart();

    const BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;

    return (
        <div className="pt-20 min-h-screen bg-gray-100 p-8">

            <h1 className="text-3xl font-bold mb-6 text-center">
                Your Cart
            </h1>

            {cartItems.length === 0 ? (
                <p className="text-center text-gray-600">
                    Your cart is empty
                </p>
            ) : (
                <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">

                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between mb-4 border-b pb-4"
                        >

                            {/* Product image + information */}
                            <div className="flex items-center gap-4">

                                {item.product_image && (
                                    <img
                                        src={`${BASE_URL}${item.product_image}`}
                                        alt={item.product_name}
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                )}

                                <div>
                                    <h2 className="text-lg font-semibold">
                                        {item.product_name}
                                    </h2>

                                    <p className="text-gray-600">
                                        £{Number(item.product_price).toFixed(2)}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        Quantity: {item.quantity}
                                    </p>
                                </div>

                            </div>

                            {/* Quantity controls */}
                            <div className="flex items-center gap-3">

                                <button
                                    className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                                    onClick={() =>
                                        updateQuantity(
                                            item.id,
                                            item.quantity - 1
                                        )
                                    }
                                >
                                    -
                                </button>

                                <span className="font-semibold">
                                    {item.quantity}
                                </span>

                                <button
                                    className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                                    onClick={() =>
                                        updateQuantity(
                                            item.id,
                                            item.quantity + 1
                                        )
                                    }
                                >
                                    +
                                </button>

                                <button
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                                    onClick={() =>
                                        removeFromCart(item.id)
                                    }
                                >
                                    Remove
                                </button>

                            </div>

                        </div>
                    ))}

                    {/* Total */}
                    <div className="flex justify-between items-center mt-6">

                        <h2 className="text-2xl font-bold">
                            Total:
                        </h2>

                        <p className="text-2xl font-bold text-green-600">
                            ${Number(total).toFixed(2)}
                        </p>

                    </div>

                </div>
            )}
        </div>
    );
}

export default CartPage;
