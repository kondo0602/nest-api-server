import { UserEmailVO } from 'src/domain/entity/user-email-vo'

describe('UserEmailVOのテスト', () => {
  describe('正常系', () => {
    it('インスタンスの生成が行えること', () => {
      expect(new UserEmailVO('email@example.com')).toBeInstanceOf(UserEmailVO)
    })

    it('equals()で同一性の評価が行えること', () => {
      const userEmailVO = new UserEmailVO('email@example.com')
      expect(userEmailVO.equals('email@example.com')).toBeTruthy()
      expect(userEmailVO.equals('another_email@example.com')).toBeFalsy()
    })

    it('値の取得が行えること', () => {
      expect(new UserEmailVO('email@example.com').getValue()).toBe(
        'email@example.com',
      )
    })
  })
})
