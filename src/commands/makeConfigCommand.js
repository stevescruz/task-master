const { Command } = require('commander');

const ConfigController = require('../controllers/ConfigController');

async function makeConfigCommand() {
    const configController = new ConfigController();

    const configCommand = new Command('config')
        .usage('[options]')
        .addHelpText('after', '\nExample call: task-master config --no-colors')
        .description("Set configurations for the task-master CLI.")
        .option('--no-colors', 'Disables colored output.')
        .action(async (options) => {
            configController.update({ enableTerminalColors: options.colors });
        });

    return configCommand;
}

module.exports = makeConfigCommand;