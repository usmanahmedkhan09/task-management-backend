const Task = require('../Models/tasksModel')

const addTask = async (title, description, listId) =>
{
    const task = new Task({ title: title, description: description, listId: listId })
    return task.save()
}

const updateTask = async (id, title, description, listId,) =>
{
    const task = await Task
        .findOneAndUpdate({ _id: id }, { title: title, description: description, listId: listId }, { new: true })
        .exec();

    return task
}

const getTaskByList = async (id) =>
{
    const tasks = await Task.find({ listId: id }).populate('subtasks').exec()
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