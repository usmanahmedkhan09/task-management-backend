const Lists = require('../Models/listsModel')


const addList = async (name) =>
{
    const list = new Lists({ name: name })
    return await list.save()
}

const getListById = async (id) =>
{
    const list = await Lists.findById(id)
    return list
}

const updateList = async (id, name) =>
{
    const list = await Lists.findOneAndUpdate({ _id: id }, { name: name }, { new: true })
    return list
}

const deleteListById = async (id) =>
{
    const list = await Lists.findByIdAndDelete(id)
    return list
}

module.exports = {
    addList,
    getListById,
    updateList,
    deleteListById
}