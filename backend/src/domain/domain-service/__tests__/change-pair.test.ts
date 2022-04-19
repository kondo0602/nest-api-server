import { PrismaClient } from '@prisma/client'
import { mocked } from 'ts-jest/utils'
import { MockedObjectDeep } from 'ts-jest/dist/utils/testing'
import { UserRepository } from 'src/infra/db/repository/user-repository'
import { ChangePair } from 'src/domain/domain-service/change-pair'
import { TestTeamFactory } from 'src/domain/entity/__tests__/test-team-factory'

jest.mock('@prisma/client')
jest.mock('src/infra/db/repository/user-repository')

describe('do', () => {
  let mockUserRepo: MockedObjectDeep<UserRepository>

  beforeAll(() => {
    const prisma = new PrismaClient()
    mockUserRepo = mocked(new UserRepository(prisma), true)

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
