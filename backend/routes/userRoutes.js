const express = require('express');
const User = require('../models/userModel');
const authMiddleware = require('../middleware/authMiddleware');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashPassword
        })

        res.status(201).json({
            message: "User registered successfully",
        });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }

        // compare password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }

        // create token
        const token = jwt.sign(
            { id: user._id, role: user.role, },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })

        res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/profile", authMiddleware, async (req, res) => {
    res.json({
        message: "Protected route accessed",
        user: req.user,
    });
});

router.post("/logout", (req, res) => {

    res.clearCookie("token")
    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
})

module.exports = router;