const Joi = require("joi");

const validateContacts = async (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).optional(),
        email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).optional(),
        phone: Joi.string().optional()
    })

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).json({status: validationResult.error})
    }

    next();
}

module.exports = {
    validateContacts
}