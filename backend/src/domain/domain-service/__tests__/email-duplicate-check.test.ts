import { PrismaClient } from '@prisma/client'
import { mocked } from 'ts-jest/utils'
import { MockedObjectDeep } from 'ts-jest/dist/utils/testing'
import { UserQS } from 'src/infra/db/query-service/user-qs'
import { EmailDuplicateCheck } from '../email-duplicate-check'
import { User } from '../../entity/user'
import * as faker from 'faker'

jest.mock('@prisma/client')
jest.mock('src/infra/db/query-service/user-qs')

describe('do', () => {
  let mockUserQS: MockedObjectDeep<UserQS>

  beforeAll(() => {
    const prisma = new PrismaClient()
    mockUserQS = mocked(new UserQS(prisma), true)
  })

  it('既に登録されているメールアドレスである場合、trueが返ること', () => {
    mockUserQS.getUserByEmail.mockResolvedValueOnce(
      new User({
        id: faker.random.uuid(),
        name: faker.name.findName(),
        email: 'bob@example.com',
      }),
    )

    const EmailDuplicateCheckService = new EmailDuplicateCheck(mockUserQS)

    return expect(
      EmailDuplicateCheckService.isDuplicated('bob@example.com'),
    ).resolves.toBe(true)
  })

  it('未登録のメールアドレスである場合、falseが返ること', () => {
    mockUserQS.getUserByEmail.mockResolvedValueOnce(null)

    const EmailDuplicateCheckService = new EmailDuplicateCheck(mockUserQS)

    return expect(
      EmailDuplicateCheckService.isDuplicated('bob@example.com'),
    ).resolves.toBe(false)
  })
})
