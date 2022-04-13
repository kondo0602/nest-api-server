import { ParticipantStatusIdVO } from 'src/domain/entity/participant-status-id-vo'

describe('ParticipantStatusIdVOのテスト', () => {
  describe('正常系', () => {
    it('インスタンスの生成が行えること', () => {
      expect(new ParticipantStatusIdVO('1')).toBeInstanceOf(
        ParticipantStatusIdVO,
      )
    })

    it('equals()で同一性の評価が行えること', () => {
      expect(new ParticipantStatusIdVO('1').equals('1')).toBeTruthy()
      expect(new ParticipantStatusIdVO('1').equals('2')).toBeFalsy()
    })

    it('値の取得が行えること', () => {
      expect(new ParticipantStatusIdVO('1').getValue()).toBe('1')
    })
  })

  describe('異常系', () => {
    it('存在しない在籍ステータスでインスタンスの生成が行えないこと', () => {
      expect(() => new ParticipantStatusIdVO('2')).toThrow()
    })
  })
})
