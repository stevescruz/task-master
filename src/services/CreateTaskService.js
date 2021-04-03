const AllowedChoicesTask = require('../shared/enums/AllowedChoicesTask');

class CreateTaskService {
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
    }

    async execute({ description, priority }) {

        const allowedPriorities = new Set(AllowedChoicesTask.PRIORITIES);

        if (priority && !allowedPriorities.has(priority)) {
            throw new Error('');
        }        
        const task = await this.tasksRepository.createTask({
            description,
            priority,
        });

        return task;
    }
}

module.exports = CreateTaskService;