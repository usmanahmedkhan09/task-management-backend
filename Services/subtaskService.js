const SubTask = require('../Models/subTasksModel')

const addSubTask = async (description, isComplete = false) =>
{
    const subtasks = new SubTask({ description: description, isComplete: isComplete })
    return await subtasks.save()
}

const updateSubtask = async (id, description, isComplete) =>
{
    const subtask = await SubTask
        .findOneAndUpdate({ _id: id }, { description: description, isComplete: isComplete }, { new: true })
        .exec();

    return subtask
}

const getSubtaskById = async (id) =>
{
    const subtask = await SubTask.find({ _id: id }).exec()
    return subtask
}

const deleteSubtaskById = async (id) =>
{
    let task = await SubTask.findByIdAndDelete({ _id: id })
    return task
}

module.exports = {
    addSubTask,
    updateSubtask,
    getSubtaskById,
    deleteSubtaskById
}