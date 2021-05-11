class Task {
    constructor({ id, description, status, timestamp, age, priority, tag }) {
        if (!id) {
            throw new Error('To register a task you must provide a valid id.')
        }
        if (!description) {
            throw new Error('To register a task you must provide a valid description.')
        }

        this.id = id;
        this.description = description;
        this.status = status || 'pending';
        this.timestamp = timestamp || new Date();
        this.priority = priority || 'N';

        if (tag) {
            this.tag = tag;
        }
        if (age) {
            this.age = age;
        }
    }
}

module.exports = Task;