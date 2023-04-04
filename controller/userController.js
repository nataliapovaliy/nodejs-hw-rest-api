const User = require('../service/schemas/user');
const HttpError = require('../utils/httpError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require("gravatar");
const path = require('path');
const fs = require('fs/promises');
require('dotenv').config();

const register = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const candidate = await User.findOne({ email })
        
        if (candidate) {
            throw new HttpError(409, 'User with this email already exists');
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const avatarURL = gravatar.url(email);
        const user = await User.create({ email, password: hashedPassword, avatarURL });

        res.status(200).json({ user });
    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const candidate = await User.findOne({ email });
        if (!candidate || !bcrypt.compareSync(password, candidate.password)) {
            throw new HttpError(401, 'Wrong credentials')
        }

        const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
        const token = jwt.sign({ id: candidate._id, email: candidate.email }, JWT_SECRET_KEY, { expiresIn: '1h' });
        
        await User.findOneAndUpdate({ email }, { token });

        res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
}

const logout = async (req, res, next) => {
    try {
        const { user } = req;
        await User.findOneAndUpdate({ _id: user.id }, { token: null });
        res.status(204).json({ message: "ok" });
    } catch (error) {
        next(error);
    }
}

const current = async (req, res, next) => {
    try {
        const { user } = req;
        await User.findOne({ token: user.token });

        res.status(200).json({
            data: { email: user.email, subscription: user.subscription },
        });
    } catch (error) {
        next(error);
    }
}

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const updateAvatar = async (req, res) => {
    const { path: tempUpload, originalname } = req.file;
    const { _id: id } = req.user;
    const imageName = `${id}_${originalname}`;
    try {        
        const resultUpload = path.join(avatarsDir, imageName);
        await fs.rename(tempUpload, resultUpload);
        const avatarUrl = path.join("public", "avatars", imageName);
        await User.findByIdAndUpdate(req.user._id, { avatarUrl });
        res.json({ avatarUrl });
    } catch (error) {
        await fs.unlink(tempUpload);
        throw error;
    }
}

module.exports = {
    register,
    login,
    logout,
    current,
    updateAvatar
}