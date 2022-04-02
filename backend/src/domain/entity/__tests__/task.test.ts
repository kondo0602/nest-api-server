import { Task } from '../task'
import { createRandomIdString } from 'src/util/random'

describe('Taskのテスト', () => {
  let task: Task

  beforeEach(() => {
    task = new Task({
      id: createRandomIdString(),
      content: '課題1',
    })
  })

  it('getAllProperties()で全てのプロパティの取得が行えること', () => {
    expect(task.getAllProperties()).toHaveProperty('id')
    expect(task.getAllProperties()).toHaveProperty('content')
  })
})
