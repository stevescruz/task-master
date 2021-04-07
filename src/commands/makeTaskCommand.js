const { Command, Option } = require('commander');

const { makeTasksRepository } = require('../repositories/makeTasksRepository');

const TasksController = require('../controllers/TasksController');
const ShowNextTasksController = require('../controllers/ShowNextTasksController');

const AllowedChoicesTaskEnum = require('../shared/enums/AllowedChoicesTaskEnum');

async function makeTaskCommand() {
    const taskCommand = new Command('task');

    const tasksRepository = await makeTasksRepository();

    const tasksController = new TasksController(tasksRepository);
    const showNextTasksController = new ShowNextTasksController(tasksRepository);

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
            tasksController.create(description, options.priority);
        });

    taskCommand
        .command('delete <id>')
        .action(async (id) => {
            tasksController.delete(id);
        });

    taskCommand
        .command('done <id>')
        .action(async (id) => {
            tasksController.update(id);
        });

    taskCommand
        .command('list', { isDefault: true })
        .description('list all pending tasks')
        .option('-a, --all', 'list all existing tasks, including those that are pending', false)
        .action(async (options) => {
            tasksController.index(options.all);
        })

    taskCommand
        .command('next')
        .description('list the next pending task')
        .action(async () => {
            showNextTasksController.index();
        });

    return taskCommand;
}

module.exports = { makeTaskCommand };