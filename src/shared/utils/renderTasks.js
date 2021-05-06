const { 
  BOARD,
  STATISTICS,
  DESCRIPTION,
  TIME_STAMP,
  CHECKED,
  UNTICKED,
  TICK,
  LOW_PRIORITY,
  NORMAL_PRIORITY,
  HIGH_PRIORITY,
} = require('../enums/MessageColorEnum');

function renderTasks(tasks, title) {

  const itemSymbol = {
    pending: UNTICKED('☐'),
    done: TICK('✓'),
  };

  const descriptionColor = {
    done: CHECKED,
    pending: DESCRIPTION,
  }

  const priorityColor = {
    L: `${CHECKED(' (low)')}`,
    N: `${NORMAL_PRIORITY('')}`,
    H: `${HIGH_PRIORITY(' (!)')}`,
  };

  let completedTasks = 0;
  tasks.forEach(task => {
    if (task.status === 'done') {
      completedTasks += 1;
    }
  });

  const boardName = title ? `${title}` : 'tasks';

  const totalTasks = tasks.length;
  const pendingTasks = totalTasks - completedTasks;
  const completedTasksFraction = `${completedTasks}/${totalTasks}`;

  console.log(`${BOARD(boardName)} ${STATISTICS(completedTasksFraction)}`);
  if (tasks.length !== 0) {
    const mappedTasks = tasks.map(task => `  ${STATISTICS(`${task.id}.`)} ${itemSymbol[task.status]} ${descriptionColor[task.status](task.description)} ${TIME_STAMP(task.age)}${task.status === 'pending' ? priorityColor[task.priority] : ''}`);

    mappedTasks.map(task => console.log(task));

    const percentage = +((completedTasks * 100) / tasks.length).toFixed(2);
    const statisticsMessage = `${percentage}% completed`;

    console.log(`\n${STATISTICS(statisticsMessage)}`);
  }

  console.log(`${TICK(completedTasks)} ${STATISTICS(`done -`)} ${UNTICKED(pendingTasks)} ${STATISTICS(`pending`)}`);
}

module.exports = renderTasks;