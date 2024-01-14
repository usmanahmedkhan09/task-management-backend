const SubTask = require('../Models/subTasksModel')

const addSubTask = async (subtask, taskId) =>
{
    const subtasks = new SubTask({ description: subtask.value, isComplete: subtask.isComplete, taskId: taskId })
    return await subtasks.save()
}

const updateSubtask = async (subtask, taskId) =>
{
    const response = await SubTask
        .findOneAndUpdate({ _id: subtask._id }, { description: subtask.description, isComplete: subtask.isComplete, taskId: taskId }, { new: true })
        .exec();

    return response
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

const deleteSubtaskByTaskId = async (id) =>
{
    let subtasksIds = await SubTask.deleteMany({ taskId: id })
    return subtasksIds
}

module.exports = {
    addSubTask,
    updateSubtask,
    getSubtaskById,
    deleteSubtaskById,
    deleteSubtaskByTaskId
}