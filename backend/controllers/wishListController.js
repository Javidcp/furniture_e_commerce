import User from '../models/user.js';
import mongoose from 'mongoose';

export const getWishList = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.params.email })
        if (!user) return res.status(404).json({ error: "User not found" });

        const cleanWishlist = user?.wishlist?.filter(item => item !== null) || [];
        res.json(cleanWishlist);
    } catch (err) {
        next(err);
    }
}

export const addToWishList = async (req, res, next) => {
    const { email, wishlist } = req.body

    if (!wishlist || !Array.isArray(wishlist)) {
        return res.status(400).json({ error: "Wishlist array is required" });
    }
    
    try {
        const user = await User.findOne({ email })
        if (!user) return res.status(404).json({ error: "User not found" });
        
        const newItems = wishlist.map(item => ({
            ...item,
            productId: new mongoose.Types.ObjectId(item.productId)
        }));

        user.wishlist.push(...newItems)
        await user.save()
        res.status(200).json({wishlist: user.wishlist})
    } catch (err) {
        next(err);
    }
}


export const removeFromWishlist = async (req, res, next) => {
    const { email, productId } = req.body;
    
    if (!email || !productId) {
        return res.status(400).json({ 
            error: "Both email and productId are required" 
        });
    }

    try {
        const user = await User.findOne({ email });
        
        if (!user) return res.status(404).json({ error: "User not found" });
        
        const initialLength = user.wishlist.length;

        user.wishlist = user.wishlist.filter(
            item => item && String(item.productId) !== String(productId)
        );
        
        if (user.wishlist.length === initialLength) {
            return res.status(200).json({ 
                message: "Item not found in wishlist",
                wishlist: user.wishlist 
            });
        }

        await user.save();
        res.status(200).json({ 
            message: "Item removed",
            wishlist: user.wishlist 
        });
    } catch (err) {
        next(err)
    }
}