import { PrismaClient } from '@prisma/client'
import { mocked } from 'ts-jest/utils'
import { MockedObjectDeep } from 'ts-jest/dist/utils/testing'
import { ParticipantRepository } from 'src/infra/db/repository/participant-repository'
import { RemovedParticipantRepository } from 'src/infra/db/repository/removed-participant-repository'
import { TestTeamFactory } from '../../entity/__tests__/test-team-factory'
import { TestRemovedParticipantFactory } from 'src/domain/entity/__tests__/test-removed-participant-factory'
import { ParticipantDeactivate } from '../participant-deactivate'

jest.mock('@prisma/client')
jest.mock('src/infra/db/repository/participant-repository')
jest.mock('src/infra/db/repository/removed-participant-repository')

describe('do', () => {
  let mockParticipantRepo: MockedObjectDeep<ParticipantRepository>
  let mockRemovedParticipantRepo: MockedObjectDeep<RemovedParticipantRepository>

  beforeAll(() => {
    const prisma = new PrismaClient()
    mockParticipantRepo = mocked(new ParticipantRepository(prisma), true)
    mockRemovedParticipantRepo = mocked(
      new RemovedParticipantRepository(prisma),
      true,
    )
  })

  it('対象の参加者が存在する場合、例外が発生しないこと', async () => {
    mockParticipantRepo.getTeamByParticipantId.mockResolvedValueOnce(
      TestTeamFactory.createTeam(),
    )

    mockRemovedParticipantRepo.getRemovedParticipantByParticipantId.mockResolvedValueOnce(
      TestRemovedParticipantFactory.createPendingParticipant(),
    )

    const participantDeactivateService = new ParticipantDeactivate(
      mockParticipantRepo,
      mockRemovedParticipantRepo,
    )

    participantDeactivateService.participantDeactivate('1', '2')
  })
})