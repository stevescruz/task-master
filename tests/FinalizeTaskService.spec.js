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

    it("should be able to mark a task as done by providing its corresponding id", async function () {
        const taskData = {
            id: 1,
            description: 'Buy 1 orange juice'
        };
        const expectedStatus = 'done';

        fakeTasksRepository.create(taskData);

        const updatedTask = await finalizeTask.execute(taskData.id);
        expect(updatedTask.status).toBe(expectedStatus);
    });

    it("should not be able to mark a task as done without providing an id", async function () {
        const taskData = {
            description: 'Buy 1 orange juice'
        };

        fakeTasksRepository.create(taskData);

        await expect(finalizeTask.execute()).rejects.toBeInstanceOf(Error);
    });

    it("should not be able to mark a non-existent task as done", async function () {
        const id = 2;
        await expect(finalizeTask.execute(id)).rejects.toBeInstanceOf(Error);
    });

    it("should be able to update the finalized task's age to time ago since it was created", async function () {
        const hoursAgo = 5;
        const mockDate = new Date();
        mockDate.setHours(mockDate.getHours() - hoursAgo);

        const taskData = {
            id: 1,
            description: 'Buy 1 orange juice',
        };

        await fakeTasksRepository.create(taskData);
        await fakeTasksRepository.updateById(taskData.id, { age: mockDate });

        const finalizedTask = await finalizeTask.execute(taskData.id);

        const expected = '5h'

        await expect(finalizedTask.age).toBe(expected);
    });
});