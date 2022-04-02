import { ParticipantOnTask, TaskStatus } from '../participant-on-task'
import { createRandomIdString } from 'src/util/random'

describe('ParticipantOnTaskのテスト', () => {
  let participantOnTask: ParticipantOnTask

  beforeEach(() => {
    participantOnTask = new ParticipantOnTask({
      id: createRandomIdString(),
      taskId: '1',
      participantId: '1',
    })
  })

  it('getStatus()でstatusIdの取得が行えること', () => {
    expect(participantOnTask.getAllProperties()).toHaveProperty('id')
  })

  it('getAllProperties()で全てのプロパティの取得が行えること', () => {
    expect(participantOnTask.getAllProperties()).toHaveProperty('id')
    expect(participantOnTask.getAllProperties()).toHaveProperty('statusId')
    expect(participantOnTask.getAllProperties()).toHaveProperty('taskId')
    expect(participantOnTask.getAllProperties()).toHaveProperty('participantId')
  })

  it('changeStatus()でステータスIDの更新が行えること', () => {
    participantOnTask.changeStatus('2')
    expect(participantOnTask.getStatus()).toBe('2')
  })

  it('ステータス: 3（完了）の課題のステータスIDの更新が行えないこと', () => {
    participantOnTask.changeStatus('3')
    expect(() => participantOnTask.changeStatus('1')).toThrow()
  })
})
