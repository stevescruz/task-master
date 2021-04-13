const path = require('path');

const ExportDataService = require('../services/ExportDataService');

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
}

module.exports = BackupDataController;