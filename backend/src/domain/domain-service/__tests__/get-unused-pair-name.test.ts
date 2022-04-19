import { PrismaClient } from '@prisma/client'
import { mocked } from 'ts-jest/utils'
import { MockedObjectDeep } from 'ts-jest/dist/utils/testing'
import { UserRepository } from 'src/infra/db/repository/user-repository'
import { GetUnusedPairName } from 'src/domain/domain-service/get-unused-pair-name'
import { TestTeamFactory } from 'src/domain/entity/__tests__/test-team-factory'

jest.mock('@prisma/client')
jest.mock('src/infra/db/repository/user-repository')

describe('do', () => {
  let mockUserRepo: MockedObjectDeep<UserRepository>

  beforeAll(() => {
    const prisma = new PrismaClient()
    mockUserRepo = mocked(new UserRepository(prisma), true)
  })

  it('未使用の名前がある場合、未使用の名前のうち先頭のものが返ること', async () => {
    const team = TestTeamFactory.createTeam()

    mockUserRepo.getTeamByTeamId.mockResolvedValueOnce(team)

    const GetUnusesPairNameService = new GetUnusedPairName(mockUserRepo)

    return expect(
      GetUnusesPairNameService.getUnusedPairName(team.getId()),
    ).resolves.toBe('c')
  })
})
