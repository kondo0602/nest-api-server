import { RemovedParticipant } from 'src/domain/entity/removed-participant'
import { RemovedParticipantStatus } from 'src/domain/entity/removed-participant-status-id-vo'
import { createRandomIdString } from 'src/util/random'

describe('RemovedParticipantのテスト', () => {
  let removedParticipant: RemovedParticipant

  beforeEach(() => {
    removedParticipant = new RemovedParticipant({
      id: createRandomIdString(),
      name: 'Yamada Taro',
      email: 'yamada@example.com',
      statusId: RemovedParticipantStatus.Pending,
    })
  })

  describe('正常系', () => {
    it('getId()でidの取得が行えること', () => {
      expect(removedParticipant.getId()).toMatch(/[0-9|a-z|-]{36}/)
    })

    it('getName()で参加者名の取得が行えること', () => {
      expect(removedParticipant.getName()).toBe('Yamada Taro')
    })

    it('getEmail()でメールアドレスの取得が行えること', () => {
      expect(removedParticipant.getEmail()).toBe('yamada@example.com')
    })

    it('getStatusId()で在籍ステータスの取得が行えること', () => {
      expect(removedParticipant.getStatusId()).toBe(
        RemovedParticipantStatus.Pending,
      )
    })

    it('getAllProperties()で全てのプロパティの取得が行えること', () => {
      expect(removedParticipant.getAllProperties()).toHaveProperty('id')
      expect(removedParticipant.getAllProperties()).toHaveProperty('name')
      expect(removedParticipant.getAllProperties()).toHaveProperty('email')
      expect(removedParticipant.getAllProperties()).toHaveProperty('statusId')
    })

    it('updateStatusId()で在籍ステータスの更新が行えること', () => {
      removedParticipant.updateStatusId(RemovedParticipantStatus.Withdrawn)

      expect(removedParticipant.getStatusId()).toBe(
        RemovedParticipantStatus.Withdrawn,
      )
    })
  })

  describe('異常系', () => {
    it('updateStatusId()で在籍ステータスの空更新が行えないこと', () => {
      expect(() =>
        removedParticipant.updateStatusId(RemovedParticipantStatus.Pending),
      ).toThrow()
    })
  })
})
