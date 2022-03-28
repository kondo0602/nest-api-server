import { PrismaClient } from '@prisma/client'
import { mocked } from 'ts-jest/utils'
import { MockedObjectDeep } from 'ts-jest/dist/utils/testing'
import { ParticipantRepository } from '../../../infra/db/repository/participant-repository'
import { ChangePair } from '../change-pair'
import { TestTeamFactory } from '../../entity/__tests__/test-team-factory'

jest.mock('@prisma/client')
jest.mock('src/infra/db/repository/participant-repository')

describe('do', () => {
  let mockParticipantRepo: MockedObjectDeep<ParticipantRepository>

  beforeAll(() => {
    const prisma = new PrismaClient()
    mockParticipantRepo = mocked(new ParticipantRepository(prisma), true)

    mockParticipantRepo.getTeamByParticipantId.mockResolvedValueOnce(
      TestTeamFactory.createTeam(),
    )
  })

  it('同じチームに所属するペアへの移動の場合、例外が発生しないこと', async () => {
    const ChangePairService = new ChangePair(mockParticipantRepo)

    return expect(ChangePairService.changePair('1', '2')).resolves.toBe(
      undefined,
    )
  })
})
