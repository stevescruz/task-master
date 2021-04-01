class Task {
    constructor({ description, status, age, priority }) {
        this.description = description;
        this.status = status ? status: 'pending';
        this.age = age ? age : (new Date());
        this.priority = priority ? priority : 'N';
    }
}

module.exports = Task;