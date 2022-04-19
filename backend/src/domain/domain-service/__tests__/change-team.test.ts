import { PrismaClient } from '@prisma/client'
import { mocked } from 'ts-jest/utils'
import { MockedObjectDeep } from 'ts-jest/dist/utils/testing'
import { UserRepository } from 'src/infra/db/repository/user-repository'
import { ChangeTeam } from 'src/domain/domain-service/change-team'
import { TestTeamFactory } from 'src/domain/entity/__tests__/test-team-factory'

jest.mock('@prisma/client')
jest.mock('src/infra/db/repository/user-repository')

describe('do', () => {
  let mockUserRepo: MockedObjectDeep<UserRepository>

  beforeAll(() => {
    const prisma = new PrismaClient()
    mockUserRepo = mocked(new UserRepository(prisma), true)

    mockUserRepo.getTeamByPairId.mockResolvedValueOnce(
      TestTeamFactory.createTeam(),
    )

    mockUserRepo.getTeamByTeamId.mockResolvedValueOnce(
      TestTeamFactory.createAnotherTeam(),
    )
  })

  it('他のチームへの移動の場合、例外が発生しないこと', () => {
    const ChangeTeamService = new ChangeTeam(mockUserRepo)

    return expect(ChangeTeamService.changeTeam('1', '2')).resolves.toBe(
      undefined,
    )
  })
})
