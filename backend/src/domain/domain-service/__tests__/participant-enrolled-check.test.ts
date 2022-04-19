import { PrismaClient } from '@prisma/client'
import { mocked } from 'ts-jest/utils'
import { MockedObjectDeep } from 'ts-jest/dist/utils/testing'
import { UserQS } from 'src/infra/db/query-service/user-qs'
import { RemovedUserRepository } from 'src/infra/db/repository/removed-user-repository'
import { UserEnrolledCheck } from 'src/domain/domain-service/user-enrolled-check'
import { User } from 'src/domain/entity/user'
import { RemovedUser } from 'src/domain/entity/removed-user'

jest.mock('@prisma/client')
jest.mock('src/infra/db/query-service/user-qs')
jest.mock('src/infra/db/repository/removed-user-repository')

describe('do', () => {
  let mockUserQS: MockedObjectDeep<UserQS>
  let mockRemovedUserRepository: MockedObjectDeep<RemovedUserRepository>

  beforeAll(() => {
    const prisma = new PrismaClient()
    mockUserQS = mocked(new UserQS(prisma), true)
    mockRemovedUserRepository = mocked(new RemovedUserRepository(prisma), true)
  })

  it('指定された参加者が在籍中である場合、trueが返ること', () => {
    mockUserQS.getUserByUserId.mockResolvedValueOnce(
      new User({
        id: '1',
        name: 'Bob',
        email: 'bob@example.com',
      }),
    )

    const UserEnrolledCheckService = new UserEnrolledCheck(
      mockUserQS,
      mockRemovedUserRepository,
    )

    return expect(UserEnrolledCheckService.isEnrolled('1')).resolves.toBe(true)
  })

  it('指定された参加者が在籍中でない場合、falseが返ること', () => {
    mockUserQS.getUserByEmail.mockResolvedValueOnce(null)
    mockRemovedUserRepository.getRemovedUserByUserId.mockResolvedValueOnce(
      new RemovedUser({
        id: '1',
        name: 'Bob',
        email: 'bob@example.com',
        statusId: '2',
      }),
    )

    const UserEnrolledCheckService = new UserEnrolledCheck(
      mockUserQS,
      mockRemovedUserRepository,
    )

    return expect(UserEnrolledCheckService.isEnrolled('1')).resolves.toBe(false)
  })

  it('指定された参加者が存在しない場合、例外がthrowされること', () => {
    mockUserQS.getUserByEmail.mockResolvedValueOnce(null)
    mockRemovedUserRepository.getRemovedUserByUserId.mockResolvedValueOnce(null)

    const UserEnrolledCheckService = new UserEnrolledCheck(
      mockUserQS,
      mockRemovedUserRepository,
    )

    return expect(UserEnrolledCheckService.isEnrolled('1')).rejects.toThrow()
  })
})
