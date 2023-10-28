const express = require('express');
const router = express.Router();

const { createValidationMiddleware } = require('../Middlewares/validationMiddleware')
const validateBoardInputs = createValidationMiddleware('board')
const validateBoardId = createValidationMiddleware('genericId')

const boardsController = require('../Controllers/boardsController')


router.post('/addBoard', validateBoardInputs, boardsController.addBoard)

router.put('/updateBoard/:id', [validateBoardId, validateBoardInputs], boardsController.updateBoard)

router.delete('/deleteBoard/:id', validateBoardId, boardsController.deleteBoardById)

router.get('/getBoardById/:id', validateBoardId, boardsController.getBoardById)

router.get('/getUserBoards/:id', validateBoardId, boardsController.getUserBoards)

module.exports = router;