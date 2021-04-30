const getTimeSince = require('../shared/utils/getTimeSince');

class ShowNextTasksService {
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
    }

    async execute() {
        const tasks = await this.tasksRepository.list();

        const priorities = ['H', 'N', 'L'];

        const nextTasksObject = tasks.reduce((acc, task) => {
            task.age = getTimeSince(task.age);

            priorities.some(priority => {
                if (!(priority in acc) && task.priority === priority && task.status !== 'done') {
                    acc[priority] = task;
                    return true;
                }
            });

            return acc;
        }, {});

        const keys = Object.keys(nextTasksObject);
        const nextTasksArray = [];

        if (keys.length > 0) {
            priorities.forEach(priority => {
                if (nextTasksObject[priority]) {
                    nextTasksArray.push(nextTasksObject[priority])
                }
            })
        }

        return nextTasksArray;
    }
}

module.exports = ShowNextTasksService;