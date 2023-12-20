const { body, param } = require('express-validator');

const modelFieldMapping = {
    user: {
        username: { validations: [body('username').notEmpty().withMessage('Username is required')] },
        email: { validations: [body('email').isEmail().withMessage('Please enter a valid email')] }
    },
    board: {
        name: { validations: [body('name').notEmpty().withMessage('Board name is required')] },
        description: { validations: [body('description').isLength({ max: 300 }).withMessage('Description has maximum characters of 300')] },
        lists: { validations: [body('lists').optional().isArray()] }
    },
    list: {
        name: { validations: [body('name').notEmpty().withMessage('List name is required')] },
    },
    genericId: {
        id: { validations: [param("id").notEmpty().withMessage('Id not found.')] }
    },
    task: {
        title: { validations: [body('title').notEmpty().withMessage('Title is required')] },
    }
};

module.exports = modelFieldMapping