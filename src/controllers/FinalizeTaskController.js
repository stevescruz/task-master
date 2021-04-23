const FinalizeTaskService = require('../services/FinalizeTaskService');

const selectObjectProperties = require('../shared/utils/selectObjectProperties');
const askForConfirmation = require('../shared/utils/askForConfirmation');
const createTable = require('../shared/utils/createTable');
const MessageColorEnum = require('../shared/enums/MessageColorEnum');

class FinalizeTaskController {
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
    }

    async update(id) {
        try {
            const parsedId = parseInt(id);

            if (Number.isNaN(parsedId)) {
                throw new Error('Do not provide a non-numeric value for the id.');
            }

            const questionMessage = `Are you sure you want to mark the task with id ${parsedId} as done?`;
            const answer = await askForConfirmation(questionMessage);

            if (answer) {
                const finalizeTask = new FinalizeTaskService(this.tasksRepository);
                const task = await finalizeTask.execute(parsedId);

                const properties = ['id', 'description', 'age', 'status'];
                const filteredTask = selectObjectProperties(properties, task);

                const table = createTable(properties, [filteredTask]);
                console.log(table);
                console.log(MessageColorEnum.SUCCESS("Task's status marked as done successfully."));
            } else {
                console.log(MessageColorEnum.WARNING('Operation aborted.'));
            }
        } catch (error) {
            console.error(MessageColorEnum.ERROR(error.message));
        }
    }
}

module.exports = FinalizeTaskController;
