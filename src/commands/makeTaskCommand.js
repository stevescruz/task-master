const { Command, Option } = require('commander');

const makeTasksRepository = require('../repositories/makeTasksRepository');

const TasksController = require('../controllers/TasksController');
const FinalizeTaskController = require('../controllers/FinalizeTaskController');
const TagTaskController = require('../controllers/TagTaskController');
const ShowNextTasksController = require('../controllers/ShowNextTasksController');

const AllowedChoicesTaskEnum = require('../shared/enums/AllowedChoicesTaskEnum');

async function makeTaskCommand() {
    const taskCommand = new Command('task');

    const tasksRepository = await makeTasksRepository();

    const tasksController = new TasksController(tasksRepository);
    const finalizeTaskController = new FinalizeTaskController(tasksRepository);
    const tagTaskController = new TagTaskController(tasksRepository);
    const showNextTasksController = new ShowNextTasksController(tasksRepository);

    taskCommand
        .description('Can be used in conjunction with another command to create new tasks\n and to remove, update or list existing tasks.', {
            command: 'add, delete, done, list or next'
        })
        .arguments('<command>')
        .usage('<command>')

    taskCommand
        .command('add <description...>')
        .usage('<description...> [options]')
        .addHelpText('after', '\nExample call: task-master task add Buy 6 eggs -p H')
        .description("Adds a new task with the provided description.\nOptionally set the task's priority with the -p\noption (alias: --priority).", {
            description: "The task's description.",
        })
        .addOption(new Option('-p, --priority <value>', "Set a task's priority to low, normal or high.")
            .choices(AllowedChoicesTaskEnum.PRIORITIES)
            .default('N')
        )
        .action(async (description, options) => {
            tasksController.create(description, options.priority);
        });

    taskCommand
        .command('delete <id>')
        .usage('<id>')
        .addHelpText('after', '\nExample call: task-master task delete 5')
        .description("Deletes a task by providing the corresponding id.", {
            id: "An id that belongs to the task you want to delete.",
        })
        .action(async (id) => {
            tasksController.delete(id);
        });

    taskCommand
        .command('done <id>')
        .usage('<id>')
        .addHelpText('after', '\nExample call: task-master task done 4')
        .description("Updates a task's status to done by providing the corresponding id.", {
            id: 'An id that belongs to the task you want to mark as done.',
        })
        .action(async (id) => {
            finalizeTaskController.update(id);
        });

    taskCommand
        .command('tag <id> <tag>')
        .usage('<id> <tag>')
        .addHelpText('after', '\nExample call: task-master task tag 2 home')
        .description("Updates a task's tag by providing the corresponding id and a tag title.", {
            id: 'An id that belongs to the task you want to tag.',
            tag: "The tag's title.",
        })
        .action(async (id, tag) => {
            tagTaskController.update(id, tag);
        });

    taskCommand
        .command('untag <id>')
        .usage('<id>')
        .addHelpText('after', '\nExample call: task-master task untag 2')
        .description("Removes a task's tag property by providing the corresponding id.", {
            id: 'An id that belongs to the task that you want remove its tag.',
        })
        .action(async (id) => {
            tagTaskController.delete(id);
        });

    taskCommand
        .command('list', { isDefault: true })
        .addHelpText('after', '\nExample call: task-master task list -a')
        .description('Lists all pending tasks. Optionally lists all tasks with the -a option. (alias: --all).', {
            '-a': 'Lists all existing tasks, including those that are done',
        })
        .option('-a, --all', 'list all existing tasks, including those that are done', false)
        .action(async (options) => {
            tasksController.index(options.all);
        })

    taskCommand
        .command('next')
        .addHelpText('after', '\nExample call: task-master task next')
        .description('Lists the next pending tasks. Only shows the oldest task of each priority.')
        .action(async () => {
            showNextTasksController.index();
        });

    return taskCommand;
}

module.exports = makeTaskCommand;