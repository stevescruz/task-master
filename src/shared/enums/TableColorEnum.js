const { enableTerminalColors } = require('../../config/config.json'); 

TableColorEnum = {
    HEADER: enableTerminalColors ? 'red' : 'white',
    ROWS: 'white',
    ID: enableTerminalColors ? 'red' : 'white',
}

module.exports = TableColorEnum;