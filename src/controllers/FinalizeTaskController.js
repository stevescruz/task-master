const FinalizeTaskService = require('../services/FinalizeTaskService');

const askForConfirmation = require('../shared/utils/askForConfirmation');

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
                await finalizeTask.execute(parsedId);

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
