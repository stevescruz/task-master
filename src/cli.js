#!/usr/bin/env node

const { Command } = require('commander');

const { makeTaskCommand, makeExportCommand, makeImportCommand, makeConfigCommand } = require('./commands');

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
            .addCommand(await makeConfigCommand())
            .allowUnknownOption(false)
            .allowExcessArguments(false);

        program.parse(process.argv);
    } catch (error) {
        console.error(MessageColorEnum.ERROR(error));
    }
}

module.exports = cli;