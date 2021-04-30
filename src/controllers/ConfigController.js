const chalk = require('chalk');
const { supportsColor } = require('chalk');

const UpdateConfigsService = require('../services/UpdateConfigService');
const MessageColorEnum = require('../shared/enums/MessageColorEnum');

class ConfigController {
    async update({ enableTerminalColors }) {
        try {
            const updateConfigs = new UpdateConfigsService();
            await updateConfigs.execute({ enableTerminalColors });
            const message = 'The configurations for task-master were successfully updated.';

            if (!enableTerminalColors) {
                chalk.level = 0;
            } else if (enableTerminalColors && supportsColor.level > 0) {
                chalk.level = supportsColor.level;
            }
            
            console.log(MessageColorEnum.SUCCESS(message));
        } catch (error) {
            console.error(MessageColorEnum.ERROR(error));
        }
    }
}

module.exports = ConfigController;