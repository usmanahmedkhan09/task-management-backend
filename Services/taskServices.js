const Task = require('../Models/tasksModel')

const addTask = async (title, description, listId, subtasks = []) =>
{
    const task = new Task({ title: title, description: description, listId: listId, subtasks: subtasks })
    return task.save()
}

const updateTask = async (id, title, description, listId, subtasks) =>
{
    const task = await Task
        .findOneAndUpdate({ _id: id }, { title: title, description: description, listId: listId, subtasks: subtasks }, { new: true })
        .populate('subtasks', { description: 1, _id: 1 })
        .exec();

    return task
}

const getTaskByList = async (id) =>
{
    const tasks = await Task.find({ listId: id }).populate('subtasks', { description: 1, _id: 1, isComplete: 1 })
    return tasks
}

const deleteTaskById = async (id) =>
{
    let task = await Task.findByIdAndDelete({ _id: id })
    return task
}
module.exports = {
    addTask,
    updateTask,
    getTaskByList,
    deleteTaskById
}