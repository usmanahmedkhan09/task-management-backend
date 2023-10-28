const Board = require('../Models/boardsModel')


const addBoard = async (name, description, lists) =>
{
    const board = new Board({ name: name, description: description, lists: lists })
    return await board.save().then((board) => board.populate('lists', { name: 1, _id: 1 }))
}

const updateBoard = async (id, name, description, lists) =>
{
    const board = await Board
        .findOneAndUpdate({ _id: id }, { name: name, description: description, lists: lists }, { new: true })
        .then((board) => board.populate('lists', { name: 1, _id: 1 }))
    return board
}

const deleteBoard = async (id) =>
{
    let board = await Board.findByIdAndDelete({ _id: id })
    return board
}

const getBoardById = async (id) =>
{
    let board = await Board.findById(id)
    return board
}

const getUserBoards = async (userId) =>
{
    let boards = await Board.aggregate([
        {
            $match: { userId: userId }
        }
    ])
    return boards
}

module.exports = {
    addBoard,
    updateBoard,
    deleteBoard,
    getBoardById,
    getUserBoards
}