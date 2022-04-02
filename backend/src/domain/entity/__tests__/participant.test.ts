import {
  Participant,
  ParticipantNameVO,
  ParticipantEmailVO,
  ParticipantStatusIdVO,
  ParticipantStatus,
} from '../participant'
import { createRandomIdString } from 'src/util/random'

describe('Participantのテスト', () => {
  describe('正常系', () => {
    it('インスタンスの生成が行えること', () => {
      expect(
        new Participant({
          id: createRandomIdString(),
          name: 'Shun Kondo',
          email: 'email@example.com',
          statusId: '1',
          pairId: '1',
        }),
      ).toBeInstanceOf(Participant)
    })

    it('getEmail()でメールアドレスの取得が行えること', () => {
      expect(
        new Participant({
          id: createRandomIdString(),
          name: 'Shun Kondo',
          email: 'email@example.com',
          statusId: '1',
          pairId: '1',
        }).getEmail(),
      ).toBe('email@example.com')
    })

    it('changeStatus()でステータスの変更が行えること', () => {
      const participant = new Participant({
        id: createRandomIdString(),
        name: 'Shun Kondo',
        email: 'email@example.com',
        statusId: '1',
        pairId: '1',
      })

      expect(() => participant.changeStatus('2')).not.toThrow()
    })
  })

  describe('異常系', () => {
    it('changeStatus()でステータスの空更新が行えないこと', () => {
      const participant = new Participant({
        id: createRandomIdString(),
        name: 'Shun Kondo',
        email: 'email@example.com',
        statusId: '1',
        pairId: '1',
      })

      expect(() => participant.changeStatus('1')).toThrow()
    })
  })
})

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

describe('ParticipantStatusIdVOのテスト', () => {
  describe('正常系', () => {
    it('インスタンスの生成が行えること', () => {
      expect(new ParticipantStatusIdVO('1')).toBeInstanceOf(
        ParticipantStatusIdVO,
      )
      expect(new ParticipantStatusIdVO('2')).toBeInstanceOf(
        ParticipantStatusIdVO,
      )
      expect(new ParticipantStatusIdVO('3')).toBeInstanceOf(
        ParticipantStatusIdVO,
      )
    })

    it('equals()で同一性の評価が行えること', () => {
      expect(new ParticipantStatusIdVO('1').equals('1')).toBeTruthy()
      expect(new ParticipantNameVO('1').equals('2')).toBeFalsy()
    })

    it('値の取得が行えること', () => {
      expect(new ParticipantStatusIdVO('1').getValue()).toBe('1')
    })
  })

  describe('異常系', () => {
    it('存在しない在籍ステータスでインスタンスの生成が行えないこと', () => {
      expect(() => new ParticipantStatusIdVO('4')).toThrow()
    })
  })
})
