const service = require('../service/index');

const get = async (req, res, next) => {
    try {
        const result = await service.listContacts();
        res.json({
            status: 'success',
            code: 200,
            data: {
                contacts: result,
            }
        })
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const getById = async (req, res, next) => {
    const { contactId } = req.params;
    try {
        const result = await service.getContactById(contactId);
        if (result) {
            res.json({
                status: 'success',
                code: 200,
                data: {
                    contacts: result,
                }
            })
        } else {
            res.json({
                status: 'error',
                code: 404,
                message: `Not found contacts id: ${contactId}`,
                data: 'Not found',
            })
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const create = async (req, res, next) => {
    const { name, email, phone } = req.body
    try {
        const result = await service.addContact({ name, email, phone })
        res.status(201).json({
            status: 'success',
            code: 201,
            data: { contacts: result },
        })
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const update = async (req, res, next) => {
    const { contactId } = req.params
    const { name, email, phone } = req.body
    try {
        const result = await service.updateContact(contactId, { name, email, phone })
        if (result) {
        res.json({
            status: 'success',
            code: 200,
            data: { contacts: result },
        })
        } else {
            res.status(404).json({
                status: 'error',
                code: 404,
                message: `Not found contact id: ${contactId}`,
                data: 'Not Found',
            })
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const remove = async (req, res, next) => {
    const { contactId } = req.params
    try {
        const result = await service.removeContact(contactId)
        if (result) {
        res.json({
            status: 'success',
            code: 200,
            data: { contacts: result },
        })
        } else {
        res.status(404).json({
            status: 'error',
            code: 404,
            message: `Not found contact id: ${contactId}`,
            data: 'Not Found',
        })
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const updateStatus = async (req, res, next) => {
    const { contactId } = req.params;
    const { favorite = false } = req.body;
    try {
    const result = await service.updateStatusContact(contactId, { favorite })
    if (result) {
        res.json({
            status: 'success',
            code: 200,
            data: { task: result },
        })
        } else {
            res.status(404).json({
                status: 'error',
                code: 404,
                message: 'Missing field favorite',
                data: 'Not Found',
            })
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
}

module.exports = {
    get,
    getById,
    create,
    update,
    remove,
    updateStatus,
}
