const expect = require('expect');

const FakeTasksRepository = require('../src/repositories/FakeTasksRepository');
const UntagTaskService = require('../src/services/UntagTaskService');

let fakeTasksRepository;
let untagTask;

describe('UntagTask', function () {
  beforeEach(function () {
    fakeTasksRepository = new FakeTasksRepository();
    untagTask = new UntagTaskService(fakeTasksRepository);
  });

  it('should be able to untag a task by providing its corresponding id', async function () {
    const taskData = {
      id: 1,
      description: 'Buy 1 orange juice',
      status: 'pending',
      priority: 'N',
    };
    const tag = 'groceries';

    await fakeTasksRepository.create(taskData);
    await fakeTasksRepository.updateById(taskData.id, { tag });
    const untaggedTag = await untagTask.execute(taskData.id);

    expect(untaggedTag.id).toBe(taskData.id);
    expect(untaggedTag.description).toBe(taskData.description);
    expect(untaggedTag.id).toBe(taskData.id);
    expect(untaggedTag.status).toBe(taskData.status);
    expect(untaggedTag.priority).toBe(taskData.priority);
    expect(untaggedTag).not.toHaveProperty('tag');
  });

  it('should not be able to untag a task without providing its corresponding id', async function () {
    const taskData = {
      id: 1,
      description: 'Buy 1 orange juice',
    };
    const tag = 'groceries';

    await fakeTasksRepository.create(taskData);
    await fakeTasksRepository.updateById(taskData.id, { tag });

    await expect(untagTask.execute()).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to untag a task that isn't tagged", async function () {
    const taskData = {
      id: 1,
      description: 'Buy 1 orange juice',
    };

    await fakeTasksRepository.create(taskData);

    await expect(untagTask.execute(taskData.id)).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to tag a non-existent task', async function () {
    const taskData = {
      id: 1,
    };

    await expect(untagTask.execute(taskData.id)).rejects.toBeInstanceOf(Error);
  });

  it("should be able to update the untagged task's age to time ago since it was created", async function () {
    const taskData = {
      id: 1,
      description: 'Buy 1 orange juice',
    };
    const tag = 'groceries';

    const minutesAgo = 5;
    const mockDate = new Date();
    mockDate.setMinutes(mockDate.getMinutes() - minutesAgo);
    const expected = '5min';

    await fakeTasksRepository.create(taskData);
    await fakeTasksRepository.updateById(taskData.id, { age: mockDate, tag });

    const untaggedTask = await untagTask.execute(taskData.id);

    expect(untaggedTask.age).toBe(expected);
  });
});