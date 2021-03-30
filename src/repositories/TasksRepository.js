const Database = require('../database/Database');
const Task = require('../models/Task');

class TasksRepository {
    constructor(tasksDatabase, tasks) {
        if (typeof tasksDatabase === 'undefined' || typeof tasks === 'undefined') {
            throw new Error('This class cannot be instantiated directly, use the build static method.')
        }

        this.tasksDatabase = tasksDatabase;
        this.tasks = tasks;
    }

    static async build() {
        const tasksDatabase = new Database('tasks.json');
        const tasks = await tasksDatabase.readFileContent();

        return new TasksRepository(tasksDatabase, tasks);
    }

    async createTask(description) {
        if (!description) {
            throw Error('Cannot create a new task with providing a description.')
        }

        const task = new Task(description);
        console.log(task);
        this.tasks.push(task);

        await this.tasksDatabase.writeFileContent(this.tasks);

        return task;
    }

    async removeTaskById(id) {
        if (this.tasks.length < id || id <= 0) {
            return null;
        }

        const removedTask = this.tasks.splice(id - 1, 1);
        await this.tasksDatabase.writeFileContent(this.tasks);

        return removedTask;
    }

    async listTasks() {
        return this.tasks.length !== 0 ? this.tasks : [];
    }
}

module.exports = TasksRepository;