const { BOARD, STATISTICS, TIME_STAMP, UNTICKED, HIGH_PRIORITY, NORMAL_PRIORITY, LOW_PRIORITY } = require('../enums/MessageColorEnum');

function renderNextTasks(tasks) {

  const priorityColor = {
    H: HIGH_PRIORITY,
    N: NORMAL_PRIORITY,
    L: LOW_PRIORITY,
  }

  const boardName = '@next';

  console.log(`${BOARD(boardName)}`);
  if (tasks.length !== 0) {
    const mappedTasks = tasks.map(task => {
      const urgentExclamationMark = task.priority === 'H' ? `${priorityColor['H'].bold(`(!)`)}` : ``;
      return `  ${STATISTICS(`${task.id}.`)} ${UNTICKED('☐')} ${priorityColor[task.priority](task.description)} ${TIME_STAMP(task.age)} ${urgentExclamationMark}`;
    });

    mappedTasks.map(task => console.log(task));
  }
}

module.exports = renderNextTasks;