const Board = require('../Models/boardsModel')


const addBoard = async (name, description, lists = []) =>
{
    const board = new Board({ name: name, description: description, lists: lists })
    return await board.save()
}

const updateBoard = async (id, name, description, lists = []) =>
{

    const board = await Board
        .findOneAndUpdate({ _id: id }, { name: name, description: description, }, { new: true })
        .exec();

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

const getBoards = async () =>
{
    let boards = await Board.find({}).populate('lists').exec()
    return boards;
}

module.exports = {
    addBoard,
    updateBoard,
    deleteBoard,
    getBoardById,
    getUserBoards,
    getBoards
}