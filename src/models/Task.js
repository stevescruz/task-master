class Task {
    constructor({ id, description, status, age, priority }) {
        if(!id) {
            throw new Error('To register a task you must provide a valid id.')
        }
        if(!description) {
            throw new Error('To register a task you must provide a valid description.')
        }

        this.id = id;
        this.description = description;
        this.status = status || 'pending';
        this.age = age || new Date();
        this.priority = priority || 'N';
    }
}

module.exports = Task;