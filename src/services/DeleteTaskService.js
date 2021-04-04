const getTimeSince = require('../shared/utils/getTimeSince');

class DeleteTaskService {
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
    }

    async execute(id) {
        const task = await this.tasksRepository.removeTaskById(id);

        if(!task) {
            throw new Error(`A task with the id {${id}} does not exist.`);
        }

        task.age = getTimeSince(task.age);

        return task;
    }
}

module.exports = DeleteTaskService;