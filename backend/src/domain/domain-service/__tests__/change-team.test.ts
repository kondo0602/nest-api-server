import { PrismaClient } from '@prisma/client'
import { mocked } from 'ts-jest/utils'
import { MockedObjectDeep } from 'ts-jest/dist/utils/testing'
import { ParticipantRepository } from '../../../infra/db/repository/participant-repository'
import { ChangeTeam } from '../change-team'
import { TestTeamFactory } from '../../entity/__tests__/test-team-factory'

jest.mock('@prisma/client')
jest.mock('src/infra/db/repository/participant-repository')

describe('do', () => {
  let mockParticipantRepo: MockedObjectDeep<ParticipantRepository>

  beforeAll(() => {
    const prisma = new PrismaClient()
    mockParticipantRepo = mocked(new ParticipantRepository(prisma), true)

    mockParticipantRepo.getTeamByPairId.mockResolvedValueOnce(
      TestTeamFactory.createTeam(),
    )

    mockParticipantRepo.getTeamByTeamId.mockResolvedValueOnce(
      TestTeamFactory.createAnotherTeam(),
    )
  })

  it('他のチームへの移動の場合、例外が発生しないこと', () => {
    const ChangeTeamService = new ChangeTeam(mockParticipantRepo)

    return expect(ChangeTeamService.changeTeam('1', '2')).resolves.toBe(
      undefined,
    )
  })
})
