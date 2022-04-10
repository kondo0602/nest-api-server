import { ParticipantEmailVO } from 'src/domain/entity/participant-email-vo'

describe('ParticipantEmailVOのテスト', () => {
  describe('正常系', () => {
    it('インスタンスの生成が行えること', () => {
      expect(new ParticipantEmailVO('email@example.com')).toBeInstanceOf(
        ParticipantEmailVO,
      )
    })

    it('equals()で同一性の評価が行えること', () => {
      const participantEmailVO = new ParticipantEmailVO('email@example.com')
      expect(participantEmailVO.equals('email@example.com')).toBeTruthy()
      expect(participantEmailVO.equals('another_email@example.com')).toBeFalsy()
    })

    it('値の取得が行えること', () => {
      expect(new ParticipantEmailVO('email@example.com').getValue()).toBe(
        'email@example.com',
      )
    })
  })
})
