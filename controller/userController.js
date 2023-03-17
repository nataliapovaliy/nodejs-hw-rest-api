const User = require('../service/schemas/user');
const HttpError = require('../utils/httpError');
const bcrypt = require('bcrypt');

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
        next();
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const candidate = await User.findOne({ email });
        if (!candidate || !bcrypt.compareSync(password, candidate.password)) {
            throw new HttpError(401, 'Wrong credentials')
        }

        
    } catch (error) {
        
    }
}

const logout = async (req, res, next) => {
    try {

    } catch (error) {
        
    }
}

module.exports = {
    register,
    login,
    logout
}