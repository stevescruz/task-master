class FinalizeTaskService {
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
    }

    async execute(id) {
        const task = await this.tasksRepository.updateTaskById(id, { status: 'done' });

        if(!task) {
            throw new Error(`A task with the id {${id}} does not exist.`);
        }

        return task;
    }
}

module.exports = FinalizeTaskService;