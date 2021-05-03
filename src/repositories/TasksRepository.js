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

    static async build(filename) {
        const tasksDatabase = new Database(filename);
        const tasks = await tasksDatabase.readFileContent();
        if (!Array.isArray(tasks)) {
            tasksDatabase.clearFile();
            throw Error(`Cannot read ${filename}. It does not contain valid tasks.`);
        }

        const mappedTasks = tasks.map((task, index) => {
            task.id = index + 1;
            return new Task(task)
        });

        return new TasksRepository(tasksDatabase, mappedTasks);
    }

    async create({ description, priority }) {
        //Create tag option
        if (!description) {
            throw Error('Cannot create a new task without providing a description.')
        }

        const id = this.tasks.length + 1;
        const task = new Task({ id, description, priority });
        this.tasks.push(task);

        await this.tasksDatabase.writeFileContent(this.tasks);

        return new Task({ ...task, age: (task.age).toJSON() });
    }

    async removeById(id) {
        if (this.tasks.length < id || id <= 0) {
            return null;
        }

        const [removedTask] = this.tasks.splice(id - 1, 1);
        this.tasks.map((task, index) => {
            if (index >= id - 1) {
                task.id = index + 1;
            }
        });

        await this.tasksDatabase.writeFileContent(this.tasks);

        return removedTask;
    }

    async updateById(id, modifiedTask) {
        if (this.tasks.length < id || id <= 0) {
            return null;
        }

        const currentTask = this.tasks[id - 1];
        this.tasks[id - 1] = new Task({
            ...currentTask,
            ...modifiedTask,
        });
        await this.tasksDatabase.writeFileContent(this.tasks);

        const updatedTask = new Task({ ...this.tasks[id - 1] });

        return updatedTask;
    }

    async findById(id) {
        if (this.tasks.length < id || id <= 0) {
            return null;
        }

        const task = this.tasks[id - 1];
        return task;
    }

    async list() {
        return this.tasks.length !== 0 ? [...this.tasks] : [];
    }
}

module.exports = TasksRepository;