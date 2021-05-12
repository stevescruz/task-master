const { BOARD, STATISTICS, TIME_STAMP, UNTICKED, HIGH_PRIORITY, NORMAL_PRIORITY, LOW_PRIORITY } = require('../enums/MessageColorEnum');

function renderNextTasks(tasks) {

  const priorityColor = {
    H: HIGH_PRIORITY,
    N: NORMAL_PRIORITY,
    L: LOW_PRIORITY,
  }

  const priorityText = {
    H: HIGH_PRIORITY.bold(' HIGH'),
    N: NORMAL_PRIORITY.bold(' NORMAL'),
    L: LOW_PRIORITY.bold(' LOW'),
  }

  const boardName = 'next tasks';

  console.log(`${BOARD(boardName)}`);
  if (tasks.length !== 0) {
    const mappedTasks = tasks.map(task => {
      return `  ${STATISTICS(`${task.id}.`)} ${UNTICKED('☐')} ${priorityColor[task.priority](task.description)} ${TIME_STAMP(task.age)}${priorityText[task.priority]}`;
    });

    mappedTasks.map(task => console.log(task));
  }
}

module.exports = renderNextTasks;