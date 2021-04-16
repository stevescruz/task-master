const TasksRepository = require('./TasksRepository');

async function makeTasksRepository(filename) {
    const dataFilename = filename || 'tasks.json'
    const tasksRepository = await TasksRepository.build(dataFilename);
    return tasksRepository;
}

module.exports = { makeTasksRepository };