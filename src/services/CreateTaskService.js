class CreateTaskService {
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
    }

    async execute({ description, priority }) {
        const task = await this.tasksRepository.createTask({
            description,
            priority,
        });

        return task;
    }
}

module.exports = CreateTaskService;