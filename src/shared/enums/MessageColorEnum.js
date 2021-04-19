const { enableTerminalColors } = require('../../config/config.json'); 
const chalk = require('chalk');

const doNothing = arg => arg;

MessageColorEnum = {
    SUCCESS_IGNORE_CONFIG: chalk.bold.green,
    SUCCESS: enableTerminalColors ? chalk.bold.green : doNothing,
    WARNING: enableTerminalColors ? chalk.bold.keyword('orange') : doNothing,
    ERROR: enableTerminalColors ? chalk.bold.red : doNothing,
    LOW_PRIORITY: enableTerminalColors ? chalk.yellowBright : doNothing,
    NORMAL_PRIORITY: enableTerminalColors ? chalk.hex('#FFA500') : doNothing,
    HIGH_PRIORITY: enableTerminalColors ? chalk.redBright : doNothing,
}

module.exports = MessageColorEnum;