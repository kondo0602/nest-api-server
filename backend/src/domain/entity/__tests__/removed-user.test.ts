import { RemovedUser } from 'src/domain/entity/removed-user'
import { RemovedUserStatus } from 'src/domain/entity/removed-user-status-id-vo'
import { DomainBadRequestException } from 'src/domain/__shared__/exception/domain-exception'
import { createRandomIdString } from 'src/util/random'

describe('RemovedUserのテスト', () => {
  let removedUser: RemovedUser

  beforeEach(() => {
    removedUser = new RemovedUser({
      id: createRandomIdString(),
      name: 'Yamada Taro',
      email: 'yamada@example.com',
      statusId: RemovedUserStatus.Pending,
    })
  })

  describe('正常系', () => {
    it('getId()でidの取得が行えること', () => {
      expect(removedUser.getId()).toMatch(/[0-9|a-z|-]{36}/)
    })

    it('getName()で参加者名の取得が行えること', () => {
      expect(removedUser.getName()).toBe('Yamada Taro')
    })

    it('getEmail()でメールアドレスの取得が行えること', () => {
      expect(removedUser.getEmail()).toBe('yamada@example.com')
    })

    it('getStatusId()で在籍ステータスの取得が行えること', () => {
      expect(removedUser.getStatusId()).toBe(RemovedUserStatus.Pending)
    })

    it('getAllProperties()で全てのプロパティの取得が行えること', () => {
      expect(removedUser.getAllProperties()).toHaveProperty('id')
      expect(removedUser.getAllProperties()).toHaveProperty('name')
      expect(removedUser.getAllProperties()).toHaveProperty('email')
      expect(removedUser.getAllProperties()).toHaveProperty('statusId')
    })

    it('updateStatusId()で在籍ステータスの更新が行えること', () => {
      removedUser.updateStatusId(RemovedUserStatus.Withdrawn)

      expect(removedUser.getStatusId()).toBe(RemovedUserStatus.Withdrawn)
    })
  })

  describe('異常系', () => {
    it('updateStatusId()で在籍ステータスの空更新が行えないこと', () => {
      expect(() =>
        removedUser.updateStatusId(RemovedUserStatus.Pending),
      ).toThrow(DomainBadRequestException)
    })
  })
})
