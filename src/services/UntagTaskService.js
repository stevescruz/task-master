const getTimeSince = require('../shared/utils/getTimeSince');

class UntagTaskService {
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
    }

    async execute(id) {
        if (!id) {
            throw new Error('Cannot tag a task without providing a corresponding id.');
        }

        const task = await this.tasksRepository.findById(id);
        if (!task) {
            throw new Error(`A task with the id {${id}} does not exist.`);
        }

        if (!('tag' in task)) {
            throw new Error(`The task with the id {${id}} is not tagged.`);
        }

        delete task.tag;
        
        const updatedTask = await this.tasksRepository.updateById(id, task);

        updatedTask.age = getTimeSince(updatedTask.age);

        return updatedTask;
    }
}

module.exports = UntagTaskService;