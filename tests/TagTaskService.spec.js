const expect = require('expect');

const FakeTasksRepository = require('../src/repositories/FakeTasksRepository');
const TagTaskService = require('../src/services/TagTaskService');
const getTimeSince = require('../src/shared/utils/getTimeSince');

let fakeTasksRepository;
let tagTask;

describe('TagTask', function () {
  beforeEach(function () {
    fakeTasksRepository = new FakeTasksRepository();
    tagTask = new TagTaskService(fakeTasksRepository);
  });

  it('should be able to tag a task with the provided tag', async function () {
    const taskData = {
      id: 1,
      description: 'Buy 1 orange juice',
      status: 'pending',
      priority: 'N',
    };

    const tag = 'groceries';

    await fakeTasksRepository.create(taskData);

    const taggedTask = await tagTask.execute(taskData.id, tag);

    expect(taggedTask.id).toBe(taskData.id);
    expect(taggedTask.description).toBe(taskData.description);
    expect(taggedTask.id).toBe(taskData.id);
    expect(taggedTask.status).toBe(taskData.status);
    expect(taggedTask.priority).toBe(taskData.priority);
    expect(taggedTask.tag).toBe(tag);
  });

  it('should not be able to tag a task without providing an id', async function () {
    const taskData = {
      description: 'Buy 1 orange juice',
    };

    await fakeTasksRepository.create(taskData);

    await expect(tagTask.execute()).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to tag a task without providing a tag', async function () {
    const taskData = {
      id: 1,
      description: 'Buy 1 orange juice',
    };

    await fakeTasksRepository.create(taskData);

    await expect(tagTask.execute(taskData.id)).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to tag a non-existent task', async function () {
    const taskData = {
      id: 1,
      tag: 'groceries',
    };

    await expect(tagTask.execute(taskData.id, taskData.tag)).rejects.toBeInstanceOf(Error);
  });

  it("should be able to update an already tagged task's tag property", async function () {
    const taskData = {
      id: 1,
      description: 'Buy 1 orange juice',
      tag: 'groceries',
    };
    const newTag = 'food';

    const task = await fakeTasksRepository.create(taskData);
    task.tag = taskData.tag;
    const updatedTask = await tagTask.execute(taskData.id, newTag);

    expect(updatedTask.tag).toBe(newTag);
  });

  it("should be able to update the tagged task's age to time ago since it was created", async function () {
    const taskData = {
      id: 1,
      description: 'Buy 1 orange juice',
    };
    const tag = 'groceries';

    const daysAgo = 5;
    const mockDate = new Date();
    mockDate.setDate(mockDate.getDate() - (daysAgo));
    const expected = '5d';

    await fakeTasksRepository.create(taskData);

    const taggedTask = await tagTask.execute(taskData.id, tag);

    taggedTask.age = getTimeSince(mockDate);

    expect(taggedTask.age).toBe(expected);
  });
});