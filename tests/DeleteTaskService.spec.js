const expect = require('expect');

const FakeTasksRepository = require('../src/repositories/FakeTasksRepository');
const DeleteTaskService = require('../src/services/DeleteTaskService');

const Task = require('../src/models/Task');

let fakeTasksRepository;
let deleteTask;

describe('DeleteTask', function () {
    beforeEach(function () {
        fakeTasksRepository = new FakeTasksRepository();
        deleteTask = new DeleteTaskService(fakeTasksRepository);
    });

    it('should be able to delete a task by providing its corresponding id', async function () {
        const taskData1 = {
            description: 'task for testing purposes'
        };
        const taskData2 = {
            description: 'Buy 1 orange juice'
        };
        const id = 2;

        const remainingTask = await fakeTasksRepository.create(taskData1);
        await fakeTasksRepository.create(taskData2);

        const removedTask = await deleteTask.execute(id);

        const expectedTask = new Task({
            id,
            description: 'Buy 1 orange juice',
            age: removedTask.age,
            status: 'pending',
            priority: 'N',
        });

        expect(removedTask).toStrictEqual(expectedTask);

        const tasks = await fakeTasksRepository.list();
        const expectedTasks = [new Task(remainingTask)];

        expect(tasks).toStrictEqual(expectedTasks);
    });

    it('should be able to update the id of the remaining tasks after removing a task reflecting their new position in the tasks array', async function () {
        const taskData1 = {
            description: 'Buy 1 orange juice'
        };
        const taskData2 = {
            description: 'task for testing purposes'
        };
        const id = 1;

        await fakeTasksRepository.create(taskData1);
        await fakeTasksRepository.create(taskData2);

        await deleteTask.execute(id);

        const [remainingTask] = await fakeTasksRepository.list();
        const expectedTask = new Task({
            id,
            description: 'task for testing purposes',
            age: remainingTask.age,
            status: 'pending',
            priority: 'N',
        });

        expect(remainingTask).toStrictEqual(expectedTask);
    });

    it('should not be able to delete a task without providing an id', async function () {
        const taskData = {
            description: 'Buy 1 orange juice'
        };

        await fakeTasksRepository.create(taskData);

        await expect(deleteTask.execute()).rejects.toBeInstanceOf(Error);
    });

    it('should not be able to delete a non-existent task', async function () {
        const taskData = {
            description: 'Buy 1 orange juice'
        };
        const nonExistentId = 2;

        await fakeTasksRepository.create(taskData);

        await expect(deleteTask.execute(nonExistentId)).rejects.toBeInstanceOf(Error);
    });

    it("should be able to update the removed task's age to time ago since it was created", async function () {
        const monthsAgo = 2;
        const mockDate = new Date();
        mockDate.setMonth(mockDate.getMonth() - (monthsAgo + 1));

        const taskData = {
            id: 1,
            description: 'Buy 1 orange juice',
        };

        await fakeTasksRepository.create(taskData);
        await fakeTasksRepository.updateById(taskData.id, { age: mockDate });

        const removedTask = await deleteTask.execute(taskData.id);

        const expected = '2m'

        await expect(removedTask.age).toBe(expected);
    });
});