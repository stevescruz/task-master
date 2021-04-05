const expect = require('expect');

const FakeTasksRepository = require('../src/repositories/FakeTasksRepository');

const FinalizeTaskService = require('../src/services/FinalizeTaskService');

let fakeTasksRepository;
let finalizeTask;

describe('FinalizeTask', function () {
    beforeEach(function () {
        fakeTasksRepository = new FakeTasksRepository();
        finalizeTask = new FinalizeTaskService(fakeTasksRepository);
    });

    it("should be able to mark a task as done by providing the task's corresponding id", async function () {
        const taskData = {
            description: 'Buy 1 orange juice'
        };
        const expectedStatus = 'done';

        fakeTasksRepository.createTask(taskData);

        const updatedTask = await finalizeTask.execute(1);
        expect(updatedTask.status).toBe(expectedStatus);
    });

    it("should not be able to mark a task as done without providing an id", async function () {
        await expect(finalizeTask.execute()).rejects.toBeInstanceOf(Error);
    });

    it("should not be able to provide an id that does not correspond with any tasks", async function () {
        await expect(finalizeTask.execute(2)).rejects.toBeInstanceOf(Error);
    });
});