const express = require('express');
const router = express.Router();

const { createValidationMiddleware } = require('../Middlewares/validationMiddleware')
const validateListInputs = createValidationMiddleware('list')
const validateListId = createValidationMiddleware('genericId')

const listsController = require('../Controllers/listsController')


router.post('/addList', validateListInputs, listsController.addList)

router.put('/updateList/:id', [validateListId, validateListInputs], listsController.updateList)

router.delete('/deleteList/:id', validateListId, listsController.deleteListById)

router.get('/getListById/:id', validateListId, listsController.getListById)

router.get('/getBoardLists/:id', validateListId, listsController.getBoardLists)

module.exports = router;