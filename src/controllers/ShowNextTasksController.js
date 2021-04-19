const ShowNextTasksService = require('../services/ShowNextTasksService');

const selectObjectProperties = require('../shared/utils/selectObjectProperties');
const createTable = require('../shared/utils/createTable');
const MessageColorEnum = require('../shared/enums/MessageColorEnum');

class ShowNextTasksController {
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
    }

    async index() {
        try {
            const showNextTasks = new ShowNextTasksService(this.tasksRepository);
            const nextTasks = await showNextTasks.execute();
            const properties = ['id', 'description', 'age', 'status'];

            if (nextTasks === null) {
                console.log(MessageColorEnum.SUCCESS('All tasks have already been done! ✅'))
            } else {
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

                        const selectedTask = selectObjectProperties(['id', 'description', 'age', 'status'], nextTasks[priority]);

                        const table = createTable(properties, [selectedTask]);
                        console.log(table);
                    }
                });
            }
        } catch (error) {
            console.error(MessageColorEnum.ERROR(error.message));
        }
    }
}

module.exports = ShowNextTasksController;