const chalk = require("chalk");

MessageColorEnum = {
    SUCCESS: chalk.bold.green,
    WARNING: chalk.bold.keyword('orange'),
    ERROR: chalk.bold.red,
    LOW_PRIORITY: chalk.yellowBright,
    NORMAL_PRIORITY: chalk.hex('#FFA500'),
    HIGH_PRIORITY: chalk.redBright,
}

module.exports = MessageColorEnum;