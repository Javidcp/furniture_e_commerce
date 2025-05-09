import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "../Authentication/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

export function CartProvider({ children }) {
    const { user } = useContext(AuthContext);
    const [cart, setCart] = useState([]);
    const [purchaseHistory, setPurchaseHistory] = useState([]);

    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:5655/api/user/cart/${user._id}`)
                .then((response) => {
                    setCart(response.data.cart);
                })
                .catch((err) => {
                    console.error("Error fetching cart data: ", err);
                });

            const savedHistory = JSON.parse(localStorage.getItem(`history_${user.email}`)) || [];
            setPurchaseHistory(savedHistory);
        } else {
            setCart([]);
            setPurchaseHistory([]);
        }
    }, [user]);

    useEffect(() => {
        if (user && cart.length > 0) {
            const minimalCart = cart.map(item => ({
                productId: item._id,
                quantity: item.quantity
            }));
    
            axios.put(`http://localhost:5655/api/user/cart/${user._id}`, { cart: minimalCart })
                .then((response) => {
                    console.log("Cart updated successfully:", response.data);
                })
                .catch((err) => {
                    console.error("Error updating cart on server:", err);
                });
        }
    }, [cart, user]);
    

    const addToCart = (product, quantity = 1) => {
        if (!user) {
            Swal.fire({
                title: "LogIn",
                text: "You need to LogIn to add items to cart",
                icon: "warning"
            });
            return;
        }

        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item._id === product._id);

            if (existingProduct) {
                return prevCart.map((item) =>
                    item._id === product._id ? { ...item, quantity: item.quantity + quantity } : item
                );
            }
            return [...prevCart, { ...product, quantity }];
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
        axios.post(`http://localhost:5655/api/user/remove-from-cart`, {
            email: user.email,
            productId
        })
        .then((res) => {
            console.log("Product removed from backend cart:", res.data);
        })
        .catch((err) => {
            console.error("Error removing item from backend cart:", err);
        });
    };

    const updateQuantity = (productId, quantity) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item._id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
            )
        );
    };

    return (
        <CartContext.Provider value={{ cart, setCart, purchaseHistory, setPurchaseHistory, addToCart, updateQuantity, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
}
