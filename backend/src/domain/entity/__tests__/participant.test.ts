import { Participant } from '../participant'
import { ParticipantNameVO } from 'src/domain/entity/participant-name-vo'
import { createRandomIdString } from 'src/util/random'

describe('Participantのテスト', () => {
  describe('正常系', () => {
    it('インスタンスの生成が行えること', () => {
      expect(
        new Participant({
          id: createRandomIdString(),
          name: 'Shun Kondo',
          email: 'email@example.com',
        }),
      ).toBeInstanceOf(Participant)
    })

    it('getEmail()でメールアドレスの取得が行えること', () => {
      expect(
        new Participant({
          id: createRandomIdString(),
          name: 'Shun Kondo',
          email: 'email@example.com',
        }).getEmail(),
      ).toBe('email@example.com')
    })
  })
})
