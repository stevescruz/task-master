const Task = require('../models/Task');

class FakeTasksRepository {
    constructor() {
        this.tasks = [];
    }

    async create({ description, priority }) {
        const id = this.tasks.length + 1;
        const task = new Task({ id, description, priority });
        this.tasks.push(task);

        return new Task({ ...task });
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

module.exports = FakeTasksRepository;