import express from 'express'
import User from '../models/user.js'

const router = express.Router()

router.get('/wishlist/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email })
        const cleanWishlist = user?.wishlist?.filter(item => item !== null) || [];
        res.json(cleanWishlist);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch wishlist" })
    }
})

router.post('/wishlist', async (req, res) => {
    const { email, item } = req.body
    try {
        const user = await User.findOne({ email })
        if (user) {
            
            user.wishlist.push(item)
            await user.save()
            res.status(200).json({wishlist: user.wishlist})
        } else {
            res.status(404).json({ error: "User not Found" })
        }
    } catch (err) {
        res.status(500).json({ error: "Failed to add to wishlist" })
    }
})

router.put('/wishlist/remove', async (req, res) => {
    const { email, productId } = req.body;
    
    if (!email || !productId) {
        return res.status(400).json({ 
            error: "Both email and productId are required" 
        });
    }

    try {
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // More robust removal logic
        const initialLength = user.wishlist.length;
        user.wishlist = user.wishlist.filter(item => {
            return item && String(item.productId) !== String(productId);
        });
        
        if (user.wishlist.length === initialLength) {
            return res.status(200).json({ 
                message: "Item not found in wishlist",
                wishlist: user.wishlist 
            });
        }

        await user.save();
        return res.status(200).json({ 
            wishlist: user.wishlist.filter(item => item !== null) 
        });
    } catch (err) {
        console.error("Server error during removal:", err);
        return res.status(500).json({ 
            error: "Failed to remove from wishlist",
            details: err.message 
        });
    }
});

export default router