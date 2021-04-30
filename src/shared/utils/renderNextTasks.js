const { BOARD, STATISTICS, TIME_STAMP, UNTICKED, HIGH_PRIORITY, NORMAL_PRIORITY, LOW_PRIORITY } = require('../enums/MessageColorEnum');

function renderNextTasks(tasks) {

  const priorityColor = {
    H: HIGH_PRIORITY,
    N: NORMAL_PRIORITY,
    L: LOW_PRIORITY,
  }

  const boardName = '@next';

  const totalTasks = tasks.length;
  const completedTasksFraction = `$0/${totalTasks}`;

  console.log(`${BOARD(boardName)} ${STATISTICS(completedTasksFraction)}`);
  if (tasks.length !== 0) {
    const mappedTasks = tasks.map(task => {
      const urgentExclamationMark = task.priority === 'H' ? `${priorityColor['H'].bold(`(!)`)}` : ``;
      return `  ${STATISTICS(`${task.id}.`)} ${UNTICKED('☐')} ${priorityColor[task.priority](task.description)} ${TIME_STAMP(task.age)} ${urgentExclamationMark}`;
    });

    mappedTasks.map(task => console.log(task));

    const statisticsMessage = `${mappedTasks.length}% task${mappedTasks.length !== 1 ? 's' : ''} remaining.`;

    console.log(`\n${STATISTICS(statisticsMessage)}`);
  }
}

module.exports = renderNextTasks;