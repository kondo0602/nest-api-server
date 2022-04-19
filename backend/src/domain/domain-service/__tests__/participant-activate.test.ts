import { PrismaClient } from '@prisma/client'
import { mocked } from 'ts-jest/utils'
import { MockedObjectDeep } from 'ts-jest/dist/utils/testing'
import { UserRepository } from 'src/infra/db/repository/user-repository'
import { RemovedUserRepository } from 'src/infra/db/repository/removed-user-repository'
import { TestTeamFactory } from '../../entity/__tests__/test-team-factory'
import { TestRemovedUserFactory } from 'src/domain/entity/__tests__/test-removed-user-factory'
import { UserActivate } from '../user-activate'

jest.mock('@prisma/client')
jest.mock('src/infra/db/repository/user-repository')
jest.mock('src/infra/db/repository/removed-user-repository')

describe('do', () => {
  const prisma = new PrismaClient()
  let mockUserRepo: MockedObjectDeep<UserRepository>
  let mockRemovedUserRepo: MockedObjectDeep<RemovedUserRepository>

  beforeAll(() => {
    mockUserRepo = mocked(new UserRepository(prisma), true)
    mockRemovedUserRepo = mocked(new RemovedUserRepository(prisma), true)
  })

  it('対象の参加者が存在する場合、例外が発生しないこと', () => {
    mockUserRepo.getTeamByUserId.mockResolvedValueOnce(
      TestTeamFactory.createTeam(),
    )

    mockRemovedUserRepo.getRemovedUserByUserId.mockResolvedValueOnce(
      TestRemovedUserFactory.createPendingUser(),
    )

    const userActivateService = new UserActivate(
      prisma,
      mockUserRepo,
      mockRemovedUserRepo,
    )

    userActivateService.userActivate('1')
  })

  it('対象の参加者が存在しない場合、例外が発生すること', () => {
    mockUserRepo.getTeamByUserId.mockResolvedValueOnce(
      TestTeamFactory.createTeam(),
    )

    mockRemovedUserRepo.getRemovedUserByUserId.mockResolvedValueOnce(null)

    const userActivateService = new UserActivate(
      prisma,
      mockUserRepo,
      mockRemovedUserRepo,
    )

    expect(() => userActivateService.userActivate('1')).toThrow
  })
})
