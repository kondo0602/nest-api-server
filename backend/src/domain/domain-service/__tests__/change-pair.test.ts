import { PrismaClient } from '@prisma/client'
import { mocked } from 'ts-jest/utils'
import { MockedObjectDeep } from 'ts-jest/dist/utils/testing'
import { TeamRepository } from 'src/infra/db/repository/team-repository'
import { ChangePair } from 'src/domain/domain-service/change-pair'
import { TestTeamFactory } from 'src/domain/entity/__tests__/test-team-factory'

jest.mock('@prisma/client')
jest.mock('src/infra/db/repository/team-repository')

describe('do', () => {
  let mockUserRepo: MockedObjectDeep<TeamRepository>

  beforeAll(() => {
    const prisma = new PrismaClient()
    mockUserRepo = mocked(new TeamRepository(prisma), true)

    mockUserRepo.getTeamByUserId.mockResolvedValueOnce(
      TestTeamFactory.createTeam(),
    )
  })

  it('同じチームに所属するペアへの移動の場合、例外が発生しないこと', () => {
    const ChangePairService = new ChangePair(mockUserRepo)

    return expect(ChangePairService.changePair('1', '2')).resolves.toBe(
      undefined,
    )
  })
})
