import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useCart} from "../context/CartContext";

function CheckoutPage() {
    const BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;
    const navigate = useNavigate();
    const {clearCart} = useCart();

    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone: "",
        payment_method: "COD",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try{
            const res=await fetch(`${BASE_URL}/store/orders/create/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (res.ok) {
                setMessage("Order placed successfully!");
                fetch(`${BASE_URL}/store/cart/`);
                clearCart();
                setTimeout(() => {
                    navigate("/");
                }, 3000);
            } else {
                setMessage(data.error || "Failed to place order.");
            }
        } catch (error) {
            setMessage("An error occurred while placing the order.");
        } 
    }

    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white p-8 rounded-2xl shadow-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-lg p-2"
                />
                <textarea
                    name="address"
                    placeholder="Full Address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg p-2"
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg p-2"
                />
                <select
                    name="payment_method"
                    value={formData.payment_method}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2"
                >
                    <option value="COD">Cash on Delivery</option>
                    <option value="CARD">Online Payment</option>
                </select>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    {loading ? "Processing..." : "Place Order"}
                </button>
                {message && <p className="text-center text-green-700 font-semibold mt-4">{message}</p>}
                </form>
            </div>
        </div>
    )
}

export default CheckoutPage;