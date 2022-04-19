import { User } from '../user'
import { UserNameVO } from 'src/domain/entity/user-name-vo'
import { createRandomIdString } from 'src/util/random'

describe('Userのテスト', () => {
  describe('正常系', () => {
    it('インスタンスの生成が行えること', () => {
      expect(
        new User({
          id: createRandomIdString(),
          name: 'Shun Kondo',
          email: 'email@example.com',
        }),
      ).toBeInstanceOf(User)
    })

    it('getEmail()でメールアドレスの取得が行えること', () => {
      expect(
        new User({
          id: createRandomIdString(),
          name: 'Shun Kondo',
          email: 'email@example.com',
        }).getEmail(),
      ).toBe('email@example.com')
    })
  })
})
