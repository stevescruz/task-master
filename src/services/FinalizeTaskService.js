class FinalizeTaskService {
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
    }

    async execute(id) {
        if(!id) {
            throw new Error('Cannot mark a task as done without providing a corresponding id.');
        }

        const task = await this.tasksRepository.updateById(id, { status: 'done' });

        if(!task) {
            throw new Error(`A task with the id {${id}} does not exist.`);
        }

        return task;
    }
}

module.exports = FinalizeTaskService;