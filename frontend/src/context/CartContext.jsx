import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    // Fetch cart from backend
    const fetchCart = async () => {
        try {
            const res = await fetch(`${BASEURL}/store/cart/`);

            if (!res.ok) {
                throw new Error("Failed to fetch cart");
            }

            const data = await res.json();

            setCartItems(data.items || data.item || []);
            setTotal(Number(data.total_price) || 0);

        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    // Add Product to Cart
    const addToCart = async (productID) => {
        try {
            const res = await fetch(`${BASEURL}/store/cart/add/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    product_id: productID,
                }),
            });

            if (!res.ok) {
                throw new Error("Failed to add product to cart");
            }

            await fetchCart();

        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    // Remove Product from Cart
    const removeFromCart = async (itemId) => {
        try {
            const res = await fetch(`${BASEURL}/store/cart/remove/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    item_id: itemId,
                }),
            });

            if (!res.ok) {
                throw new Error("Failed to remove item from cart");
            }

            await fetchCart();

        } catch (error) {
            console.error("Error removing from cart:", error);
        }
    };

    // Update Product Quantity
    const updateQuantity = async (itemId, quantity) => {
        if (quantity < 1) {
            await removeFromCart(itemId);
            return;
        }

        try {
            const res = await fetch(`${BASEURL}/store/cart/update/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    item_id: itemId,
                    quantity: quantity,
                }),
            });

            if (!res.ok) {
                throw new Error("Failed to update quantity");
            }

            await fetchCart();

        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                total,
                addToCart,
                removeFromCart,
                updateQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
