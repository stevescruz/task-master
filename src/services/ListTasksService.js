const getTimeSince = require('../shared/utils/getTimeSince');

class ListTasksService {
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
    }

    async execute(done = false, tag = undefined) {
        const tasks = await this.tasksRepository.list();

        let filteredTasks;

        if (done || tag) {
            filteredTasks = tasks.filter(task => {
                let hasMatched = true;

                if (done && task.status === 'done') {
                    hasMatched = false;
                }
                if (tag && task.tag !== tag) {
                    hasMatched = false;
                }
                return hasMatched;
            });
        } else {
            filteredTasks = tasks;
        }

        const mappedTasks = filteredTasks.map(task => {
            task.age = getTimeSince(task.age);
            return task;
        });

        return mappedTasks;
    }
}

module.exports = ListTasksService;