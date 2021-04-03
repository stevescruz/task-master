const chalk = require("chalk");

MessageColorEnum = {
    SUCCESS: chalk.bold.green,
    WARNING: chalk.bold.keyword('orange'),
    ERROR: chalk.bold.red,
    LOW_PRIORITY: chalk.bold.yellowBright,
    NORMAL_PRIORITY: chalk.bold.hex('#FFA500'),
    HIGH_PRIORITY: chalk.bold.redBright,
}

module.exports = MessageColorEnum;