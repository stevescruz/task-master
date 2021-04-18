const { Command } = require('commander');

const BackupDataController = require('../controllers/BackupDataController');

async function makeImportCommand() {
    const backupDataController = new BackupDataController();

    const importCommand = new Command('import')
        .arguments('<filepath>')
        .usage('<filepath>')
        .addHelpText('after', '\nExample call: task-master import ./tasks.json')
        .description("Imports tasks from the specified .json file.\nIt completely overwrites existing tasks.", {
            target_directory: "The directory where you want to export tasks.json.",
        })
        .action(async (filepath) => {
            backupDataController.update('tasks.json', filepath);
        });

    return importCommand;
}

module.exports = makeImportCommand;