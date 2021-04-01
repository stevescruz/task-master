class Task {
    constructor({ description, status, age }) {
        this.description = description;
        this.status = status ? status: 'pending';
        this.age = age ? age : (new Date());
    }
}

module.exports = Task;