const CreateTaskService = require('../services/CreateTaskService');
const DeleteTaskService = require('../services/DeleteTaskService');
const ListTasksService = require('../services/ListTasksService');

const joinInput = require('../shared/utils/joinInput');
const renderTasks = require('../shared/utils/renderTasks');
const askForConfirmation = require('../shared/utils/askForConfirmation');

const MessageColorEnum = require('../shared/enums/MessageColorEnum');

class TasksController {
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
    };

    async create(description, priorityOption) {
        try {
            const parsedDescription = joinInput(description, ' ');

            const createTask = new CreateTaskService(this.tasksRepository);
            await createTask.execute({
                description: parsedDescription,
                priority: priorityOption,
            });

            console.log(MessageColorEnum.SUCCESS(`New task added successfully.`));
        } catch (error) {
            console.error(MessageColorEnum.ERROR(error.message));
        }
    }

    async delete(id) {
        try {
            const parsedId = parseInt(id);

            if (Number.isNaN(parsedId)) {
                throw new Error('Cannot provide a non-numeric value for the id.');
            }

            const questionMessage = `Are you sure you want to delete the task with id ${parsedId}?`;
            const answer = await askForConfirmation(questionMessage);

            if(answer) {
                const deleteTask = new DeleteTaskService(this.tasksRepository);

                await deleteTask.execute(parsedId)
    
                console.log(MessageColorEnum.SUCCESS('Task deleted successfully.'));
            } else {
                console.log(MessageColorEnum.WARNING('Operation aborted.'));
            }
        } catch (error) {
            console.error(MessageColorEnum.ERROR(error.message));
        }
    }
    
    async index(status, tag) {
        try {
            const listTasks = new ListTasksService(this.tasksRepository);
            const tasks = await listTasks.execute(status, tag);

            renderTasks(tasks, tag);
        } catch (error) {
            console.error(MessageColorEnum.ERROR(error.message));
        }
    }
}

module.exports = TasksController;
