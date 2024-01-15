const express = require('express');
const router = express.Router();

const { createValidationMiddleware } = require('../Middlewares/validationMiddleware')
const validateSubTaskId = createValidationMiddleware('genericId')
const subtTasksController = require('../Controllers/subTaskController')


router.delete('/deleteSubtask/:id', validateSubTaskId, subtTasksController.deleteSubTaskById)

module.exports = router;