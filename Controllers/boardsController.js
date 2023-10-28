const { sendResponse } = require('../Utils/utilServices')

const boardServices = require('../Services/boardServices')
const listServices = require('../Services/listsServices')
const { response } = require('express')

const addBoard = async (req, res, next) =>
{
    const { name, description, lists } = req.body
    try
    {
        const listIds = await Promise.all(lists.map(async (list) =>
        {
            const listId = await listServices.addList(list.name);
            return listId._id;
        }));
        const board = await boardServices.addBoard(name, description, listIds)
        return sendResponse(res, 201, 'Board successfully created.', board)
    } catch (error)
    {
        return sendResponse(error, 500, 'Error Creating board!')
    }
}

const updateBoard = async (req, res, next) =>
{
    const { name, description, lists } = req.body
    const { id } = req.params
    try
    {
        const updatedLists = await Promise.all(lists.map(async (x) =>
        {
            let response = null
            const list = await listServices.getListById(x._id)
            if (list && list._id)
                response = await listServices.updateList(list._id, x.name)
            else
                response = await listServices.addList(x.name)

            return response._id
        }))
        const board = await boardServices.updateBoard(id, name, description, updatedLists)
        if (!board)
            return sendResponse(res, 404, 'Board not found.')

        return sendResponse(res, 200, 'Board successfully updated.', board)
    } catch (error)
    {
        return sendResponse(error, 500, 'Error Updating board!')
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
        await Promise.all(lists.map(async (x) =>
        {
            return await listServices.deleteListById(x._id)
        }))
        const deleteBoard = boardServices.deleteBoard(id)

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
    getUserBoards
}


