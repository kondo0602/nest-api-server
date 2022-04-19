import { RemovedUserStatusIdVO } from 'src/domain/entity/removed-user-status-id-vo'

describe('RemovedUserStatusIdのテスト', () => {
  describe('正常系', () => {
    it('インスタンスの生成が行えること', () => {
      expect(new RemovedUserStatusIdVO('2')).toBeInstanceOf(
        RemovedUserStatusIdVO,
      )
      expect(new RemovedUserStatusIdVO('3')).toBeInstanceOf(
        RemovedUserStatusIdVO,
      )
    })

    it('equals()で同一性の評価が行えること', () => {
      expect(new RemovedUserStatusIdVO('2').equals('2')).toBeTruthy()
      expect(new RemovedUserStatusIdVO('2').equals('3')).toBeFalsy()
    })

    it('値の取得が行えること', () => {
      expect(new RemovedUserStatusIdVO('2').getValue()).toBe('2')
    })
  })

  describe('異常系', () => {
    it('存在しない在籍ステータスでインスタンスの生成が行えないこと', () => {
      expect(() => new RemovedUserStatusIdVO('1')).toThrow()
    })
  })
})
