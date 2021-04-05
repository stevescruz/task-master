const getTimeSince = require('../shared/utils/getTimeSince');

class ShowNextTasksService {
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
    }

    async execute() {
        const tasks = await this.tasksRepository.list();
        const nextTasks = tasks.reduce((acc, task) => {
            task.age = getTimeSince(task.age);

            if (!('H' in acc) && task.priority === 'H' && task.status !== 'done') {
                acc['H'] = task;
                return acc;
            }

            if (!('N' in acc) && task.priority === 'N' && task.status !== 'done') {
                acc['N'] = task;
                return acc;
            }

            if (!('L' in acc) && task.priority === 'L' && task.status !== 'done') {
                acc['L'] = task;
                return acc;
            }
            return acc;
        }, {});

        return Object.keys(nextTasks).length > 0 ? nextTasks : null;
    }
}

module.exports = ShowNextTasksService;