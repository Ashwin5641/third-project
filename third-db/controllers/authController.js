const authModel = require('../models/authModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');

exports.signup = async (req, res) => {
    const {name, email, password} = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'fill all the missing fields'
        })
    }

    try {
        const existing = await authModel.findByEmail(email);

        if (existing) {
            return res.status(409).json({
                success: false,
                message: 'user already exists'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await authModel.create(name, email, hashedPassword);

        return res.status(201).json({
            success: true,
            message: 'signup successful!'
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'internal server error'
        })
    }
}

exports.login = async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'fill all the missing fields'
        })
    }

    try {
        const existing = await authModel.findByEmail(email);

        if (!existing) {
            return res.status(404).json({
                success: false,
                message: 'user not found'
            })
        }

        const match = await bcrypt.compare(password, existing.password);

        if (!match) {
            return res.status(401).json({
                success: false,
                message: 'invalid credentials'
            })
        }

        const accessToken = generateAccessToken(existing);
        const refreshToken = generateRefreshToken(existing);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            success: true,
            message: 'login successful!',
            token: accessToken,
            user: {
                id: existing.id,
                name: existing.name,
                email: existing.email,
                role: existing.role
            }
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'internal server error'
        })
    }
}

exports.refresh = async (req, res) => {
    const token = req.cookies.refreshToken;

    if (!token) {
        return res.status(401).json({
            message: 'No token'
        })
    }

    try {
        const payload = jwt.verify(token, process.env.REFRESH_SECRET);

        const user = await authModel.findById(payload.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newAccessToken = generateAccessToken(user);

        return res.status(200).json({
            token: newAccessToken
        });
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
}

exports.logout = async (req, res) => {
    res.clearCookie('refreshToken');
    return res.status(200).json({
        success: true
    });
}