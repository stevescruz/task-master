const { Command } = require('commander');

const { makeTasksRepository } = require('../repositories/makeTasksRepository');
const joinInput = require('../utils/joinInput');

async function makeTaskCommand() {
    const taskCommand = new Command('task');
    const tasksRepository = await makeTasksRepository();

    taskCommand
        .description('create, remove or list existing tasks.', {
            subcommand: 'add, done or list'
        })
        .arguments('<subcommand>')
        .usage('task list');

    taskCommand
        .command('add <description...>')
        .action(async (description) => {
            try {
                const parsedDescription = joinInput(description, ' ');
                const task = await tasksRepository.createTask(parsedDescription);
                console.table(task);
                console.log(`New task added successfully.`);
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

                const task = await tasksRepository.removeTaskById(parsedId);

                if (task) {
                    console.table(task);
                    console.log('Task removed successfully.')
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
                console.table(tasks);
                console.log(`${tasks.length} ${tasks.length !== 1 ? 'tasks were' : 'task was'} displayed successfully.`);
            } catch (error) {
                console.error(error.message);
            }
        })

    return taskCommand;
}

module.exports = { makeTaskCommand };