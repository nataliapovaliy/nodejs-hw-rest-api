const User = require('../service/schemas/user');
const HttpError = require('../utils/httpError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

        const user = await User.create({ email, password: hashedPassword });

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

module.exports = {
    register,
    login,
    logout,
    current
}