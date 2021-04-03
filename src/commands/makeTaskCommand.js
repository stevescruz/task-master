const { Command, Option } = require('commander');

const { makeTasksRepository } = require('../repositories/makeTasksRepository');

const CreateTaskService = require('../services/CreateTaskService');

const joinInput = require('../shared/utils/joinInput');
const selectObjectProperties = require('../shared/utils/selectObjectProperties');
const getTimeSince = require('../shared/utils/getTimeSince');
const createTable = require('../shared/utils/createTable');
const MessageColorEnum = require('../shared/enums/MessageColorEnum');

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
            .choices(['L', 'N', 'H'])
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

                const task = await tasksRepository.removeTaskById(parsedId);

                if (task) {
                    const properties = ['description', 'age', 'status'];
                    const filteredTask = selectObjectProperties(properties, task);
                    filteredTask.age = getTimeSince(task.age);

                    const table = createTable(properties, [filteredTask]);
                    console.log(table.toString());
                    console.log(MessageColorEnum.SUCCESS('Task deleted successfully.'));
                } else {
                    throw new Error(`A task with the id {${parsedId}} does not exist.`);
                }
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

                const task = await tasksRepository.updateTaskById(parsedId, { status: 'done' });

                if (task) {
                    const properties = ['description', 'age', 'status'];
                    const filteredTask = selectObjectProperties(properties, task);
                    filteredTask.age = getTimeSince(task.age);

                    const table = createTable(properties, [filteredTask]);
                    console.log(table.toString());
                    console.log(MessageColorEnum.SUCCESS("Task's status marked as done successfully."));
                } else {
                    throw new Error(`A task with the id {${parsedId}} does not exist.`);
                }
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
                const tasks = await tasksRepository.listTasks();
                const properties = ['description', 'age', 'priority', 'status'];
                const mappedTasks = tasks.map(task => {
                    const selectedTask = selectObjectProperties(properties, task);
                    selectedTask.age = getTimeSince(task.age);
                    return selectedTask;
                });

                if (options.all === true) {
                    const table = createTable(properties, mappedTasks);
                    console.log(table.toString());
                    console.log(MessageColorEnum.SUCCESS(`${mappedTasks.length} ${mappedTasks.length !== 1 ? 'tasks were' : 'task was'} displayed successfully.`));
                } else {
                    const filteredTasks = mappedTasks.filter(task => task.status !== 'done');

                    const table = createTable(properties, filteredTasks);
                    console.log(table.toString());
                    console.log(MessageColorEnum.SUCCESS(`${filteredTasks.length} ${filteredTasks.length !== 1 ? 'tasks were' : 'task was'} displayed successfully.`));
                }

            } catch (error) {
                console.error(MessageColorEnum.ERROR(error.message));
            }
        })

    taskCommand
        .command('next')
        .description('list the next pending task')
        .action(async () => {
            try {
                const tasks = await tasksRepository.listTasks();
                const properties = ['description', 'age', 'status'];

                const nextTasks = tasks.reduce((acc, task) => {
                    if (!('H' in acc) && task.priority === 'H' && task.status !== 'done') {
                        acc['H'] = task;
                        return acc;
                    }

                    if (!('N' in acc) && task.priority === 'N' && task.status !== 'done') {
                        acc['N'] = task;
                        return acc;
                    }

                    if (!('L' in acc) && task.priority === 'L' && task.status !== 'done') {
                        acc['L'] = task;
                        return acc;
                    }
                    return acc;
                }, {});

                if ('H' in nextTasks) {
                    console.log(MessageColorEnum.HIGH_PRIORITY('Next HIGH priority task:'));
                    const selectedTask = selectObjectProperties(['description', 'age', 'status'], nextTasks.H);
                    selectedTask.age = getTimeSince(selectedTask.age);

                    const table = createTable(properties, [selectedTask]);
                    console.log(table.toString());
                }

                if ('N' in nextTasks) {
                    console.log(MessageColorEnum.NORMAL_PRIORITY('Next NORMAL priority task:'));
                    const selectedTask = selectObjectProperties(['description', 'age', 'status'], nextTasks.N);
                    selectedTask.age = getTimeSince(selectedTask.age);

                    const table = createTable(properties, [selectedTask]);
                    console.log(table.toString());
                }

                if ('L' in nextTasks) {
                    console.log(MessageColorEnum.LOW_PRIORITY('Next LOW priority task:'));
                    const selectedTask = selectObjectProperties(['description', 'age', 'status'], nextTasks.L);
                    selectedTask.age = getTimeSince(selectedTask.age);

                    const table = createTable(properties, [selectedTask]);
                    console.log(table.toString());
                }
            } catch (error) {
                console.error(MessageColorEnum.ERROR(error.message));
            }
        });

    return taskCommand;
}

module.exports = { makeTaskCommand };