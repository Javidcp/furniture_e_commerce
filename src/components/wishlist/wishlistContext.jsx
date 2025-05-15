import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import api from '../Authentication/api';

const WishlistContext = createContext();

// eslint-disable-next-line react/prop-types
export const WishlistProvider = ({ children, userEmail }) => {
    const [wishlist, setWishlist] = useState([]);

    const fetchWishlist = useCallback(async () => {
        if (!userEmail) return;
        try {
            const res = await api.get(`/users/wishlist/${userEmail}`);
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

        if (!item?.productId) {
            console.error("ProductId is required to add to wishlist");
            return;
        }

        try { 
            await api.post("/users/wishlist", { email: userEmail, wishlist: [item] });
            await fetchWishlist()
        } catch (err) {
            console.error("Add to wishlist error:", err);
        }
    };

    const removeFromWishlist = async (productId) => {
        try {
            const res = await api.put(
                "/users/wishlist/remove",
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
        
        if (isInWishlist(item._id)) {
            removeFromWishlist(item._id)
        } else {
            addToWishlist({
                productId: item._id,
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
