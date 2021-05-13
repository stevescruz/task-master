const {
  BOARD,
  STATISTICS,
  DESCRIPTION,
  TIME_STAMP,
  CHECKED,
  UNTICKED,
  TICK,
  HIGH_PRIORITY,
} = require('../enums/MessageColorEnum');

function renderTasks(tasks, title, showDate) {

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
    N: '',
    H: `${HIGH_PRIORITY(' (!)')}`,
  };

  if (showDate) {
    const tasksAtDatesMap = tasks.reduce((acc, task) => {

      const localeOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      };


      const date = new Date(task.timestamp)
        .toLocaleDateString(undefined, localeOptions);

      if (!acc.has(date)) {
        acc.set(date, [task]);
      } else {
        const tasksAtDate = acc.get(date);
        tasksAtDate.push(task);
      }

      return acc
    }, new Map());

    const tasksAtDates = Array.from(tasksAtDatesMap, taskAtDate => ({ [taskAtDate[0]]: taskAtDate[1] }));
    
    const tasksSortedByDate = tasksAtDates.sort((a, b) => {
      const dateA = new Date (Object.keys(a)[0])
        .getTime();
      const dateB = new Date (Object.keys(b)[0])
        .getTime();
      return dateA - dateB;
    });

    tasksSortedByDate.forEach(tasksAtDate => {
      const date = (Object.keys(tasksAtDate)).pop();
      const tasks = Object.values(tasksAtDate).pop();

      const localeOptions = {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      };

      let [weekday, monthAndDay, year] = new Date(date)
        .toLocaleDateString(undefined, localeOptions)
        .split(', ');
      const formattedDate = `${weekday}, ${monthAndDay} ${year}`;

      console.log();
      renderTasks(tasks, formattedDate, !showDate);
    });

    return;
  }

  let completedTasks = 0;
  tasks.forEach(task => {
    if (task.status === 'done') {
      completedTasks += 1;
    }
  });

  const boardName = title ? `${title.toLowerCase()}` : 'tasks';

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