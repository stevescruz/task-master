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
        const mappedTasks = tasks.map((task, index) => {
        task.id = index + 1;
            return new Task(task)
        });

        return new TasksRepository(tasksDatabase, mappedTasks);
    }

    async createTask({ description, priority }) {
        if (!description) {
            throw Error('Cannot create a new task with providing a description.')
        }

        const id = this.tasks.length + 1;

        const task = new Task({ id, description, priority });
        this.tasks.push(task);

        await this.tasksDatabase.writeFileContent(this.tasks);

        return { ...task, age: (task.age).toJSON() };
    }

    async removeTaskById(id) {
        if (this.tasks.length < id || id <= 0) {
            return null;
        }

        const [removedTask] = this.tasks.splice(id - 1, 1);
        this.tasks.map((task, index) => {
            if(index >= id - 1) {
                task.id = index + 1;
            }
        });

        await this.tasksDatabase.writeFileContent(this.tasks);
 
        return removedTask;
    }

    async updateTaskById(id, modifiedTask) {
        if (this.tasks.length < id || id <= 0) {
            return null;
        }

        const currentTask = this.tasks[id - 1];
        this.tasks[id - 1] = {
            ...currentTask,
            ...modifiedTask,
        };
        await this.tasksDatabase.writeFileContent(this.tasks);

        return this.tasks[id - 1];
    }

    async listTasks() {
        return this.tasks.length !== 0 ? [...this.tasks] : [];
    }
}

module.exports = TasksRepository;