import { PrismaClient } from '@prisma/client'
import { mocked } from 'ts-jest/utils'
import { MockedObjectDeep } from 'ts-jest/dist/utils/testing'
import { ParticipantRepository } from 'src/infra/db/repository/participant-repository'
import { GetUnusedPairName } from 'src/domain/domain-service/get-unused-pair-name'
import { TestTeamFactory } from 'src/domain/entity/__tests__/test-team-factory'

jest.mock('@prisma/client')
jest.mock('src/infra/db/repository/participant-repository')

describe('do', () => {
  let mockParticipantRepo: MockedObjectDeep<ParticipantRepository>

  beforeAll(() => {
    const prisma = new PrismaClient()
    mockParticipantRepo = mocked(new ParticipantRepository(prisma), true)
  })

  it('未使用の名前がある場合、未使用の名前のうち先頭のものが返ること', async () => {
    const team = TestTeamFactory.createTeam()

    mockParticipantRepo.getTeamByTeamId.mockResolvedValueOnce(team)

    const GetUnusesPairNameService = new GetUnusedPairName(mockParticipantRepo)

    return expect(
      GetUnusesPairNameService.getUnusedPairName(team.getId()),
    ).resolves.toBe('c')
  })
})
