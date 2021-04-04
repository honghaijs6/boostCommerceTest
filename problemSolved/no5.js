console.clear();

("use strict");

/**
 * Used for executing tasks concurrently
 *
 * enqueue function
 * - Return a promise which will be executed
 *
 * @param {integer}   numConcurrentTasks   Number of concurrent tasks
 * @param {function}  getTask              Function will be called to enqueue task, will return any available task
 *
 * @return {object}
 */

let countMe;

const run = (numConcurrentTasks, tasks, getTask) => {
  // TO DO: Implement this function to process tasks concurrently
  // For example, if there are 10 tasks in total and there should be 3 concurrently tasks:
  // - At the first step: the task 1, 2, 3 must start immediately.
  // - If any task is done, the next task musts start immediately.
  // - After the last task starts, there must be no more queueing up.

  let numOfWorkers = 0;
  let taskIndex = 0;

  return new Promise((done) => {
    function handleResult() {
      return () => {
        numOfWorkers--;
        getNextTask();
      };
    }

    const getNextTask = () => {
      if (numOfWorkers < numConcurrentTasks && taskIndex < tasks.length) {
        tasks[taskIndex]()
          .then(handleResult(taskIndex))
          .catch(handleResult(taskIndex));

        taskIndex++;
        numOfWorkers++;
        getNextTask();
      } else if (numOfWorkers === 0) {
        done(tasks);
      }
    };

    getNextTask();
  });
};


/**
 * This function is used to stimulate task processing time
 */
const waitFor = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
};

/**
 * Main
 */
const main = async () => {
  const startedAt = Date.now();

  // Define 10 tasks, task i_th would take i*2 seconds to finish
  const tasks = [];
  for (let i = 1; i <= 10; i++) {
    const task = async () => {
      console.log(`Task ${i} started, done in ${i * 2}s`);
      await waitFor(i * 2000);
      console.log(`Task ${i} DONE!`);
    };
    tasks.push(task);
  }

  console.log(`taskQueueProcessor() START, Processing 3 tasks concurrently`);
  // Run 3 tasks concurrently
  await run(3, tasks);
  

  //await run(3, tasks);
  console.log(`DONE after ${Date.now() - startedAt}ms`);
};

main().catch((e) => console.log(e.stack));
