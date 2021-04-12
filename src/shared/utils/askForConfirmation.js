const confirm = require('@inquirer/confirm');

async function askForConfirmation(questionMessage) {
    const answer = await confirm({
        message: questionMessage,
        default: false,
    });

    return answer;
}

module.exports = askForConfirmation;