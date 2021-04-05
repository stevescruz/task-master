class Task {
    constructor({ id, description, status, age, priority }) {
        this.id = id;
        this.description = description;
        this.status = status ? status: 'pending';
        this.age = age ? age : (new Date());
        this.priority = priority ? priority : 'N';
    }
}

module.exports = Task;