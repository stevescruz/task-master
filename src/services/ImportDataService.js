const { stat, rm, rename } = require('fs').promises;
const { resolve } = require('path');

const copyTargetFile = require('../shared/utils/copyTargetFile');
const makeTasksRepository = require('../repositories/makeTasksRepository');

class ImportDataService {

    async execute(targetFilename, sourceFilepath) {
        const resolvedSourceFilepath = resolve(sourceFilepath);

        if (!resolvedSourceFilepath) {
            throw new Error('Must provide the filepath for the .json file that you want to import.');
        }

        const isFile = (await stat(resolvedSourceFilepath)).isFile();

        if (!isFile) {
            throw new Error(`Cannot import ${resolvedSourceFilepath} because it isn't a file.\nInvalid filepath.`);
        }
        if (!resolvedSourceFilepath.match(/\.(json)$/i)) {
            throw new Error(`Cannot import ${resolvedSourceFilepath} because it isn't a .json file.\nInvalid filepath.`);
        }

        const completeTargetFilename = `temporary_${targetFilename}`;
        const resolvedTargetFilepath = resolve(__dirname, '../data', completeTargetFilename);

        await rm(resolvedTargetFilepath, {
            force: true,
        });

        await copyTargetFile(resolvedSourceFilepath, resolvedTargetFilepath);
        await makeTasksRepository(completeTargetFilename);

        const resolvedOldTasksFilepath = resolve(__dirname, '../data', targetFilename);

        await rm(resolvedOldTasksFilepath, {
            force: true,
        });
        await rename(resolvedTargetFilepath, resolvedOldTasksFilepath);
        return true;
    }
}

module.exports = ImportDataService;