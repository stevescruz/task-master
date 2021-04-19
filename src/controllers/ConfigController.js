const UpdateConfigsService = require('../services/UpdateConfigService');
const MessageColorEnum = require('../shared/enums/MessageColorEnum');

class ConfigController {
    async update({ enableTerminalColors }) {
        try {
            const updateConfigs = new UpdateConfigsService();
            await updateConfigs.execute({ enableTerminalColors });
            const message = 'The configurations for task-master were successfully updated.';
            console.log(enableTerminalColors ? MessageColorEnum.SUCCESS_IGNORE_CONFIG(message) : message);            
        } catch (error) {
            console.error(MessageColorEnum.ERROR(error));
        }
    }
}

module.exports = ConfigController;