const expect = require('expect');

const FakeTasksRepository = require('../src/repositories/FakeTasksRepository');
const CreateTaskService = require('../src/services/CreateTaskService');

const Task = require('../src/models/Task');

let fakeTasksRepository;
let createTask;

describe('CreateTask', function () {
    beforeEach(function () {
        fakeTasksRepository = new FakeTasksRepository();
        createTask = new CreateTaskService(fakeTasksRepository);
    });

    it('should be able to create a task with a given description', async function () {
        const taskData = {
            description: 'Buy 1 orange juice',
        };

        const task = await createTask.execute(taskData);

        const expectedTask = new Task({
            id: 1,
            description: 'Buy 1 orange juice',
            age: task.age,
            status: 'pending',
            priority: 'N',
        });

        expect(task).toStrictEqual(expectedTask);
    });

    it('should be able to assign an id to a task based on the number of already existing tasks', async function () {
        const taskData1 = {
            description: 'task for testing purposes'
        };
        const taskData2 = {
            description: 'Buy 1 orange juice',
        };

        await createTask.execute(taskData1);
        const task = await createTask.execute(taskData2);

        const expectedTask = new Task({
            id: 2,
            description: 'Buy 1 orange juice',
            age: task.age,
            status: 'pending',
            priority: 'N',
        });

        expect(task).toStrictEqual(expectedTask);
    });

    it('should not be able to create a task without providing a description', async function () {
        await expect(createTask.execute()).rejects.toBeInstanceOf(Error);
    });

    it("should set a newly created task's priority to N by default if no priority is provided", async function () {
        const taskData = {
            description: 'Buy 1 orange juice',
        }

        const task = await createTask.execute(taskData);

        const expectedTask = {
            priority: 'N',
        };

        expect(task).toHaveProperty('priority');
        expect(task.priority).toBe(expectedTask.priority);
    });

    it('should be able to create a task and set its priority', async function () {
        const taskData = {
            description: 'Buy 1 orange juice',
            priority: 'H',
        }

        const task = await createTask.execute(taskData);

        const expectedTask = {
            priority: 'H',
        };

        expect(task).toHaveProperty('priority');
        expect(task.priority).toBe(expectedTask.priority);
    });

    it("should not be able to create a task and set a priority that isn't L, N or H", async function () {
        const taskData = {
            description: 'Buy 6 eggs',
            priority: 'non-existent priority',
        };

        await expect(createTask.execute(taskData)).rejects.toBeInstanceOf(Error);
    });
});
