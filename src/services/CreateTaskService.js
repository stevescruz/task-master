const AllowedChoicesTaskEnum = require('../shared/enums/AllowedChoicesTaskEnum');

class CreateTaskService {
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
    }

    async execute({ description, priority }) {

        const allowedPriorities = new Set(AllowedChoicesTaskEnum.PRIORITIES);

        if (priority && !allowedPriorities.has(priority)) {
            throw new Error(`Cannot accept a priority that in not among the following options: ${Array.from(allowedPriorities)}`);
        }        
        const task = await this.tasksRepository.create({
            description,
            priority,
        });

        return task;
    }
}

module.exports = CreateTaskService;