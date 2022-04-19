import { UserStatusIdVO } from 'src/domain/entity/user-status-id-vo'

describe('UserStatusIdVOのテスト', () => {
  describe('正常系', () => {
    it('インスタンスの生成が行えること', () => {
      expect(new UserStatusIdVO('1')).toBeInstanceOf(UserStatusIdVO)
    })

    it('equals()で同一性の評価が行えること', () => {
      expect(new UserStatusIdVO('1').equals('1')).toBeTruthy()
      expect(new UserStatusIdVO('1').equals('2')).toBeFalsy()
    })

    it('値の取得が行えること', () => {
      expect(new UserStatusIdVO('1').getValue()).toBe('1')
    })
  })

  describe('異常系', () => {
    it('存在しない在籍ステータスでインスタンスの生成が行えないこと', () => {
      expect(() => new UserStatusIdVO('2')).toThrow()
    })
  })
})
