const ShowNextTasksService = require('../services/ShowNextTasksService');

const renderNextTasks = require('../shared/utils/renderNextTasks');

const MessageColorEnum = require('../shared/enums/MessageColorEnum');

class ShowNextTasksController {
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
    }

    async index() {
        try {
            const showNextTasks = new ShowNextTasksService(this.tasksRepository);
            const tasks = await showNextTasks.execute();

            if (tasks.length <= 0) {
                console.log(MessageColorEnum.SUCCESS('All tasks have already been done! ✅'))
            } else {
                renderNextTasks(tasks);
            }
        } catch (error) {
            console.error(MessageColorEnum.ERROR(error.message));
        }
    }
}

module.exports = ShowNextTasksController;