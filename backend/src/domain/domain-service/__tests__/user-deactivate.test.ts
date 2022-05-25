import { PrismaClient } from '@prisma/client'
import { mocked } from 'ts-jest/utils'
import { MockedObjectDeep } from 'ts-jest/dist/utils/testing'
import { TeamRepository } from 'src/infra/db/repository/team-repository'
import { RemovedUserRepository } from 'src/infra/db/repository/removed-user-repository'
import { TestTeamFactory } from 'src/domain/entity/__tests__/test-team-factory'
import { TestRemovedUserFactory } from 'src/domain/entity/__tests__/test-removed-user-factory'
import { UserDeactivate } from 'src/domain/domain-service/user-deactivate'

jest.mock('@prisma/client')
jest.mock('src/infra/db/repository/team-repository')
jest.mock('src/infra/db/repository/removed-user-repository')

describe('do', () => {
  let mockTeamRepo: MockedObjectDeep<TeamRepository>
  let mockRemovedUserRepo: MockedObjectDeep<RemovedUserRepository>

  beforeAll(() => {
    const prisma = new PrismaClient()
    mockTeamRepo = mocked(new TeamRepository(prisma), true)
    mockRemovedUserRepo = mocked(new RemovedUserRepository(prisma), true)
  })

  it('対象の参加者が存在する場合、例外が発生しないこと', () => {
    mockTeamRepo.getTeamByUserId.mockResolvedValueOnce(
      TestTeamFactory.createTeam(),
    )

    mockRemovedUserRepo.getRemovedUserByUserId.mockResolvedValueOnce(
      TestRemovedUserFactory.createPendingUser(),
    )

    const userDeactivateService = new UserDeactivate(
      mockTeamRepo,
      mockRemovedUserRepo,
    )

    userDeactivateService.userDeactivate('1', '2')
  })
})
