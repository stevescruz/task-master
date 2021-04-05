const AllowedChoicesTaskEnum = require('../shared/enums/AllowedChoicesTaskEnum');

class CreateTaskService {
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
    }

    async execute({ description, priority }) {

        const allowedPriorities = new Set(AllowedChoicesTaskEnum.PRIORITIES);

        if (priority && !allowedPriorities.has(priority)) {
            throw new Error('');
        }        
        const task = await this.tasksRepository.create({
            description,
            priority,
        });

        return task;
    }
}

module.exports = CreateTaskService;