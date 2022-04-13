import { RemovedParticipantStatusIdVO } from 'src/domain/entity/removed-participant-status-id-vo'

describe('RemovedParticipantStatusIdのテスト', () => {
  describe('正常系', () => {
    it('インスタンスの生成が行えること', () => {
      expect(new RemovedParticipantStatusIdVO('2')).toBeInstanceOf(
        RemovedParticipantStatusIdVO,
      )
      expect(new RemovedParticipantStatusIdVO('3')).toBeInstanceOf(
        RemovedParticipantStatusIdVO,
      )
    })

    it('equals()で同一性の評価が行えること', () => {
      expect(new RemovedParticipantStatusIdVO('2').equals('2')).toBeTruthy()
      expect(new RemovedParticipantStatusIdVO('2').equals('3')).toBeFalsy()
    })

    it('値の取得が行えること', () => {
      expect(new RemovedParticipantStatusIdVO('2').getValue()).toBe('2')
    })
  })

  describe('異常系', () => {
    it('存在しない在籍ステータスでインスタンスの生成が行えないこと', () => {
      expect(() => new RemovedParticipantStatusIdVO('1')).toThrow()
    })
  })
})
