import { Task } from '../task'
import * as faker from 'faker'

describe('Taskのテスト', () => {
  let task: Task

  beforeEach(() => {
    task = new Task({
      id: faker.random.uuid(),
      title: faker.lorem.word(),
      content: faker.lorem.sentence(),
    })
  })

  it('getAllProperties()で全てのプロパティの取得が行えること', () => {
    expect(task.getAllProperties()).toHaveProperty('id')
    expect(task.getAllProperties()).toHaveProperty('title')
    expect(task.getAllProperties()).toHaveProperty('content')
  })
})
