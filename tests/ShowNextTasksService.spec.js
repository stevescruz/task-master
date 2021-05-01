const expect = require('expect');

const FakeTasksRepository = require('../src/repositories/FakeTasksRepository');
const ShowNextTasksService = require('../src/services/ShowNextTasksService');
const getTimeSince = require('../src/shared/utils/getTimeSince');

let fakeTasksRepository;
let showNextTasks;

describe('ShowNextTasks', function () {
    beforeEach(function () {
        fakeTasksRepository = new FakeTasksRepository();
        showNextTasks = new ShowNextTasksService(fakeTasksRepository);
    });

    it('should be able to list the next task of each priority if it exists', async function () {
        const taskData1 = {
            description: 'High priority task',
            priority: 'H',
        };
        const taskData2 = {
            description: 'Normal priority task',
        };

        const expectedTask1 = await fakeTasksRepository.create(taskData1);
        const expectedTask2 = await fakeTasksRepository.create(taskData2);

        const [nextTask1, nextTask2] = await showNextTasks.execute();

        expectedTask1.age = nextTask1.age;
        expectedTask2.age = nextTask2.age;

        expect(nextTask1).toStrictEqual(expectedTask1);
        expect(nextTask2).toStrictEqual(expectedTask2);
    });

    it("should return null when there aren't any next tasks", async function () {
        const expected = null;
        const nextTasks = await showNextTasks.execute();
        
        expect(nextTasks).toBe(expected);
    });

    it("should be able to update the listed next tasks' age to time ago since they were created", async function () {
        const taskData = {
            description: 'Buy 1 orange juice',
        };

        const daysAgo = 5;
        const mockDate = new Date();
        mockDate.setDate(mockDate.getDate() - (daysAgo));
        const expected = '5d';

        await fakeTasksRepository.create(taskData);

        const [nextTask] = await showNextTasks.execute();

        nextTask.age = getTimeSince(mockDate);

        expect(nextTask.age).toBe(expected);
    });
});