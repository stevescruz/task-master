const { Command } = require('commander');

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
        .action(async (description) => {
            try {
                const parsedDescription = joinInput(description, ' ');
                const task = await tasksRepository.createTask(parsedDescription);
                const filteredTask = getObjectProperties(['description', 'status'] , task);
                console.table(filteredTask);
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
                    const filteredTask = getObjectProperties(['description', 'status'] , task);
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
                    const filteredTask = getObjectProperties(['description', 'status'] , task);
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
        .description('list all existing tasks')
        .action(async () => {
            try {
                const tasks = await tasksRepository.listTasks();
                const mappedTasks = tasks.map(task => {
                    const filteredTask = getObjectProperties(['description', 'status'] , task);
                    filteredTask.age = getTimeSince(task.age);
                    return filteredTask;
                });
                console.table(mappedTasks);
                console.log(`${tasks.length} ${tasks.length !== 1 ? 'tasks were' : 'task was'} displayed successfully.`);
            } catch (error) {
                console.error(error.message);
            }
        })

    return taskCommand;
}

module.exports = { makeTaskCommand };