const { sendResponse } = require('../Utils/utilServices')

const listServices = require('../Services/listsServices')

const addList = async (req, res, next) =>
{
    const { name } = req.body
    try
    {
        const list = listServices.addList(name)
        return sendResponse(res, 201, 'List successfully created.', list)
    } catch (error)
    {
        return sendResponse(error, 500, 'Error Creating List!')
    }
}

const updateList = async (req, res, next) =>
{
    const { name } = req.body
    const { id } = req.params
    try
    {
        const list = await listServices.findById(id)
        if (!list)
            return sendResponse(res, 404, 'List not found.')

        list.name = name
        let response = await list.save()
        return sendResponse(res, 200, 'List successfully updated.', response)
    } catch (error)
    {
        return sendResponse(error, 500, 'Error updating list!.')
    }
}

const deleteListById = async (req, res, next) =>
{
    const { id } = req.params ?? req
    try
    {
        let response = await listServices.deleteListById(id)
        if (!response)
            return sendResponse(res, 404, 'List not found.')

        return sendResponse(res, 200, 'List successfully deleted.', response)
    } catch (error)
    {
        return sendResponse(res, 500, 'Error removing list!.')
    }
}

const getListById = async (req, res, next) =>
{
    const { id } = req.params
    try
    {
        const list = await List.findById(id)
        if (!list)
            return sendResponse(res, 404, 'List not found.')

        return sendResponse(res, 200, 'List successfully found.', list)
    } catch (error)
    {
        return sendResponse(error, 500, 'Error finding list!.')
    }
}

const getBoardLists = async (req, res, next) =>
{
    const { id } = req.params
    try
    {
        const lists = await listServices.getBoardLists(id)
        if (!lists.length)
            return sendResponse(res, 404, 'lists not found.', [])

        return sendResponse(res, 200, 'Lists successfully found.', lists)
    } catch (error)
    {
        return sendResponse(error, 500, 'Error finding lists!.')
    }
}

module.exports = {
    addList,
    updateList,
    getListById,
    deleteListById,
    getBoardLists
}


