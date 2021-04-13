#!/usr/bin/env node

const { Command } = require('commander');

const { makeTaskCommand } = require('./commands/makeTaskCommand');
const { makeExportCommand } = require('./commands/makeExportCommand');

async function cli() {
    const program = new Command;

    program
        .version('1.0.0', '-v, --version', "output Task Master's current version")
        .description('Task Master is a command-line todo list that increases your productivity by reducing your distractions')
        .addCommand(await makeTaskCommand())
        .addCommand(await makeExportCommand())
        .allowUnknownOption(false)
        .allowExcessArguments(false);

    program.parse(process.argv);
}

module.exports = cli;