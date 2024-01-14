const express = require('express');
const router = express.Router();

const { createValidationMiddleware } = require('../Middlewares/validationMiddleware')
const validateTaskInputs = createValidationMiddleware('task')
const validateTaskId = createValidationMiddleware('genericId')

const taskController = require('../Controllers/taskController')

router.post('/addTask', validateTaskInputs, taskController.addTask)

router.put('/updateTask/:id', [validateTaskId, validateTaskInputs], taskController.updateTask)

router.get('/getTaskByList/:id', validateTaskId, taskController.getTaskByList)

router.delete('/deleteTask/:id', validateTaskId, taskController.deleteTaskById)

router.get('/getAllTasks', taskController.getAllTasks)

module.exports = router;