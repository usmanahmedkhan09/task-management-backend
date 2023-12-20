const { sendResponse } = require('../Utils/utilServices')

const boardServices = require('../Services/boardServices')
const listServices = require('../Services/listsServices')


const addBoard = async (req, res, next) =>
{
    const { name, description, lists } = req.body
    try
    {
        let board = await boardServices.addBoard(name, description)
        if (board && lists && lists.length > 0)
            await Promise.all(lists.map(async (list) => await listServices.addList(list.value, board._id)));

        return sendResponse(res, 201, 'Board successfully created.', board)
    } catch (error)
    {
        return sendResponse(res, 500, 'Error Creating board!', null)
    }
}

const updateBoard = async (req, res, next) =>
{
    const { name, description, lists } = req.body
    const { id } = req.params
    try
    {
        let board = await boardServices.updateBoard(id, name, description)
        if (!board)
            return sendResponse(res, 404, 'Board not found.')


        // Update or add lists
        await Promise.all(lists.map(async (x) =>
        {
            const list = await listServices.getListById(x._id);
            if (list && list._id)
            {
                await listServices.updateList(list._id, x.value, x.boardId);
            } else
            {
                await listServices.addList(x.value, id);
            }
        }));

        return sendResponse(res, 200, 'Board updated successfully!', board)
    } catch (error)
    {
        return sendResponse(res, 500, 'Error Updating board!')
    }
}

const deleteBoardById = async (req, res, next) =>
{
    const { id } = req.params
    try
    {
        let board = await boardServices.getBoardById(id)
        if (!board)
            return sendResponse(res, 404, 'Board not found.')

        const { lists } = board
        if (lists && lists.length > 0)
        {
            await Promise.all(lists.map(async (x) =>
            {
                return await listServices.deleteListById(x._id)
            }))
        }

        const deleteBoard = await boardServices.deleteBoard(id)

        return sendResponse(res, 200, 'Board successfully deleted.', deleteBoard)
    } catch (error)
    {
        return sendResponse(error, 500, 'Error Removing board!.')
    }
}

const getBoardById = async (req, res, next) =>
{
    const { id } = req.params
    try
    {
        const board = await boardServices.getBoardById(id)
        if (!board)
            return sendResponse(res, 404, 'Board not found.')

        return sendResponse(res, 200, 'Board successfully found.', board)
    } catch (error)
    {
        return sendResponse(error, 500, 'Error finding board!.')
    }
}

const getBoards = async (req, res, next) =>
{
    try
    {
        const boards = await boardServices.getBoards()
        if (boards.length == 0)
            return sendResponse(res, 404, 'Boards not found.', [])
        else
            return sendResponse(res, 200, 'Board successfully found.', boards)
    } catch (error)
    {
        console.log(error)
        return sendResponse(error, 500, 'Error finding boards!.')
    }
}

const getUserBoards = async () =>
{
    const { userId } = req.params
    try
    {
        const boards = await boardServices.getUserBoards(userId)
        if (!boards)
            return sendResponse(res, 404, 'Board not found.')

        return sendResponse(res, 200, 'Boards successfully found.', boards)
    } catch (error)
    {
        return sendResponse(error, 500, 'Error finding board!.')
    }
}

module.exports = {
    addBoard,
    updateBoard,
    getBoardById,
    deleteBoardById,
    getUserBoards,
    getBoards
}


