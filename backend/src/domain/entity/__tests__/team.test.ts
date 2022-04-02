import { Participant } from '../participant'
import { Pair } from '../pair'
import { Team, TeamNameVO } from '../team'
import { createRandomIdString } from 'src/util/random'
import { create } from 'domain'

describe('Pairのテスト', () => {
  let participant1: Participant
  let participant2: Participant
  let participant3: Participant
  let participant4: Participant
  let participant5: Participant
  let participant6: Participant
  let pair1: Pair
  let pair2: Pair
  let pair3: Pair
  let team: Team

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
      pairId: '1',
    })

    participant3 = new Participant({
      id: createRandomIdString(),
      name: 'Sato Saburo',
      email: 'sato@example.com',
      statusId: '1',
      pairId: '2',
    })

    participant4 = new Participant({
      id: createRandomIdString(),
      name: 'Watanabe Shiro',
      email: 'watanabe@example.com',
      statusId: '1',
      pairId: '2',
    })

    participant5 = new Participant({
      id: createRandomIdString(),
      name: 'Shigeno Goro',
      email: 'shigeno@example.com',
      statusId: '1',
      pairId: '3',
    })

    participant6 = new Participant({
      id: createRandomIdString(),
      name: 'Kudo Shitiro',
      email: 'watanabe@example.com',
      statusId: '1',
      pairId: '3',
    })

    pair1 = new Pair({
      id: createRandomIdString(),
      name: 'a',
      participants: [participant1, participant2],
      teamId: '1',
    })

    pair2 = new Pair({
      id: createRandomIdString(),
      name: 'b',
      participants: [participant3, participant4],
      teamId: '1',
    })

    pair3 = new Pair({
      id: createRandomIdString(),
      name: 'c',
      participants: [participant5, participant6],
      teamId: '1',
    })

    team = new Team({
      id: createRandomIdString(),
      name: '1',
      pairs: [pair1, pair2],
    })
  })

  describe('正常系', () => {
    it('getId()でidの取得が行えること', () => {
      expect(team.getId()).toMatch(/[0-9|a-z|-]{36}/)
    })

    it('getPairs()でチームに所属するペアの取得が行えること', () => {
      expect(team.getPairs()).toContain(pair1)
      expect(team.getPairs()).toContain(pair2)
    })

    it('getPairByPairId()でチームに所属するペアの取得が行えること', () => {
      const pairId = pair1.getId()

      expect(team.getPairByPairId(pairId)).toBe(pair1)
    })

    it('addPair()でチームに所属するペアの追加が行えること', () => {
      team.addPair(pair3)
      expect(team.getPairs()).toContain(pair3)
    })

    it('removePair()でチームに所属するペアの削除が行えること', () => {
      const pairId = pair1.getId()

      team.removePair(pairId)
      expect(team.getPairs()).not.toContain(pair1)
    })
  })
})

describe('TeamNameVOのテスト', () => {
  let teamNameVO: TeamNameVO

  beforeEach(() => {
    teamNameVO = new TeamNameVO('1')
  })

  it('数字1〜3文字の名前以外が設定できないこと', () => {
    expect(new TeamNameVO('1')).toBeInstanceOf(TeamNameVO)
    expect(new TeamNameVO('11')).toBeInstanceOf(TeamNameVO)
    expect(new TeamNameVO('111')).toBeInstanceOf(TeamNameVO)
    expect(() => new TeamNameVO('1111')).toThrow()
    expect(() => new TeamNameVO('a')).toThrow()
  })

  it('equals()で同一性の評価が行えること', () => {
    expect(teamNameVO.equals('1')).toBeTruthy()
    expect(teamNameVO.equals('2')).toBeFalsy()
  })

  it('getValue()で値の取得が行えること', () => {
    expect(teamNameVO.getValue()).toBe('1')
  })
})
