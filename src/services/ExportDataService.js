const { access } = require('fs').promises;
const { constants } = require('fs');
const path = require('path');

const copyTargetFile = require('../shared/utils/copyTargetFile');

class ExportDataService {
    async execute(filename, targetDirectory) {
        const sourceFilepath = path.resolve(__dirname, '../data', filename);
        const targetFilepath = targetDirectory ? path.resolve(targetDirectory, filename) : path.resolve(process.cwd(), filename);

        try {
            await access(sourceFilepath, constants.R_OK);
        } catch (error) {
            return { 
                success: false,
                errorMessage: `Cannot export ${filename}.\nIt's a file that does not exist at the source directory.\nInvalid filename.`,
            };
        }

        try {
            await access(targetFilepath, constants.F_OK);
            return { 
                success: false,
                errorMessage: `A file named ${filename} already exists at the target directory.\nCannot overwrite files!\nThe operation was aborted.`,
            };;
        } catch (error) {
            await copyTargetFile(sourceFilepath, targetFilepath);
            return {
                success: true
            };
        }
    }
}

module.exports = ExportDataService;