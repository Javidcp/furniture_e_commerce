import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "../Authentication/AuthContext"; 
import Swal from "sweetalert2";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

// eslint-disable-next-line react/prop-types
export function CartProvider({ children }) {
    const { user } = useContext(AuthContext);

    const [cart, setCart] = useState([]);
    const [purchaseHistory, setPurchaseHistory] = useState([]);

    
    useEffect(() => {
        if (user) {
            const savedCart = JSON.parse(localStorage.getItem(`cart_${user.email}`)) || [];
            const savedHistory = JSON.parse(localStorage.getItem(`history_${user.email}`)) || [];
            setCart(savedCart);
            setPurchaseHistory(savedHistory);
        } else {
            setCart([]);
            setPurchaseHistory([]);
        }
    }, [user]);
    
    useEffect(() => {
        if (user) {
            localStorage.setItem(`cart_${user.email}`, JSON.stringify(cart));
            localStorage.setItem(`history_${user.email}`, JSON.stringify(purchaseHistory));
        }
    }, [cart, purchaseHistory, user]);

    // Add item to cart
    const addToCart = (product, quantity = 1) => {
        if (!user) {
            Swal.fire({
                title: "LogIn",
                text: "You need To LogIn to add items to cart",
                icon: "warning"
            });
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

    
    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    
    const updateQuantity = (id, quantity) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
            )
        );
    };

    
    const checkout = () => {
        if (!user) {
            Swal.fire("LogIn","You need to log in to complete the purchase","warning");
            return;
        }
        if (cart.length === 0) {
            Swal.fire("Empty","Your cart is empty","info");
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
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, setCart, purchaseHistory, addToCart, updateQuantity, removeFromCart, checkout }}>
            {children}
        </CartContext.Provider>
    );
}
