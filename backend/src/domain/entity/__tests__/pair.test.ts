import { Participant } from '../participant'
import { Pair, PairNameVO } from '../pair'
import { createRandomIdString } from 'src/util/random'

describe('Pairのテスト', () => {
  let participant1: Participant
  let participant2: Participant
  let pair: Pair

  beforeEach(() => {
    participant1 = new Participant({
      id: createRandomIdString(),
      name: 'Yamada Taro',
      email: 'yamada@example.com',
      statusId: '1',
    })

    participant2 = new Participant({
      id: createRandomIdString(),
      name: 'Tanaka Jiro',
      email: 'tanaka@example.com',
      statusId: '1',
    })

    pair = new Pair({
      id: createRandomIdString(),
      name: 'a',
      participants: [participant1, participant2],
    })
  })

  describe('正常系', () => {
    it('getId()でidの取得が行えること', () => {
      expect(pair.getId()).toMatch(/[0-9|a-z|-]{36}/)
    })

    it('getName()でペア名の取得が行えること', () => {
      expect(pair.getName()).toBe('a')
    })

    it('getParticipants()でペアに所属する参加者の取得が行えること', () => {
      expect(pair.getParticipants()).toContain(participant1)
      expect(pair.getParticipants()).toContain(participant2)
    })

    it('getParticipantByParticipantId()でペアに所属する参加者の取得が行えること', () => {
      expect(pair.getParticipantByParticipantId(participant1.getId())).toBe(
        participant1,
      )
    })

    it('getParticipantCount()でペアに所属する参加者の人数の取得が行えること', () => {
      expect(pair.getParticipantCount()).toBe(2)
    })
  })
})

describe('PairNameVOのテスト', () => {
  describe('正常系', () => {
    let pairNameVO: PairNameVO

    beforeEach(() => {
      pairNameVO = new PairNameVO('a')
    })

    it('equals()で同一性の評価が行えること', () => {
      expect(pairNameVO.equals('a')).toBeTruthy()
      expect(pairNameVO.equals('b')).toBeFalsy()
    })

    it('getValue()で値の取得が行えること', () => {
      expect(pairNameVO.getValue()).toBe('a')
    })
  })

  describe('異常系', () => {
    it('英字小文字1文字の名前以外が設定できないこと', () => {
      expect(() => new PairNameVO('aa')).toThrow()
      expect(() => new PairNameVO('あ')).toThrow()
      expect(() => new PairNameVO('1')).toThrow()
    })
  })
})
