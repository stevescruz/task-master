const expect = require('expect');

const FakeTasksRepository = require('../src/repositories/FakeTasksRepository');

const ListTasksService = require('../src/services/ListTasksService');

const Task = require('../src/models/Task');

let listTasks;

describe('ListTasks', function () {
    beforeEach(function () {
        fakeTasksRepository = new FakeTasksRepository();
        listTasks = new ListTasksService(fakeTasksRepository);
    });

    it('should be able to list exising tasks whose status are not done', async function () {
        const taskData1 = {
            description: 'Buy 1 orange juice',
        };

        const taskData2 = {
            description: 'task for testing purposes',
        };

        let task = await fakeTasksRepository.create(taskData1);
        
        const finalizedTask = await fakeTasksRepository.create(taskData2);
        finalizedTask.status = 'done';
        await fakeTasksRepository.updateById(2, finalizedTask);

        const tasks = await listTasks.execute();
        const [retrievedTask] = tasks;

        task.age = retrievedTask.age;
        task = new Task(task);

        const expectedTasks = [task];

        expect(tasks).toStrictEqual(expectedTasks);
    });

    it('should be able to list all existing tasks, including those whose status are done. (After passing a truthy value to the showAll flag', async function () {
        const taskData1 = {
            description: 'Buy 1 orange juice',
        };

        const taskData2 = {
            description: 'task for testing purposes',
        };

        let task = await fakeTasksRepository.create(taskData1);
        let finalizedTask = await fakeTasksRepository.create(taskData2);
        finalizedTask.status = 'done';
        finalizedTask = await fakeTasksRepository.updateById(2, finalizedTask);

        const tasks = await listTasks.execute(true);
        const [retrievedTask1, retrievedTask2] = tasks;

        task.age = retrievedTask1.age;
        task = new Task(task);

        finalizedTask.age = retrievedTask2.age;
        finalizedTask = new Task(finalizedTask);

        const expectedTasks = [task, finalizedTask];

        expect(tasks).toStrictEqual(expectedTasks);
    });

    it("should be able to update the listed tasks' age to time ago since they were created", async function () {
        const taskData = {
            description: 'Buy 1 orange juice',
        };

        const yearsAgo = 2;
        const mockDate = new Date();
        mockDate.setFullYear(mockDate.getFullYear() - (yearsAgo + 1));

        let task = await fakeTasksRepository.create(taskData);
        task.age = mockDate;
        task = await fakeTasksRepository.updateById(1, task);

        const tasks = await listTasks.execute();
        const [retrievedTask] = tasks;

        task.age = retrievedTask.age;
        task = new Task(task);

        const expectedTasks = [task];

        expect(tasks).toStrictEqual(expectedTasks);
    });
});