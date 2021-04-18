#!/usr/bin/env node

const { Command } = require('commander');

const { makeTaskCommand } = require('./commands/makeTaskCommand');
const { makeExportCommand } = require('./commands/makeExportCommand');
const { makeImportCommand } = require('./commands/makeImportCommand');

const MessageColorEnum = require('./shared/enums/MessageColorEnum');

async function cli() {
    try {
        const program = new Command;

        program
            .version('1.0.0', '-v, --version', "output Task Master's current version")
            .description('Task Master is a command-line todo list that increases your productivity by reducing your distractions')
            .addCommand(await makeTaskCommand())
            .addCommand(await makeExportCommand())
            .addCommand(await makeImportCommand())
            .allowUnknownOption(false)
            .allowExcessArguments(false);

        program.parse(process.argv);
    } catch (error) {
        console.error(MessageColorEnum.ERROR(error));
    }
}

module.exports = cli;