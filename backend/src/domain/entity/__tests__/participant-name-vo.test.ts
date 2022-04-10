import { ParticipantNameVO } from 'src/domain/entity/participant-name-vo'
describe('ParticipantNameVOのテスト', () => {
  describe('正常系', () => {
    it('インスタンスの生成が行えること', () => {
      expect(new ParticipantNameVO('name')).toBeInstanceOf(ParticipantNameVO)
    })

    it('equals()で同一性の評価が行えること', () => {
      const participantNameVO = new ParticipantNameVO('name')
      expect(participantNameVO.equals('name')).toBeTruthy()
      expect(participantNameVO.equals('another_name')).toBeFalsy()
    })

    it('getName()で値の取得が行えること', () => {
      expect(new ParticipantNameVO('name').getValue()).toBe('name')
    })
  })
})
