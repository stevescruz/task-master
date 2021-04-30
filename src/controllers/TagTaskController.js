const TagTaskService = require('../services/TagTaskService');
const UntagTaskService = require('../services/UntagTaskService');

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
            await tagTask.execute(parsedId, tag);

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
            await untagTask.execute(parsedId);

            console.log(MessageColorEnum.SUCCESS("Task was untagged successfully"));
        } catch (error) {
            console.error(MessageColorEnum.ERROR(error.message));
        }
    }
}

module.exports = TagTaskController;