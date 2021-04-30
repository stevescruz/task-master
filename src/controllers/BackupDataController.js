const path = require('path');

const ExportDataService = require('../services/ExportDataService');
const ImportDataService = require('../services/ImportDataService');

const askForConfirmation = require('../shared/utils/askForConfirmation');
const MessageColorEnum = require('../shared/enums/MessageColorEnum');

class BackupDataController {
    async create(filename, targetDirectory) {
        try {
            const exportData = new ExportDataService();
            const operationResult = await exportData.execute(filename, targetDirectory);

            if (!operationResult.success) {
                throw new Error(operationResult.errorMessage);
            }

            console.log(MessageColorEnum.SUCCESS(`${filename} has been exported to ${targetDirectory ? path.resolve(targetDirectory) : process.cwd()}`));
        } catch (error) {
            console.error(MessageColorEnum.ERROR(error));
        }
    }

    async update(targetFilename, sourceFilepath) {
        try {
            const questionMessage = `Are you sure you want to overwrite existing data for the tasks?`;
            const answer = await askForConfirmation(questionMessage);

            if (answer) {
                const importData = new ImportDataService();
                await importData.execute(targetFilename, sourceFilepath);
                console.log(MessageColorEnum.SUCCESS(`The tasks from ${path.resolve(sourceFilepath)} have been imported successfully.`));
            } else {
                console.log(MessageColorEnum.WARNING('Operation aborted.'));
            }
        } catch (error) {
            console.error(MessageColorEnum.ERROR(error));
        }
    }
}

module.exports = BackupDataController;