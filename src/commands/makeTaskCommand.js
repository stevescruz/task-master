const { Command, Option } = require('commander');

const { makeTasksRepository } = require('../repositories/makeTasksRepository');

const CreateTaskService = require('../services/CreateTaskService');
const DeleteTaskService = require('../services/DeleteTaskService');
const FinalizeTaskService = require('../services/FinalizeTaskService');
const ListTasksService = require('../services/ListTasksService');
const ShowNextTasksService = require('../services/ShowNextTasksService');

const joinInput = require('../shared/utils/joinInput');
const selectObjectProperties = require('../shared/utils/selectObjectProperties');
const getTimeSince = require('../shared/utils/getTimeSince');
const createTable = require('../shared/utils/createTable');

const MessageColorEnum = require('../shared/enums/MessageColorEnum');
const AllowedChoicesTaskEnum = require('../shared/enums/AllowedChoicesTaskEnum');

async function makeTaskCommand() {
    const taskCommand = new Command('task');
    const tasksRepository = await makeTasksRepository();

    taskCommand
        .description('create, remove or list existing tasks.', {
            subcommand: 'add, delete, done or list'
        })
        .arguments('<subcommand>')
        .usage('task list');

    taskCommand
        .command('add <description...>')
        .addOption(new Option('-p, --priority <value>', "Set a task's priority to low, normal or high")
            .choices(AllowedChoicesTaskEnum.PRIORITIES)
            .default('N')
        )
        .action(async (description, options) => {
            try {
                const parsedDescription = joinInput(description, ' ');
                const createTask = new CreateTaskService(tasksRepository);
                const task = await createTask.execute({
                    description: parsedDescription,
                    priority: options.priority,
                });
                const properties = ['description', 'status'];
                const selectedTask = selectObjectProperties(properties, task);

                const table = createTable(properties, [selectedTask]);
                console.log(table.toString());
                console.log(MessageColorEnum.SUCCESS(`New task added successfully.`));
            } catch (error) {
                console.error(MessageColorEnum.ERROR(error.message));
            }
        });

    taskCommand
        .command('delete <id>')
        .action(async (id) => {
            try {
                const parsedId = parseInt(id);

                if (Number.isNaN(parsedId)) {
                    throw new Error('Cannot provide a non-numeric value for the id.');
                }

                const deleteTask = new DeleteTaskService(tasksRepository);

                const task = await deleteTask.execute(parsedId)

                const properties = ['description', 'age', 'status'];
                const selectedTask = selectObjectProperties(properties, task);

                const table = createTable(properties, [selectedTask]);
                console.log(table.toString());
                console.log(MessageColorEnum.SUCCESS('Task deleted successfully.'));
            } catch (error) {
                console.error(MessageColorEnum.ERROR(error.message));
            }
        });

    taskCommand
        .command('done <id>')
        .action(async (id) => {
            try {
                const parsedId = parseInt(id);

                if (Number.isNaN(parsedId)) {
                    throw new Error('Cannot provide a non-numeric value for the id.');
                }

                const finalizeTask = new FinalizeTaskService(tasksRepository);
                const task = await finalizeTask.execute(parsedId);

                const properties = ['description', 'age', 'status'];
                const filteredTask = selectObjectProperties(properties, task);
                filteredTask.age = getTimeSince(task.age);

                const table = createTable(properties, [filteredTask]);
                console.log(table.toString());
                console.log(MessageColorEnum.SUCCESS("Task's status marked as done successfully."));
            } catch (error) {
                console.error(MessageColorEnum.ERROR(error.message));
            }
        });

    taskCommand
        .command('list', { isDefault: true })
        .description('list all pending tasks')
        .option('-a, --all', 'list all existing tasks, including those that are pending', false)
        .action(async (options) => {
            try {
                const showAll = options.all ? true : false;
                const listTasks = new ListTasksService(tasksRepository);
                const tasks = await listTasks.execute(showAll);

                const properties = ['description', 'age', 'priority', 'status'];
                const mappedTasks = tasks.map(task => {
                    const selectedTask = selectObjectProperties(properties, task);
                    return selectedTask;
                });

                const table = createTable(properties, mappedTasks);
                console.log(table.toString());
                console.log(MessageColorEnum.SUCCESS(`${mappedTasks.length} ${mappedTasks.length !== 1 ? 'tasks were' : 'task was'} displayed successfully.`));
            } catch (error) {
                console.error(MessageColorEnum.ERROR(error.message));
            }
        })

    taskCommand
        .command('next')
        .description('list the next pending task')
        .action(async () => {
            try {
                const showNextTasks = new ShowNextTasksService(tasksRepository);
                const nextTasks = await showNextTasks.execute();
                const properties = ['description', 'age', 'status'];

                if (nextTasks === null) {
                    console.log(MessageColorEnum.SUCCESS('All tasks have already been done! ✅'))
                } else {
                    let priority;
                    const messageColors = {
                        'L': MessageColorEnum.LOW_PRIORITY,
                        'N': MessageColorEnum.NORMAL_PRIORITY,
                        'H': MessageColorEnum.HIGH_PRIORITY,
                    };
                    const messages = {
                        'L': 'LOW priority task',
                        'N': 'NORMAL priority task',
                        'H': '⚠ HIGH priority task',
                    };

                    const priorities = ['H', 'N', 'L'];

                    priorities.forEach(priority => {
                        if (priority in nextTasks) {
                            console.log(messageColors[priority](messages[priority]));

                            const selectedTask = selectObjectProperties(['description', 'age', 'status'], nextTasks[priority]);

                            const table = createTable(properties, [selectedTask]);
                            console.log(table.toString());
                        }
                    });
                }
            } catch (error) {
                console.error(MessageColorEnum.ERROR(error.message));
            }
        });

    return taskCommand;
}

module.exports = { makeTaskCommand };