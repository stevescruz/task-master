class Task {
    constructor({ id, description, status, age, priority }) {
        this.id = id;
        this.description = description;
        this.status = status || 'pending';
        this.age = age || new Date();
        this.priority = priority || 'N';
    }
}

module.exports = Task;