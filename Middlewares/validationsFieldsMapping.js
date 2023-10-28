const { body, param } = require('express-validator');

const modelFieldMapping = {
    user: {
        username: { validations: [body('username').notEmpty().withMessage('Username is required')] },
        email: { validations: [body('email').isEmail().withMessage('Please enter a valid email')] }
    },
    board: {
        title: { validations: [body('name').notEmpty().withMessage('Board name is required')] },
        description: { validations: [body('description').isLength({ max: 300 }).withMessage('Description has maximum characters of 300')] }
    },
    list: {
        name: { validations: [body('name').notEmpty().withMessage('List name is required')] },
    },
    genericId: {
        id: { validations: [param("id").notEmpty().withMessage('Id not found.')] }
    }
};

module.exports = modelFieldMapping