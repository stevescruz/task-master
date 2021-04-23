const TagTaskService = require('../services/TagTaskService');
const UntagTaskService = require('../services/UntagTaskService');

const selectObjectProperties = require('../shared/utils/selectObjectProperties');
const createTable = require('../shared/utils/createTable');
const MessageColorEnum = require('../shared/enums/MessageColorEnum');

class TagTaskController {
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
    }

    async update(id, tag) {
        try {
            const parsedId = parseInt(id);

            if (Number.isNaN(parsedId)) {
                throw new Error('Do not provide a non-numeric value for the id.');
            }

            const tagTask = new TagTaskService(this.tasksRepository);
            const task = await tagTask.execute(parsedId, tag);

            const properties = ['id', 'description', 'age', 'status', 'tag'];
            const filteredTask = selectObjectProperties(properties, task);

            const table = createTable(properties, [filteredTask]);
            console.log(table);
            console.log(MessageColorEnum.SUCCESS("Task was tagged successfully."));
        } catch (error) {
            console.error(MessageColorEnum.ERROR(error.message));
        }
    }

    async delete(id) {
        try {
            const parsedId = parseInt(id);

            if (Number.isNaN(parsedId)) {
                throw new Error('Do not provide a non-numeric value for the id.');
            }

            const untagTask = new UntagTaskService(this.tasksRepository);
            const task = await untagTask.execute(parsedId);

            const properties = ['id', 'description', 'age', 'status'];
            const filteredTask = selectObjectProperties(properties, task);

            const table = createTable(properties, [filteredTask]);
            console.log(table);
            console.log(MessageColorEnum.SUCCESS("Task was untagged successfully"));
        } catch (error) {
            console.error(MessageColorEnum.ERROR(error.message));
        }
    }
}

module.exports = TagTaskController;