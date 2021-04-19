const CreateTaskService = require('../services/CreateTaskService');
const DeleteTaskService = require('../services/DeleteTaskService');
const ListTasksService = require('../services/ListTasksService');

const selectObjectProperties = require('../shared/utils/selectObjectProperties');
const joinInput = require('../shared/utils/joinInput');
const createTable = require('../shared/utils/createTable');
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
            const task = await createTask.execute({
                description: parsedDescription,
                priority: priorityOption,
            });
            const properties = ['id', 'description', 'status'];
            const selectedTask = selectObjectProperties(properties, task);

            const table = createTable(properties, [selectedTask]);
            console.log(table);
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

                const task = await deleteTask.execute(parsedId)
    
                const properties = ['id', 'description', 'age', 'status'];
                const selectedTask = selectObjectProperties(properties, task);
    
                const table = createTable(properties, [selectedTask]);
                console.log(table);
                console.log(MessageColorEnum.SUCCESS('Task deleted successfully.'));
            } else {
                console.log(MessageColorEnum.WARNING('Operation aborted.'));
            }
        } catch (error) {
            console.error(MessageColorEnum.ERROR(error.message));
        }
    }
    
    async index(showAllOption) {
        try {
            const showAll = showAllOption ? true : false;
            const listTasks = new ListTasksService(this.tasksRepository);
            const tasks = await listTasks.execute(showAll);

            const properties = ['id', 'description', 'age', 'priority', 'status'];
            const mappedTasks = tasks.map(task => {
                const selectedTask = selectObjectProperties(properties, task);
                return selectedTask;
            });

            const table = createTable(properties, mappedTasks);
            console.log(table);
            console.log(MessageColorEnum.SUCCESS(`${mappedTasks.length} ${mappedTasks.length !== 1 ? 'tasks were' : 'task was'} displayed successfully.`));
        } catch (error) {
            console.error(MessageColorEnum.ERROR(error.message));
        }
    }
}

module.exports = TasksController;
