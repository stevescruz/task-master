<h1 align="center">
    <br>
    Task Master CLI
</h1>

<h4 align="center">
  Task Master is a command-line todo list. It allows you to write your tasks, set priorities, view existing tasks and view the next tasks due.
</h4>

<p align="center">
  <a href="#goal">Goal</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#getting-started">Getting Started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#commands">Commands</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#uninstallation">Uninstallation</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-license">License</a>
</p>

<div align="center" style="display: flex; flex-wrap: wrap;">
  <img style="margin: 5px" alt="CLI adds a new pending task" src="https://res.cloudinary.com/dmct8cfu9/image/upload/v1618085857/task-master_task-add_wzpz3g.png" height="115" />

  <img style="margin: 5px" alt="CLI deletes a task through its corresponding id after accepting the confirmation prompt" src="https://res.cloudinary.com/dmct8cfu9/image/upload/v1618259211/task-master_task-delete_p7ne3c.png" height="115" />

  <img style="margin: 5px" alt="CLI lists all pending tasks" src="https://res.cloudinary.com/dmct8cfu9/image/upload/v1618085857/task-master_task_b2a9na.png" width="360" />
</div>

## Goal

The goal is to create a todo list command-line application using Node.js that prioritizes productivity and contains the most important features without overwhelming the user.

## Getting Started

Prerequisites: to clone and run this application, you need [Git](https://git-scm.com) and [Node.js v10.16][nodejs] (or higher) installed on your computer.

From your command line:

```bash
# Clone this repository
$ git clone https://github.com/stevescruz/task-master.git

# Go into the repository
$ cd task-master

# Install dependencies
$ npm install

# Enable task-master as a global terminal command
$ npm link

# Execute the CLI
$ task-master
```

Optionally instead of installing task-master as a global command you can execute the CLI directly through the cli.js file.

```bash
# Clone this repository
$ git clone https://github.com/stevescruz/task-master.git

# Go into the repository
$ cd task-master

# Install dependencies
$ npm install

# execute the CLI entrypoint file with node
$ node src/cli.js
```

## Commands

- `task-master task [subcommand]`
  - When no subcommand is specified for `task`, it will execute the `list` subcommand.
- `task-master task add <description [-p <priority>]`
  - Creates a new task.
  - The task's `description` is mandatory.
  - The task's `-p` (or `--priority`) flag is optional. It sets a task's `priority` and can only receive `L`, `N` or `H` as a parameter.
  - When the `-p` option is ommitted, **by default**, the new task's `priority` is set to `N`.
- `task-master task delete <id>`
  - Deletes a task.
  - The task's `id` is mandatory.
- `task-master task done <id>`
  - Marks a task's `status` as `done`, hiding it from being listed by the `task list` command.
  - The task's `id` is mandatory.
- `task-master task list [-a]`
  - Displays all tasks, but hides those with `status` `done`.
  - `-a` (or `--all`) is an optional flag that forces the `task list` command to also display the tasks whose `status` is `done`.
- `task-master task next`
  - Displays the next task of each `priority` that is due.
  - Does not display tasks with `status` `done`.
- `task-master export [target_directory]`
  - Exports a *tasks.json* file containing the saved tasks to the `target_directory`.
  - If the `target_directory` is ommitted, it exports the file to the current working directory.

## Technologies

This project was developed with the following technologies:

-  [Node.js](https://nodejs.org/en/)
-  [Commander](https://github.com/tj/commander.js/)
-  [Inquirer](https://github.com/SBoudrias/Inquirer.js)
-  [Chalk](https://github.com/chalk/chalk)
-  [CLI-Table-3](https://github.com/cli-table/cli-table3)
-  [NCP](https://github.com/AvianFlu/ncp)
-  [Mocha](https://mochajs.org/)
-  [Expect](https://jestjs.io/docs/expect)
-  [VS Code][vc]

## Uninstallation

In case you previously used `npm link` on your terminal to enable the `task-master` global terminal command, disable it:
- Open your terminal.
- Enter your project's directory.
- Execute `npm unlink`.
- Delete the project's directory

Otherwise:
- Simply delete the project's folder.

## :memo: License
This project is under the MIT license.

---

[Get in touch with me!](https://www.linkedin.com/in/stevescruz/)

[nodejs]: https://nodejs.org/
[vc]: https://code.visualstudio.com/