const { sendResponse } = require('../Utils/utilServices')
const taskService = require('../Services/taskServices')
const subTaskService = require('../Services/subtaskService')
const Subtask = require('../Models/subTasksModel')

const addTask = async (req, res, next) =>
{
    try
    {
        const { title, description, listId, subtasks } = req.body
        const subtaskDocuments = subtasks.map(subtaskData => new Subtask(subtaskData));
        let subtaskIds = await Subtask.insertMany(subtaskDocuments)
        let task = await taskService.addTask(title, description, listId._id, subtaskIds);
        return sendResponse(res, 201, 'Task Successfully Created.', task)
    } catch (e)
    {
        console.log(e)
    }
}

const updateTask = async (req, res, next) =>
{
    const { title, description, listId, subtasks } = req.body
    const { id } = req.params
    try
    {
        let updatedSubtasks = []
        if (subtasks && subtasks.length > 0)
        {
            updatedSubtasks = await Promise.all(subtasks.map(async (subtaskData) =>
            {
                let response = null;
                const existingSubtask = await subTaskService.getSubtaskById(subtaskData._id);

                if (existingSubtask && existingSubtask._id)
                    response = await subTaskService.updateSubtask(existingSubtask._id, subtaskData.description, subtaskData.isComplete);
                else
                    response = await subTaskService.addSubTask(subtaskData.description, subtaskData.isComplete);

                return response._id;
            }));
        }

        let task = await taskService.updateTask(id, title, description, listId, updatedSubtasks);
        if (!task)
            return sendResponse(res, 404, 'Task not found.')

        return sendResponse(res, 200, 'Task successfully updated.', task)
    } catch (e)
    {
        console.log(e)
    }
}


const getTaskByList = async (req, res, next) =>
{
    const { id } = req.params
    try
    {
        let tasks = await taskService.getTaskByList(id)
        if (!tasks)
            return sendResponse(res, 404, 'Task not found.', [])

        return sendResponse(res, 200, 'Tasks successfully Found.', tasks)
    } catch (e)
    {
        console.log(e)
    }
}

const deleteTaskById = async (req, res, next) =>
{
    const { id } = req.params
    try
    {
        let task = await taskService.deleteTaskById(id)
        if (!task)
            return sendResponse(res, 404, 'Task not found.', [])

        return sendResponse(res, 200, 'Tasks successfully deleted.', task)
    } catch (e)
    {
        console.log(e)
    }
}
module.exports = {
    addTask,
    updateTask,
    getTaskByList,
    deleteTaskById
}