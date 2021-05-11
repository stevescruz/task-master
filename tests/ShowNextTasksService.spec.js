const expect = require('expect');

const FakeTasksRepository = require('../src/repositories/FakeTasksRepository');
const ShowNextTasksService = require('../src/services/ShowNextTasksService');

let fakeTasksRepository;
let showNextTasks;

describe('ShowNextTasks', function () {
    beforeEach(function () {
        fakeTasksRepository = new FakeTasksRepository();
        showNextTasks = new ShowNextTasksService(fakeTasksRepository);
    });

    it('should be able to list the next task of each priority if it exists', async function () {
        const highPriorityTaskData = {
            description: 'High priority task',
            priority: 'H',
        };
        const normalPriorityTaskData = {
            description: 'Normal priority task',
        };

        const expectedTaskHigh = await fakeTasksRepository.create(highPriorityTaskData);
        const expectedTaskNormal = await fakeTasksRepository.create(normalPriorityTaskData);

        const [firstNextTask, secondNextTask] = await showNextTasks.execute();

        expectedTaskHigh.age = firstNextTask.age;
        expectedTaskNormal.age = secondNextTask.age;

        expect(firstNextTask).toStrictEqual(expectedTaskHigh);
        expect(secondNextTask).toStrictEqual(expectedTaskNormal);
    });

    it("should return null when there aren't any next tasks", async function () {
        const expected = null;
        const nextTasks = await showNextTasks.execute();

        expect(nextTasks).toBe(expected);
    });

    it("should be able to update the next tasks' age to time ago since they were created", async function () {
        const taskData = {
            id: 1,
            description: 'Buy 1 orange juice',
        };

        const daysAgo = 5;
        const mockDate = new Date();
        mockDate.setDate(mockDate.getDate() - daysAgo);
        const expected = '5d';

        await fakeTasksRepository.create(taskData);
        await fakeTasksRepository.updateById(taskData.id, { timestamp: mockDate });

        const [nextTask] = await showNextTasks.execute();

        expect(nextTask.age).toBe(expected);
    });
});