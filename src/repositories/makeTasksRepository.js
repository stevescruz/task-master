const TasksRepository = require('./TasksRepository');

async function makeTasksRepository() {
    const tasksRepository = await TasksRepository.build();
    return tasksRepository;
}

module.exports = { makeTasksRepository };