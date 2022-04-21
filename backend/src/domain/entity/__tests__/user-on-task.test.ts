import { UserOnTask } from 'src/domain/entity/user-on-task'
import { DomainBadRequestException } from 'src/domain/__shared__/exception/domain-exception'
import { createRandomIdString } from 'src/util/random'

describe('UserOnTaskのテスト', () => {
  let userOnTask: UserOnTask

  beforeEach(() => {
    userOnTask = new UserOnTask({
      id: createRandomIdString(),
      taskId: '1',
      userId: '1',
    })
  })

  it('getStatus()でstatusIdの取得が行えること', () => {
    expect(userOnTask.getAllProperties()).toHaveProperty('id')
  })

  it('getAllProperties()で全てのプロパティの取得が行えること', () => {
    expect(userOnTask.getAllProperties()).toHaveProperty('id')
    expect(userOnTask.getAllProperties()).toHaveProperty('statusId')
    expect(userOnTask.getAllProperties()).toHaveProperty('taskId')
    expect(userOnTask.getAllProperties()).toHaveProperty('userId')
  })

  it('changeStatus()でステータスIDの更新が行えること', () => {
    userOnTask.changeStatus('2')
    expect(userOnTask.getStatus()).toBe('2')
  })

  it('ステータス: 3（完了）の課題のステータスIDの更新が行えないこと', () => {
    userOnTask.changeStatus('3')
    expect(() => userOnTask.changeStatus('1')).toThrow(
      DomainBadRequestException,
    )
  })
})
