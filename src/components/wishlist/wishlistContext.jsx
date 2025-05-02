import axios from 'axios';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children, userEmail }) => {
    const [wishlist, setWishlist] = useState([]);

    const fetchWishlist = useCallback(async () => {
        if (!userEmail) return;
        try {
            const res = await axios.get(`http://localhost:5655/users/wishlist/${userEmail}`);
            setWishlist(res.data);
        } catch (err) {
            console.error("Fetch wishlist error", err);
        }
    }, [userEmail]);
    

    useEffect(() => {
        
        if (userEmail) {
            fetchWishlist();
        } else {
            setWishlist([]);
        }
    }, [userEmail, fetchWishlist]);
    

    const addToWishlist = async (item) => {
        try { 
            await axios.post("http://localhost:5655/users/wishlist", { email: userEmail, item });
            await fetchWishlist()
        } catch (err) {
            console.error("Add to wishlist error:", err);
        }
    };

    const removeFromWishlist = async (productId) => {
        try {
            const res = await axios.put(
                "http://localhost:5655/users/wishlist/remove",
                { 
                    email: userEmail, 
                    productId: String(productId) 
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            setWishlist(res.data.wishlist || []);
        } catch (err) {
            console.error("Detailed remove error:", {
                message: err.message,
                response: err.response?.data,
                config: err.config
            });
        }
    };

    const isInWishlist = (productId) => {
        const idStr = String(productId);
        return wishlist.some(item => {
            const itemId = String(item?.productId || item?._id);
            return itemId === idStr;
        });
    };
    
    
    const toggleWishlist = (item) => {
        const id = item.productId || item._id
        if (isInWishlist(id)) {
            removeFromWishlist(id)
        } else {
            addToWishlist({
                productId: id,
                shortname: item.shortname,
                name: item.name,
                image: item.image,
                price: item.price,
                oldprice: item.oldprice,
                category: item.category
            })
        }
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, toggleWishlist, isInWishlist }}>
        {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);
