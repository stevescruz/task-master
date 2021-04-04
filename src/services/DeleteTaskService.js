class DeleteTaskService {
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
    }

    async execute(id) {
        const task = await this.tasksRepository.removeTaskById(id);
        return task;
    }
}

module.exports = DeleteTaskService;