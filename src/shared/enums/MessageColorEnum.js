const chalk = require('chalk');
const { supportsColor } = require('chalk');

const { enableTerminalColors } = require('../../config/config.json'); 

MessageColorEnum = {
    SUCCESS: chalk.bold.green,
    WARNING: chalk.bold.hex('#FFA500'),
    ERROR: chalk.bold.red,
    
    LOW_PRIORITY: chalk.yellowBright,
    NORMAL_PRIORITY: chalk.hex('#FFA500'),
    HIGH_PRIORITY: chalk.redBright,

    BOARD: chalk.underline.hex('#d2dae2'),
    STATISTICS: chalk.hex('#808e9b'),
    DESCRIPTION: chalk.hex('#d2dae2'),
    TIME_STAMP: chalk.hex('#808e9b'),
    CHECKED: chalk.hex('#808e9b'),
    UNTICKED: chalk.hex('#FC427B'),
    TICK: chalk.hex('#0be881'),
    NOTE: chalk.hex('#1B9CFC'),
}

chalk.level = enableTerminalColors ? supportsColor.level : 0;

module.exports = MessageColorEnum;