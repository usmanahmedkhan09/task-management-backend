const { sendResponse } = require('../Utils/utilServices')
const taskService = require('../Services/taskServices')
const subTaskService = require('../Services/subtaskService')


const updateSubTask = async (req, res, next) =>
{
    const { description, isComplete } = req.body
    const { id } = req.params
    try
    {
        let subtask = await subTaskService.updateSubtask(id, description, isComplete);
        if (!subtask)
            return sendResponse(res, 404, 'SubTask not found.')

        return sendResponse(res, 200, 'SubTask successfully updated.', subtask)
    } catch (e)
    {
        console.log(e)
    }
}

const deleteSubTaskById = async (req, res, next) =>
{
    const { id } = req.params
    try
    {
        let subtask = await subTaskService.deleteSubtaskById(id)
        if (!subtask)
            return sendResponse(res, 404, 'subTask not found.', [])

        return sendResponse(res, 200, 'subTasks successfully deleted.', subtask)
    } catch (e)
    {
        console.log(e)
    }
}

module.exports = {
    deleteSubTaskById,
    updateSubTask
}