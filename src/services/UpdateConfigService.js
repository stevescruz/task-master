const { writeFile } = require('fs').promises;
const { resolve } = require('path');

const config = require('../config/config.json');

class UpdateConfigService {
    async execute({ enableTerminalColors }) {
        const resolvedFilepath = resolve(__dirname, '../config/config.json');
        config.enableTerminalColors = enableTerminalColors;
        await writeFile(resolvedFilepath, JSON.stringify(config, null, 2));
    }
}

module.exports = UpdateConfigService;