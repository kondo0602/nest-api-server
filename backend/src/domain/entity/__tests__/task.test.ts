import { Task } from '../task'
import { createRandomIdString } from 'src/util/random'

describe('Taskのテスト', () => {
  let task: Task

  beforeEach(() => {
    task = new Task({
      id: createRandomIdString(),
      title: '課題1',
      content: 'DB設計の課題1です.',
    })
  })

  it('getAllProperties()で全てのプロパティの取得が行えること', () => {
    expect(task.getAllProperties()).toHaveProperty('id')
    expect(task.getAllProperties()).toHaveProperty('title')
    expect(task.getAllProperties()).toHaveProperty('content')
  })
})
