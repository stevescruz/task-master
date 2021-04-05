const expect = require('expect');

const FakeTasksRepository = require('../src/repositories/FakeTasksRepository');

const CreateTaskService = require('../src/services/createTaskService');

let fakeTasksRepository;
let createTaskService;

describe('CreateTask', function () {
    beforeEach(function () {
        fakeTasksRepository = new FakeTasksRepository();
        createTaskService = new CreateTaskService(fakeTasksRepository);
    });

    it('should be able to create a task with a given description', async function () {
        const taskData = {
            description: 'Buy 1 orange juice'
        };

        const task = await createTaskService.execute(taskData);

        const expectedTask = {
            id: 1,
            description: 'Buy 1 orange juice',
            age: task.age,
            status: 'pending',
            priority: 'N',
        }

        expect(task).toStrictEqual(expectedTask);
    });

    it('should assign to a task an id based on the number of already existing tasks', async function () {
        const taskData1 = {
            description: 'task for testing purposes'
        };
        const taskData2 = {
            description: 'Buy 1 orange juice'
        };

        await createTaskService.execute(taskData1);
        const task = await createTaskService.execute(taskData2);

        const expectedTask = {
            id: 2,
            description: 'Buy 1 orange juice',
            age: task.age,
            status: 'pending',
            priority: 'N',
        }

        expect(task).toStrictEqual(expectedTask);
    });

    it('should not be able to create a task without providing a description', async function () {
        await expect(createTaskService.execute()).rejects.toBeInstanceOf(Error);
    });

    it("should set a newly created task's priority to N by default if no priority is provided", async function () {
        const taskData = {
            description: 'Buy 1 orange juice',
        }

        const task = await createTaskService.execute(taskData);

        const expectedTask = {
            priority: 'N',
        }

        expect(task).toHaveProperty('priority');
        expect(task.priority).toBe(expectedTask.priority);
    });

    it('should be able to create a task and set its priority', async function () {
        const taskData = {
            description: 'Buy 1 orange juice',
            priority: 'H',
        }

        const task = await createTaskService.execute(taskData);

        const expectedTask = {
            priority: 'H',
        }

        expect(task).toHaveProperty('priority');
        expect(task.priority).toBe(expectedTask.priority);
    });
    
    it("should not be able to create a task and set a priority that isn't L, N or H", async function () {
        const taskData = {
            description: 'Buy 6 eggs',
            priority: 'non-existent priority',
        };

        await expect(createTaskService.execute(taskData)).rejects.toBeInstanceOf(Error);
    });
});
