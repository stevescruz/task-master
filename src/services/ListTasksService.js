const getTimeSince = require('../shared/utils/getTimeSince');

class ListTasksService {
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
    }

    async execute(showAll) {
        const tasks = await this.tasksRepository.listTasks();
        const mappedTasks = tasks.map(task => {
            task.age = getTimeSince(task.age);
            return task;
        });

        if (showAll !== true) {
            const filteredTasks = mappedTasks.filter(task => task.status !== 'done');
            return filteredTasks;
        } else {
            return mappedTasks;
        }
    }
}

module.exports = ListTasksService;