const { Command } = require('commander');

function main() {
    const program = new Command;

    program
        .version('1.0.0', '-v, --version', "output Task Master's current version")
        .description('Task Master is a command-line todo list that increases your productivity by reducing your distractions')
        .allowUnknownOption(false)
        .allowExcessArguments(false);

    program.parse(process.argv);
}

main();