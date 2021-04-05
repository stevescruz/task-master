const Task = require('../models/Task');

class FakeTasksRepository {
    constructor() {
        this.tasks = [];
    }

    async createTask({ description, priority }) {
        const id = this.tasks.length + 1;
        const task = new Task({ id, description, priority });
        this.tasks.push(task);

        return { ...task };
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

        return this.tasks[id - 1];
    }

    async listTasks() {
        return this.tasks.length !== 0 ? [...this.tasks] : [];
    }
}

module.exports = FakeTasksRepository;