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
        }
        
        const task = await createTaskService.execute(taskData);

        const expectedTask = {
            description: 'Buy 1 orange juice',
            age: task.age,
            status: 'pending',
            priority: 'N',
        }

        expect(task).toStrictEqual(expectedTask);
    });
});
