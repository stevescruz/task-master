#!/usr/bin/env node

const { Command } = require('commander');

const { makeTaskCommand } = require('./commands/makeTaskCommand');

async function cli() {
    const program = new Command;

    program
        .version('1.0.0', '-v, --version', "output Task Master's current version")
        .description('Task Master is a command-line todo list that increases your productivity by reducing your distractions')
        .addCommand(await makeTaskCommand())
        .allowUnknownOption(false)
        .allowExcessArguments(false);

        program.parse(process.argv);
}

module.exports = cli;