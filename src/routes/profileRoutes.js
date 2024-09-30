const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Ensure this path is correct
const User = require('../models/User');

router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password -otp'); // Exclude password and OTP fields
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, user });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;