const { Command } = require('commander');

const BackupDataController = require('../controllers/BackupDataController');

async function makeExportCommand() {
    const backupDataController = new BackupDataController();

    const exportCommand = new Command('export')
        .arguments('[target_directory]')
        .usage('[target_directory]')
        .addHelpText('after', '\nExample call: task-master export .')
        .description("Exports the saved tasks data onto the tasks.json file to the current working directory.\nOr, when provided, to the target directory.", {
            target_directory: "The directory where you want to export tasks.json.",
        })
        .action(async (targetDirectory) => {
            backupDataController.create('tasks.json', targetDirectory);
        });

    return exportCommand;
}

module.exports = { makeExportCommand };