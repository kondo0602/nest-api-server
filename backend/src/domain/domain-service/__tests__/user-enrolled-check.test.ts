import { PrismaClient } from '@prisma/client'
import { mocked } from 'ts-jest/utils'
import { MockedObjectDeep } from 'ts-jest/dist/utils/testing'
import { UserQS } from 'src/infra/db/query-service/user-qs'
import { UserEnrolledCheck } from 'src/domain/domain-service/user-enrolled-check'
import { User } from 'src/domain/entity/user'
import * as faker from 'faker'

jest.mock('@prisma/client')
jest.mock('src/infra/db/query-service/user-qs')
jest.mock('src/infra/db/repository/removed-user-repository')

describe('do', () => {
  let mockUserQS: MockedObjectDeep<UserQS>

  beforeAll(() => {
    const prisma = new PrismaClient()
    mockUserQS = mocked(new UserQS(prisma), true)
  })

  it('指定された参加者が在籍中である場合、trueが返ること', () => {
    mockUserQS.getUserByUserId.mockResolvedValueOnce(
      new User({
        id: '1',
        name: faker.name.findName(),
        email: faker.internet.email(),
      }),
    )

    const UserEnrolledCheckService = new UserEnrolledCheck(mockUserQS)

    return expect(UserEnrolledCheckService.isEnrolled('1')).resolves.toBe(true)
  })

  it('指定された参加者が在籍中でない場合、falseが返ること', () => {
    mockUserQS.getUserByUserId.mockResolvedValueOnce(null)

    const UserEnrolledCheckService = new UserEnrolledCheck(mockUserQS)

    return expect(UserEnrolledCheckService.isEnrolled('1')).resolves.toBe(false)
  })
})
