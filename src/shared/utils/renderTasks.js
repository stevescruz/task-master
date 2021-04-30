const { BOARD, STATISTICS, DESCRIPTION, TIME_STAMP, CHECKED, UNTICKED, TICK, NOTE } = require('../enums/MessageColorEnum');

function renderTasks(tasks, title) {

  const itemSymbol = {
    pending: UNTICKED('☐'),
    done: TICK('✓'),
    note: NOTE('•'),
  };

  const descriptionColor = {
    done: CHECKED,
    pending: DESCRIPTION,
  }

  let completedTasks = 0;
  tasks.forEach(task => {
    if (task.status === 'done') {
      completedTasks += 1;
    }
  });

  const boardName = title ? `@${title}` : '@tasks';

  const totalTasks = tasks.length;
  const pendingTasks = totalTasks - completedTasks;
  const completedTasksFraction = `${completedTasks}/${totalTasks}`;

  console.log(`${BOARD(boardName)} ${STATISTICS(completedTasksFraction)}`);
  if (tasks.length !== 0) {
    const mappedTasks = tasks.map(task => `  ${STATISTICS(`${task.id}.`)} ${itemSymbol[task.status]} ${descriptionColor[task.status](task.description)} ${TIME_STAMP(task.age)}`);

    mappedTasks.map(task => console.log(task));

    const percentage = +((completedTasks * 100) / tasks.length).toFixed(2);
    const statisticsMessage = `${percentage}% of tasks completed.`;

    console.log(`\n${STATISTICS(statisticsMessage)}`);
  }
  
  console.log(`${TICK(completedTasks)} ${STATISTICS(`done -`)} ${UNTICKED(pendingTasks)} ${STATISTICS(`pending -`)} ${NOTE('0')} ${STATISTICS('notes')}`);
}

module.exports = renderTasks;