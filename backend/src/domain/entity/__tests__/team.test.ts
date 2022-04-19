import { User } from '../user'
import { Pair } from '../pair'
import { Team, TeamNameVO } from '../team'
import * as faker from 'faker'

describe('Pairのテスト', () => {
  let user1: User
  let user2: User
  let user3: User
  let user4: User
  let user5: User
  let user6: User
  let user7: User
  let user8: User
  let pair1: Pair
  let pair2: Pair
  let pair3: Pair
  let team: Team

  beforeEach(() => {
    user1 = new User({
      id: faker.random.uuid(),
      name: faker.name.findName(),
      email: faker.internet.email(),
    })

    user2 = new User({
      id: faker.random.uuid(),
      name: faker.name.findName(),
      email: faker.internet.email(),
    })

    user3 = new User({
      id: faker.random.uuid(),
      name: faker.name.findName(),
      email: faker.internet.email(),
    })

    user4 = new User({
      id: faker.random.uuid(),
      name: faker.name.findName(),
      email: faker.internet.email(),
    })

    user5 = new User({
      id: faker.random.uuid(),
      name: faker.name.findName(),
      email: faker.internet.email(),
    })

    user6 = new User({
      id: faker.random.uuid(),
      name: faker.name.findName(),
      email: faker.internet.email(),
    })

    user7 = new User({
      id: faker.random.uuid(),
      name: faker.name.findName(),
      email: faker.internet.email(),
    })

    user8 = new User({
      id: faker.random.uuid(),
      name: faker.name.findName(),
      email: faker.internet.email(),
    })

    pair1 = new Pair({
      id: faker.random.uuid(),
      name: 'a',
      users: [user1, user2],
    })

    pair2 = new Pair({
      id: faker.random.uuid(),
      name: 'b',
      users: [user3, user4, user7],
    })

    pair3 = new Pair({
      id: faker.random.uuid(),
      name: 'c',
      users: [user5, user6, user8],
    })

    team = new Team({
      id: faker.random.uuid(),
      name: '1',
      pairs: [pair1, pair2],
    })
  })

  describe('正常系', () => {
    it('getId()でidの取得が行えること', () => {
      expect(team.getId()).toMatch(/[0-9|a-z|-]{36}/)
    })

    it('getName()でチーム名の取得が行えること', () => {
      expect(team.getName()).toBe('1')
    })

    it('getPairs()でチームに所属するペアの取得が行えること', () => {
      expect(team.getPairs()).toContain(pair1)
      expect(team.getPairs()).toContain(pair2)
    })

    it('getPairByPairId()でチームに所属するペアの取得が行えること', () => {
      const pairId = pair1.getId()

      expect(team.getPairByPairId(pairId)).toBe(pair1)
    })

    it('getPairWithFewestUsers()でチームに所属する最も人数が少ないペアの取得が行えること', () => {
      expect(team.getPairWithFewestUsers()).toBe(pair1)
    })

    it('getUserCount()でチームに所属する人数の取得が行えること', () => {
      expect(team.getUserCount()).toBe(5)
    })

    it('getUnusedPairName()でチーム内でまだ使用していないペア名の取得が行えること', () => {
      expect(team.getUnusedPairName()).toBe('c')
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
