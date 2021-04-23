const getTimeSince = require('../shared/utils/getTimeSince');

class TagTaskService {
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
    }

    async execute(id, tag) {
        if (!id) {
            throw new Error('Cannot tag a task without providing a corresponding id.');
        }

        if (!tag) {
            throw new Error('Cannot tag a task without providing a title for its tag.');
        }

        const task = await this.tasksRepository.updateById(id, { tag });

        if (!task) {
            throw new Error(`A task with the id {${id}} does not exist.`);
        }

        task.age = getTimeSince(task.age);

        return task;
    }
}

module.exports = TagTaskService;