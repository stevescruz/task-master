const { Command, Option } = require('commander');

const { makeTasksRepository } = require('../repositories/makeTasksRepository');
const joinInput = require('../utils/joinInput');
const getObjectProperties = require('../utils/getObjectProperties');
const getTimeSince = require('../utils/getTimeSince');

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
                const task = await tasksRepository.createTask({ 
                    description: parsedDescription,
                    priority: options.priority,
                 });
                const selectedTask = getObjectProperties(['description', 'status'] , task);
                console.table(selectedTask);
                console.log(`New task added successfully.`);
            } catch (error) {
                console.error(error.message);
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
                    const filteredTask = getObjectProperties(['description', 'age', 'status'] , task);
                    filteredTask.age = getTimeSince(task.age);
                    console.table(filteredTask);
                    console.log('Task deleted successfully.')
                } else {
                    throw new Error(`A task with the id {${parsedId}} does not exist.`);
                }
            } catch (error) {
                console.error(error.message);
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
                    const filteredTask = getObjectProperties(['description', 'age', 'status'] , task);
                    filteredTask.age = getTimeSince(task.age);
                    console.table(filteredTask);
                    console.log("Task's status marked as done successfully.");
                } else {
                    throw new Error(`A task with the id {${parsedId}} does not exist.`);
                }
            } catch (error) {
                console.error(error.message);
            }
        });

    taskCommand
        .command('list', { isDefault: true })
        .description('list all pending tasks')
        .option('-a, --all', 'list all existing tasks, including those that are pending', false)
        .action(async (options) => {
            try {
                const tasks = await tasksRepository.listTasks();
                const mappedTasks = tasks.map(task => {
                    const selectedTask = getObjectProperties(['description', 'age', 'priority', 'status'] , task);
                    selectedTask.age = getTimeSince(task.age);
                    return selectedTask;
                });

                if(options.all === true) {
                    console.table(mappedTasks);
                    console.log(`${mappedTasks.length} ${mappedTasks.length !== 1 ? 'tasks were' : 'task was'} displayed successfully.`);
                } else {
                    const filteredTasks = mappedTasks.filter(task => task.status !== 'done');
                    
                    console.table(filteredTasks);
                    console.log(`${filteredTasks.length} ${filteredTasks.length !== 1 ? 'tasks were' : 'task was'} displayed successfully.`);
                }

            } catch (error) {
                console.error(error.message);
            }
        })

    return taskCommand;
}

module.exports = { makeTaskCommand };