import { UserNameVO } from 'src/domain/entity/user-name-vo'
describe('UserNameVOのテスト', () => {
  describe('正常系', () => {
    it('インスタンスの生成が行えること', () => {
      expect(new UserNameVO('name')).toBeInstanceOf(UserNameVO)
    })

    it('equals()で同一性の評価が行えること', () => {
      const userNameVO = new UserNameVO('name')
      expect(userNameVO.equals('name')).toBeTruthy()
      expect(userNameVO.equals('another_name')).toBeFalsy()
    })

    it('getName()で値の取得が行えること', () => {
      expect(new UserNameVO('name').getValue()).toBe('name')
    })
  })
})
