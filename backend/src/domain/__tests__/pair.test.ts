import { Participant } from '../entity/participant'
import { Pair, PairNameVO } from '../entity/pair'
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
      pairId: '1',
    })

    participant2 = new Participant({
      id: createRandomIdString(),
      name: 'Tanaka Jiro',
      email: 'tanaka@example.com',
      statusId: '1',
      pairId: '2',
    })

    pair = new Pair({
      id: createRandomIdString(),
      name: 'a',
      participants: [participant1, participant2],
      teamId: '1',
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

    it('getTeamId()でペアが所属するチームIDの取得が行えること', () => {
      expect(pair.getTeamId()).toBe('1')
    })

    it('setTeamId()でペアが所属するチームIDの更新が行えること', () => {
      pair.setTeamId('2')
      expect(pair.getTeamId()).toBe('2')
    })
  })
})

describe('PairNameVOのテスト', () => {
  describe('正常系', () => {
    let pairNameVO: PairNameVO

    beforeEach(() => {
      pairNameVO = new PairNameVO('name')
    })

    it('equals()で同一性の評価が行えること', () => {
      expect(pairNameVO.equals('name')).toBeTruthy()
      expect(pairNameVO.equals('another_name')).toBeFalsy()
    })

    it('getValue()で値の取得が行えること', () => {
      expect(pairNameVO.getValue()).toBe('name')
    })
  })
})
