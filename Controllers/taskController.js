const { sendResponse } = require('../Utils/utilServices')
const taskService = require('../Services/taskServices')
const subTaskService = require('../Services/subtaskService')
const Subtask = require('../Models/subTasksModel')

const addTask = async (req, res, next) =>
{
    try
    {
        const { title, description, listId, subtasks } = req.body
        let task = await taskService.addTask(title, description, listId);
        if (task && subtasks.length > 0)
            await Promise.all(subtasks.map(async (subtask) => await subTaskService.addSubTask(subtask, task._id)));

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
        let task = await taskService.updateTask(id, title, description, listId);
        if (!task)
            return sendResponse(res, 404, 'Task not found.')

        await Promise.all(subtasks.map(async (subtask) =>
        {
            if (subtask && subtask._id)
                await subTaskService.updateSubtask(subtask, task._id);
            else
                await subTaskService.addSubTask(subtask, task._id)

        }));

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
        await subTaskService.deleteSubtaskByTaskId(id)
        let task = await taskService.deleteTaskById(id)
        if (!task)
            return sendResponse(res, 404, 'Task not found.', [])

        return sendResponse(res, 200, 'Tasks successfully deleted.', task)
    } catch (e)
    {
        console.log(e)
    }
}

const getAllTasks = async (req, res, next) =>
{

    try
    {
        let tasks = await taskService.getAllTasks()
        if (!tasks)
            return sendResponse(res, 404, 'Tasks not found.', [])

        return sendResponse(res, 200, 'Tasks successfully deleted.', tasks)
    } catch (e)
    {
        console.log(e)
    }
}

module.exports = {
    addTask,
    updateTask,
    getTaskByList,
    deleteTaskById,
    getAllTasks
}