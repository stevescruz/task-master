const chalk = require('chalk');
const { supportsColor } = require('chalk');

const { enableTerminalColors } = require('../../config/config.json'); 

MessageColorEnum = {
    SUCCESS: chalk.bold.hex('#05c46b'),
    WARNING: chalk.bold.hex('#ffd32a'),
    ERROR: chalk.bold.hex('#ef5777'),
    
    LOW_PRIORITY: chalk.hex('#ffda79'),
    NORMAL_PRIORITY: chalk.hex('#ffa500'),
    HIGH_PRIORITY: chalk.hex('#ff5252'),

    BOARD: chalk.underline.hex('#d2dae2'),
    STATISTICS: chalk.hex('#808e9b'),
    DESCRIPTION: chalk.hex('#d2dae2'),
    TIME_STAMP: chalk.hex('#808e9b'),
    CHECKED: chalk.hex('#808e9b'),
    UNTICKED: chalk.hex('#f53b57'),
    TICK: chalk.hex('#0be881'),
    NOTE: chalk.hex('#1b9cfc'),
}

chalk.level = enableTerminalColors ? supportsColor.level : 0;

module.exports = MessageColorEnum;