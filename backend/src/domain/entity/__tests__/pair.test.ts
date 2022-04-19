import { Pair, PairNameVO } from 'src/domain/entity/pair'
import { User } from 'src/domain/entity/user'
import { createRandomIdString } from 'src/util/random'

describe('Pairのテスト', () => {
  let user1: User
  let user2: User
  let pair: Pair

  beforeEach(() => {
    user1 = new User({
      id: createRandomIdString(),
      name: 'Yamada Taro',
      email: 'yamada@example.com',
    })

    user2 = new User({
      id: createRandomIdString(),
      name: 'Tanaka Jiro',
      email: 'tanaka@example.com',
    })

    pair = new Pair({
      id: createRandomIdString(),
      name: 'a',
      users: [user1, user2],
    })
  })

  describe('正常系', () => {
    it('getId()でidの取得が行えること', () => {
      expect(pair.getId()).toMatch(/[0-9|a-z|-]{36}/)
    })

    it('getName()でペア名の取得が行えること', () => {
      expect(pair.getName()).toBe('a')
    })

    it('getUsers()でペアに所属する参加者の取得が行えること', () => {
      expect(pair.getUsers()).toContain(user1)
      expect(pair.getUsers()).toContain(user2)
    })

    it('getUserByUserId()でペアに所属する参加者の取得が行えること', () => {
      expect(pair.getUserByUserId(user1.getId())).toBe(user1)
    })

    it('getUserCount()でペアに所属する参加者の人数の取得が行えること', () => {
      expect(pair.getUserCount()).toBe(2)
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
