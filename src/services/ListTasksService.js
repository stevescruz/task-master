const getTimeSince = require('../shared/utils/getTimeSince');

class ListTasksService {
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
    }

    async execute(status = false, tag = undefined) {
        const tasks = await this.tasksRepository.list();

        let filteredTasks;

        if (status || tag) {
            filteredTasks = tasks.filter(task => {
                let hasMatched = true;

                if (status && task.status !== status) {
                    hasMatched = false;
                }
                if(tag && !('tag' in task)) {
                    hasMatched = false;
                }
                if (tag && 'tag' in task && task.tag.toLowerCase() !== tag.toLowerCase()) {
                    hasMatched = false;
                }
                return hasMatched;
            });
        } else {
            filteredTasks = tasks;
        }

        const mappedTasks = filteredTasks.map(task => {
            task.age = getTimeSince(task.timestamp);
            return task;
        });

        return mappedTasks;
    }
}

module.exports = ListTasksService;