import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "../Authentication/AuthContext"; // Import AuthContext

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

// eslint-disable-next-line react/prop-types
export function CartProvider({ children }) {
    const { user } = useContext(AuthContext); // Get user from AuthContext

    const [cart, setCart] = useState([]);
    const [purchaseHistory, setPurchaseHistory] = useState([]);

    // ✅ Load cart & purchase history when user logs in
    useEffect(() => {
        if (user) {
            const savedCart = JSON.parse(localStorage.getItem(`cart_${user.email}`)) || [];
            const savedHistory = JSON.parse(localStorage.getItem(`history_${user.email}`)) || [];
            setCart(savedCart);
            setPurchaseHistory(savedHistory);
        } else {
            // ✅ Reset cart & purchase history when user logs out
            setCart([]);
            setPurchaseHistory([]);
        }
    }, [user]); // Runs when user changes

    // ✅ Save cart & history to localStorage when they change
    useEffect(() => {
        if (user) {
            localStorage.setItem(`cart_${user.email}`, JSON.stringify(cart));
            localStorage.setItem(`history_${user.email}`, JSON.stringify(purchaseHistory));
        }
    }, [cart, purchaseHistory, user]);

    // ✅ Add item to cart
    const addToCart = (product, quantity = 1) => {
        if (!user) {
            alert("You need to log in to add items to the cart.");
            return;
        }
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.id === product.id);
            if (existingProduct) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
                );
            }
            return [...prevCart, { ...product, quantity }];
        });
    };

    // ✅ Remove from cart
    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    // ✅ Update item quantity
    const updateQuantity = (id, quantity) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
            )
        );
    };

    // ✅ Checkout: Move cart items to purchase history
    const checkout = () => {
        if (!user) {
            alert("You need to log in to complete the purchase.");
            return;
        }
        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        const newOrder = {
            orderId: Date.now(),
            date: new Date().toLocaleString(),
            items: cart,
            totalAmount: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
            paymentMethod: "Online",
            status: "Completed"
        };

        setPurchaseHistory((prevHistory) => [...prevHistory, newOrder]);
        setCart([]); // ✅ Clear cart after checkout
    };

    return (
        <CartContext.Provider value={{ cart, setCart, purchaseHistory, addToCart, updateQuantity, removeFromCart, checkout }}>
            {children}
        </CartContext.Provider>
    );
}
