const expect = require('expect');

const FakeTasksRepository = require('../src/repositories/FakeTasksRepository');
const ListTasksService = require('../src/services/ListTasksService');

const Task = require('../src/models/Task');

let fakeTasksRepository;
let listTasks;

describe('ListTasks', function () {
    beforeEach(function () {
        fakeTasksRepository = new FakeTasksRepository();
        listTasks = new ListTasksService(fakeTasksRepository);
    });

    it('should be able to list all existing tasks', async function () {
        const pendingTaskData = {
            description: 'Buy 1 orange juice',
        };

        const finalizedTaskData = {
            id: 2,
            description: 'task for testing purposes',
            status: 'done',
        };

        let task = await fakeTasksRepository.create(pendingTaskData);
        await fakeTasksRepository.create(finalizedTaskData);
        let finalizedTask = await fakeTasksRepository.updateById(finalizedTaskData.id, { status: finalizedTaskData.status });


        const tasks = await listTasks.execute();
        const [retrievedPendingTask, retrievedFinalizedTask] = tasks;

        task.age = retrievedPendingTask.age;
        task = new Task(task);

        finalizedTask.age = retrievedFinalizedTask.age;
        finalizedTask = new Task(finalizedTask);

        const expectedTasks = [task, finalizedTask];

        expect(tasks).toStrictEqual(expectedTasks);
    });

    it('should be able to list existing tasks whose status is done', async function () {
        const pendingTaskData = {
            description: 'Buy 1 orange juice',
        };
        const finalizedTaskData = {
            id: 2,
            description: 'task for testing purposes',
            status: 'done'
        };
        const statusOption = 'done'

        await fakeTasksRepository.create(pendingTaskData);

        await fakeTasksRepository.create(finalizedTaskData);
        let finalizedTask = await fakeTasksRepository.updateById(finalizedTaskData.id, { status: finalizedTaskData.status });

        const tasks = await listTasks.execute(statusOption);
        const [retrievedFinalizedTask] = tasks;

        finalizedTask.age = retrievedFinalizedTask.age;
        finalizedTask = new Task(finalizedTask);

        const expectedTasks = [finalizedTask];

        expect(tasks).toStrictEqual(expectedTasks);
    });

    it('should be able to list existing tasks whose status is pending', async function () {
        const pendingTaskData = {
            description: 'Buy 1 orange juice',
        };
        const finalizedTaskData = {
            id: 2,
            description: 'task for testing purposes',
            status: 'done'
        };
        const statusOption = 'pending'

        let task = await fakeTasksRepository.create(pendingTaskData);

        await fakeTasksRepository.create(finalizedTaskData);
        await fakeTasksRepository.updateById(finalizedTaskData.id, { status: finalizedTaskData.status });

        const tasks = await listTasks.execute(statusOption);
        const [retrievedPendingTask] = tasks;

        task.age = retrievedPendingTask.age;
        task = new Task(task);

        const expectedTasks = [task];

        expect(tasks).toStrictEqual(expectedTasks);
    });

    it('should be able to list existing tasks whose tag property matches the provided tag', async function () {
        const tag = 'groceries';
        const untaggedTaskData = {
            description: 'buy a Nintendo 64',
        };
        const taggedTaskData = {
            id: 2,
            description: 'buy 1 orange juice',
            tag,
        };

        await fakeTasksRepository.create(untaggedTaskData);

        await fakeTasksRepository.create(taggedTaskData);
        let taggedTask = await fakeTasksRepository.updateById(taggedTaskData.id, { tag: taggedTaskData.tag });

        const tasks = await listTasks.execute(undefined, tag);
        const [retrievedTaggedTask] = tasks;

        taggedTask.age = retrievedTaggedTask.age;
        taggedTask = new Task(taggedTask);

        const expectedTasks = [taggedTask];

        expect(tasks).toStrictEqual(expectedTasks);
    });

    it('should be able to filter tasks by their tag property with the provided tag without it being case sensitive', async function () {
        const tag = 'GROCERIES';
        const untaggedTaskData = {
            description: 'buy a Nintendo 64',
        };
        const taggedTaskData = {
            id: 2,
            description: 'buy 1 orange juice',
            tag: 'groceries',
        };

        await fakeTasksRepository.create(untaggedTaskData);

        await fakeTasksRepository.create(taggedTaskData);
        let taggedTask = await fakeTasksRepository.updateById(taggedTaskData.id, { tag: taggedTaskData.tag });

        const tasks = await listTasks.execute(undefined, tag);
        const [retrievedTaggedTask] = tasks;

        taggedTask.age = retrievedTaggedTask.age;
        taggedTask = new Task(taggedTask);

        const expectedTasks = [taggedTask];

        expect(tasks).toStrictEqual(expectedTasks);
    });

    it('should not be able to list any tasks when none of their tag property match the provided tag', async function () {
        const tag = 'entertainment';
        const untaggedTaskData = {
            description: 'buy a Nintendo 64',
        };

        await fakeTasksRepository.create(untaggedTaskData);

        const tasks = await listTasks.execute(undefined, tag);

        const expectedTasks = [];

        expect(tasks).toStrictEqual(expectedTasks);
    });

    it('should not be able to list any tasks when there are no registered tasks', async function () {
        const tag = 'entertainment';

        const tasks = await listTasks.execute(undefined, tag);

        const expectedTasks = [];

        expect(tasks).toStrictEqual(expectedTasks);
    });

    it("should be able to update the listed tasks' age to time ago since they were created", async function () {
        const taskData = {
            id: 1,
            description: 'Buy 1 orange juice',
        };

        const yearsAgo = 2;
        const mockDate = new Date();
        mockDate.setFullYear(mockDate.getFullYear() - yearsAgo);

        await fakeTasksRepository.create(taskData);
        await fakeTasksRepository.updateById(taskData.id, { timestamp: mockDate });

        const [retrievedTask] = await listTasks.execute();

        const expected = '2y';

        expect(retrievedTask.age).toBe(expected);
    });
});